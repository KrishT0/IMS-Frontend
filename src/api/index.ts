import axios from "axios";
import {
  getInternsForMentorsBodyType,
  InternForMentorType,
  User as UserType,
  verifyMobileNumberBodyType,
  sendFeedbackBodyType,
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
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send feedback");
  }
};
