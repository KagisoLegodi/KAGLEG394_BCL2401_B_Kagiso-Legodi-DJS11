import { useState } from "react";
import InputComponent from "../../Utils/Input/index";
import Button from "../../Utils/Button/Button";
import { auth, db } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignupForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    setLoading(true);
    // Implement your signup logic here
    if (
      password == confirmPassword &&
      password.length >= 6 &&
      fullName &&
      email
    ) {
      try {
        // creating user's account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        // saving user's details
        await setDoc(doc(db, "users", user.uid), {
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        // Saving data in the redux by calling a redux action function
        dispatch(
          setUser({
            name: fullName,
            email: user.email,
            uid: user.uid,
          })
        );
        toast.success("User Has Been Created Successfully!");
        setLoading(false);
        navigate("/profile");
      } catch (e) {
        console.log("error", e);
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      if (password != confirmPassword) {
        toast.error(
          "Please Make Sure Your Password And Confirm Password Matches!"
        );
      } else if (password.length < 6) {
        toast.error("Password Should Be At Least 6 Characters Long!");
      }
      setLoading(false);
    }
  };

  return (
    <>
      <InputComponent
        state={fullName}
        setState={setFullName}
        placeholder="Full Name"
        type="text"
        required={true}
      />
      <InputComponent
        state={email}
        setState={setEmail}
        placeholder="Email"
        type="text"
        required={true}
      />
      <InputComponent
        state={password}
        setState={setPassword}
        placeholder="Password"
        type="password"
        required={true}
      />
      <InputComponent
        state={confirmPassword}
        setState={setConfirmPassword}
        placeholder="Confirm Password"
        type="password"
        required={true}
      />
      <Button
        text={loading ? "Loading..." : "Signup"}
        disabled={loading}
        onClick={handleSignup}
      />
    </>
  );
}
