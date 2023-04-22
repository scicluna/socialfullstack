import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import ThoughtSpace from "./components/ThoughtSpace"

const API_URL = process.env.NODE_ENV === 'production'
  ? window.location.origin
  : 'http://localhost:3001';


function App() {

  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [user, setUser] = useState<User | undefined>(JSON.parse(localStorage.getItem('user') || 'null'))
  const [filter, setFilter] = useState<string>('')
  const [dark, setDark] = useState<boolean>(true)

  //initial data fetch
  useEffect(() => {
    fetchThoughts();
  }, []);

  //refreshes our thoughts
  const handleUpdateThoughts = async () => {
    await fetchThoughts()
  }

  //fetches our thoughts
  const fetchThoughts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/thoughts/`);
      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }
      const data = await response.json();
      setThoughts(data);
    } catch (error) {
      console.error('Error fetching thoughts:', error);
    }
  };

  //handle set filter
  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    setFilter(e.currentTarget.value)
  }

  //sets our user information after login
  function handleUser(data: User | undefined = undefined) {
    if (data) {
      setUser({ userName: data.userName, email: data.email, password: data.password, friends: data.friends, _id: data._id })
      localStorage.setItem('user', JSON.stringify(data))
    }
    else {
      setUser(undefined)
      localStorage.removeItem('user')
    }
  }

  //filter reactions recursively
  function recursiveFilter(reaction: Reaction, filter: string): boolean {
    if (reaction.reactionBody.toLowerCase().includes(filter.toLowerCase())) {
      return true;
    }
    if (!reaction.reactions || reaction.reactions.length == 0) return false

    const filteredReactions = reaction.reactions.some(react => react.userName.toLowerCase().includes(filter.toLocaleLowerCase()) || react.reactionBody.toLowerCase().includes(filter.toLowerCase()) || recursiveFilter(react, filter))
    return filteredReactions
  }

  //handles thought filtering
  function filterData(thoughts: Thought[], filter: string) {
    const filteredData = thoughts.filter(thought => thought.userName.toLowerCase().includes(filter.toLocaleLowerCase()) || thought.thoughtText.toLowerCase().includes(filter.toLowerCase()))
    const recursiveFilters = thoughts.filter(thought => thought.userName.toLowerCase().includes(filter.toLocaleLowerCase()) || thought.reactions.some(react => recursiveFilter(react, filter)))

    return Array.from(new Set([...filteredData, ...recursiveFilters]))
  }

  //handles darkmode
  function handleDark() {
    setDark(dark ? false : true)
  }

  //core app
  const filteredData = filterData(thoughts, filter)
  return (
    <main className={`flex flex-col ${dark ? 'dark' : 'light'}`}>
      <Navbar filter={filter} handleFilter={handleFilter} user={user} handleUser={handleUser} dark={dark} handleDark={handleDark} />
      <ThoughtSpace thoughts={filteredData} filter={filter} user={user} handleUpdateThoughts={handleUpdateThoughts} />
    </main>
  )
}

export default App

