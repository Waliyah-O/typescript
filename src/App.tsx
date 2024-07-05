import styled from "styled-components";
import "./App.css";
import SignUpForm from "./SignUp";
import SignInForm from "./SignIn";

function App() {
  return (
    <>
      <SignUpForm title="Sign Up" />
      <SignInForm title="Sign In" className="signin"/>
    </>
  );
}

export default App;
