import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import ThoughtSpace from "./components/ThoughtSpace"

function App() {

  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [user, setUser] = useState<User>()
  const [filter, setFilter] = useState<string>('')

  //initial data fetch
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

  //handle set filter
  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.currentTarget.value)
  }

  function handleUser(data: User | undefined = undefined) {
    if (data) setUser({ userName: data.userName, email: data.email, password: data.password, friends: data.friends, _id: data._id })
    else setUser(undefined)
  }

  //filter reactions recursively
  function recursiveFilter(reaction: Reaction, filter: string): boolean {
    if (reaction.reactionBody.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    }
    if (!reaction.reactions || reaction.reactions.length == 0) return false

    const filteredReactions = reaction.reactions.some(react => react.reactionBody.toLowerCase().includes(filter.toLowerCase()) || recursiveFilter(react, filter))
    return filteredReactions
  }

  //handles thought filtering
  function filterData(thoughts: Thought[], filter: string) {
    const filteredData = thoughts.filter(thought => thought.thoughtText.toLowerCase().includes(filter.toLowerCase()))
    const recursiveFilters = thoughts.filter(thought => thought.reactions.some(react => recursiveFilter(react, filter)))

    return Array.from(new Set([...filteredData, ...recursiveFilters]))
  }

  console.log(user)

  const filteredData = filterData(thoughts, filter)
  return (
    <main className="flex flex-col bg-slate-100">
      <Navbar filter={filter} handleFilter={handleFilter} user={user} handleUser={handleUser} />
      <ThoughtSpace thoughts={filteredData} filter={filter} user={user} />
    </main>
  )
}

export default App

