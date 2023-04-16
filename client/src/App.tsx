import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import ThoughtSpace from "./components/ThoughtSpace"

function App() {

  //fetch the thoughts and reactions from the backend and set them to a state (limit 100)
  //track user login status with a state

  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [user, setUser] = useState<User>()
  const [filter, setFilter] = useState<string>('')

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/thoughts/');
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }
        const data = await response.json();
        setThoughts(data);
      } catch (error) {
        console.error('Error fetching thoughts:', error);
      }
    };
    fetchThoughts();
  }, []);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.currentTarget.value)
  }

  function filterData(thoughts: Thought[], filter: string) {
    const filteredData = thoughts.filter(thought => thought.thoughtText.toLowerCase().includes(filter.toLowerCase()))
    const recursiveFilters = thoughts.filter(thought => thought.reactions.some(react => recursiveFilter(react, filter)))

    function recursiveFilter(reaction: Reaction, filter: string): boolean {
      if (reaction.reactionBody.toLowerCase().includes(filter.toLowerCase())) {
        return true;
      }

      if (!reaction.reactions || reaction.reactions.length == 0) return false

      const filteredReactions = reaction.reactions.some(react => react.reactionBody.toLowerCase().includes(filter.toLowerCase()) || recursiveFilter(react, filter))
      return filteredReactions
    }



    return Array.from(new Set([...filteredData, ...recursiveFilters]))
  }

  const filteredData = filterData(thoughts, filter)
  console.log(filteredData)

  return (
    <main className="flex flex-col bg-slate-100">
      <Navbar filter={filter} handleFilter={handleFilter} />
      <ThoughtSpace thoughts={filteredData} filter={filter} />
    </main>
  )
}

export default App

