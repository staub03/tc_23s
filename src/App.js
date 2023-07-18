import { Routes, Route } from "react-router-dom"
import LandingPage from "./pages/landingpage"
import AboutPage from "./pages/aboutus"
import FaqPage from "./pages/faq"
import NextStepsPage from "./pages/nextStepsPage"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <LandingPage/> } />
        <Route path="/about" element={ <AboutPage/> } />
        <Route path="/faq" element={ <FaqPage/> } />
        <Route path="/nextsteps" element={ <NextStepsPage/> } />
      </Routes>
    </div>
  )
}

export default App