import axios from "axios";
import {
  getInternsForMentorsBodyType,
  InternForMentorType,
  User as UserType,
  verifyMobileNumberBodyType,
  sendFeedbackBodyType,
  setMentorBodyType,
  uploadingWorkDetailsBodyType,
} from "../types";

const baseUrl = import.meta.env.VITE_BASE_URL;
const token = JSON.parse(localStorage.getItem("user") || "{}");
const accessToken = token?.state?.user?.token;

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
    if (response.status === 409) {
      return {
        message: response.data.message,
        status: response.status,
      } as { message: string; status: number };
    } else {
      return {
        message: response.data.message,
        status: response.status,
      } as { message: string; status: number };
    }
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
