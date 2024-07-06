export type Intern = {
  _id: String;
  name: String;
  department: String;
};

export type InternFeedback = {
  comment: String;
  rating: Number;
};

export type InternWorkReport = {
  projects: string;
  workDone: string;
  workHours?: number;
};

export type User = {
  _id: string;
  name: string;
  role: string;
  age: number;
  mobile: string;
  token?: string;
};

export type InternForMentorType = {
  name: string;
  department: string;
  _id: string;
};

//API Body Types
export type verifyMobileNumberBodyType = {
  mobile: String;
};

export type getInternsForMentorsBodyType = {
  mentor_id: String;
};

export type sendFeedbackBodyType = {
  mentor_id: string;
  intern_id: string;
  rating: number;
  comment: string;
};
