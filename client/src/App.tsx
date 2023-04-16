import Navbar from "./components/Navbar"
import ThoughtSpace from "./components/ThoughtSpace"

function App() {

  //fetch the thoughts and reactions from the backend and set them to a state (limit 100)
  //track user login status with a state


  return (
    <main className="flex flex-col">
      <Navbar />
      <ThoughtSpace />
    </main>
  )
}

export default App
