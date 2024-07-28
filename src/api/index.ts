import axios from "axios";
import { useUser } from "../store/user";
import { useRefreshToken } from "../store/refreshToken";
import {
  getInternsForMentorsBodyType,
  InternForMentorType,
  User as UserType,
  verifyMobileNumberBodyType,
  sendFeedbackBodyType,
  setMentorBodyType,
  uploadingWorkDetailsBodyType,
  getMonthlyReportResultType,
} from "../types";
// import { BackToLogin } from "../utils/BacktoLogin";
import { getNewAccessToken } from "../utils/AceessToken";

const baseUrl = import.meta.env.VITE_BASE_URL;
const accessToken = useUser.getState().user?.token;
const refreshToken = useRefreshToken.getState().refreshToken;

/**
 *
 * @description API to verify if the mobile number of user exist or not.
 * @returns User details if the mobile number exist.
 */
export const verifyMobileNumber: (
  body: verifyMobileNumberBodyType
) => Promise<UserType[]> = async (body: verifyMobileNumberBodyType) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/verify-mobile`,
      body
    );
    return response.data as UserType[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to verify mobile number");
  }
};

/**
 *
 * @description API to get list of interns for mentors.
 * @returns array of interns along with their details.
 */
export const getInternsForMentors: (
  body: getInternsForMentorsBodyType
) => Promise<InternForMentorType[]> = async (
  body: getInternsForMentorsBodyType
) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/mentor/get_interns`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data.interns as InternForMentorType[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get interns for mentors");
  }
};

/**
 *
 * @description API for mentors to send feedback on interns.
 * @returns a message string that the feedback is sent successfully.
 */
export const sendFeedback: (
  body: sendFeedbackBodyType
) => Promise<{ message: string }> = async (body: sendFeedbackBodyType) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/mentor/feedback_submission`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data as { message: string };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send feedback");
  }
};

/**
 *
 * @description API for interns to select mentor.
 * @returns a message string that the mentor is selected successfully.
 */
export const selectingMentor: (
  body: setMentorBodyType
) => Promise<{ message: string }> = async (body: setMentorBodyType) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/intern/selecting_mentor`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data as { message: string };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to set mentor");
  }
};

/**
 *
 * @description API for interns to get list of mentors.
 * @returns array of mentors along with their details.
 */
export const getMentorsForInterns: (body: {
  department: string;
}) => Promise<{ _id: string; name: string }[]> = async (body: {
  department: string;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/intern/get_mentor_for_interns`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data as { _id: string; name: string }[];
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get mentors for interns");
  }
};

/**
 *
 * @description API for interns to upload work details.
 * @returns a message string that the work details are uploaded successfully.
 */
export const uploadingWorkDetails: (
  body: uploadingWorkDetailsBodyType
) => Promise<{
  message: string;
  status: number;
}> = async (body: uploadingWorkDetailsBodyType) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/intern/uploading_work_details`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return {
      message: response.data.message,
      status: response.status,
    } as { message: string; status: number };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message ?? "An unknown error occurred";
      const status = error.response?.status ?? 500;
      return {
        message,
        status,
      };
    } else {
      console.log(error);
      return {
        message: "An unknown error occurred",
        status: 500,
      };
    }
  }
};

/**
 *
 * @description API for admins to download monthly report.
 * @returns array of interns along with their details.
 */
export const getMonthlyReport: (body: {
  month: number;
}) => Promise<getMonthlyReportResultType[]> = async (body: {
  month: number;
}) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/admin/get_monthly_report`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data as getMonthlyReportResultType[];
  } catch (error) {
    console.log((error as any).response.data.tokenExpired);
    if ((error as any).response.data.tokenExpired) {
      // BackToLogin();
      getNewAccessToken();
    }
    throw new Error("Failed to get monthly report");
  }
};

/**
 *
 * @ignore
 * @description API for admins to promote intern to mentor.
 */
export const promotingInternToMentor: (body: {
  intern_id: string;
}) => Promise<{ message: string }> = async (body: { intern_id: string }) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/admin/promoting_intern_to_mentor`,
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data as { message: string };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to promote intern to mentor");
  }
};

/**
 *
 * @description API for requesting new accesstoken using refresh token.
 * @returns new accesstoken.
 */
export const requestingNewAccessToken: () => Promise<{
  accessToken: string;
}> = async () => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/request-new-access-token`,
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data as { accessToken: string };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to refresh token");
  }
};
