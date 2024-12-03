import { Routes, Route, Router } from "react-router";
import { AllMessagesPage } from "./Pages/AllMessagesPage/AllMessagesPage";
import { PostMessagePage } from "./Pages/PostMessagePage/postMessagePage";
import './App.css'

function App() {

  return (
    
      <Routes>
        <Route path="/" element={ <AllMessagesPage/> } />
        <Route path="/messages" element={ <PostMessagePage/> } />
      </Routes>
      
  )
}

export default App
