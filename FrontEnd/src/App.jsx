import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MemberSignUp from "./Components/SignUp";
import MemberLogin from "./Components/Login";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<MemberSignUp />} />
        <Route path="/login" element={<MemberLogin />} />
      </Routes>
    </>
  );
}

export default App;
