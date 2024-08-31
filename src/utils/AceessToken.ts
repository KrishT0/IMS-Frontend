// import { requestingNewAccessToken } from "../api/index";
import { useUser } from "../store/user";
import { auth } from "../firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";

/**
 *
 * @description Function to get a new access token from firebase.
 */
export const getNewAccessToken = async (API: any) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const refreshedIdToken = await user.getIdToken(true);
        console.log("Refreshed ID Token:", refreshedIdToken);
        useUser.getState().setToken(refreshedIdToken);
        API();
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    } else {
      console.log("No user is signed in.");
    }
  });
};
