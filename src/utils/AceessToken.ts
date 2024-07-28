import { requestingNewAccessToken } from "../api/index";
import { useUser } from "../store/user";

/**
 *
 * @description Function to get a new access token using refresh token.
 */
export const getNewAccessToken = async () => {
  try {
    const response = await requestingNewAccessToken();
    console.log(response);
    useUser.getState().setToken(response.accessToken);
  } catch (error) {
    console.log(error);
  }
};
