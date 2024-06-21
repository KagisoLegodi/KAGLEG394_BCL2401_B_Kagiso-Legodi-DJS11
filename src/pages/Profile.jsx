import { useSelector } from "react-redux";
import Header from "../components/Utils/Header/index";
import Button from "../components/Utils/Button/Button";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";

export default function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log("My User", user);
  if (!user) {
    return <p>Loading...</p>;
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out successfully");
        toast.success("You Have Successfully Logged Out!");
      })
      .catch((error) => {
        console.log("Error logging out", error);
        toast.error(error.message);
      });
  };

  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text={"Logout"} onClick={handleLogout} />
      </div>
    </div>
  );
}
