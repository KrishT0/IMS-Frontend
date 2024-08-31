import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

/**
 *
 * @description This function will sign out the user and redirect the user to the login page.
 */
export const BackToLogin = () => {
  signOut(auth)
    .then(() => {
      window.location.href = "/";
    })
    .catch((error) => {
      console.error(error);
    });
};
