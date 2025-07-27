import { Route, Routes } from "react-router-dom";
import Header from "./components/Header"
import Login from "./components/Login"
import Home from "./components/Home";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <>
      {/* <Header /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  )
}

export default App