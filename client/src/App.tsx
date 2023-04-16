import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import ThoughtSpace from "./components/ThoughtSpace"

function App() {

  //fetch the thoughts and reactions from the backend and set them to a state (limit 100)
  //track user login status with a state

  const [thoughts, setThoughts] = useState<Thought[]>([])
  const [user, setUser] = useState<User>()

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
  console.log(thoughts)

  return (
    <main className="flex flex-col bg-slate-100">
      <Navbar />
      <ThoughtSpace thoughts={thoughts} />
    </main>
  )
}

export default App
