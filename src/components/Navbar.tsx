import { FC } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/user";
import { auth } from "../firebase/firebase.config";

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { logout } = useUser();

  const logoutClickHandler = () => {
    signOut(auth)
      .then(() => {
        logout();
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex justify-between p-2">
      <h1 className="text-xl">IMS</h1>
      <button
        className="bg-black rounded-md text-white p-1"
        onClick={logoutClickHandler}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
