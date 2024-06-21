import { useState } from "react";
import Header from "../components/Utils/Header/index";
import SignupForm from "../components/SignupData/SignupForm/index";
import LoginForm from "../components/SignupData/LoginForm/index";

export default function SignUpPage() {
  const [flag, setFlag] = useState(false);


  return (
    <div>
      <Header />

      <div className="input-wrapper">
        {!flag ? <h1>Create Account</h1> : <h1>Login</h1>}
        {!flag ? <SignupForm /> : <LoginForm/>}
        {!flag ? (
          <p style={{cursor: "pointer"}} className="emphasized-text" onClick={() => setFlag(!flag)}>
            Been here before? Login now.</p>
        ) : (
          <p style={{cursor: "pointer"}} onClick={() => setFlag(!flag)}>
            Do not have an Account? Click here to Signup.
          </p>
        )}
      </div>
    </div>
  );
}
