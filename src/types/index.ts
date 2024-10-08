export type Intern = {
  _id: string;
  name: string;
  department: string;
};

export type InternFeedback = {
  comment: string;
  rating: number;
};

export type User = {
  _id: string;
  name: string;
  role: string;
  age: number;
  department: string;
  mobile: string;
  intern?: string[];
  mentor?: string;
  token?: string;
};

export type InternForMentorType = {
  name: string;
  department: string;
  _id: string;
};

export type MentorForInternType = {
  name: string;
  _id: string;
};

//API Body Types
export type verifyMobileNumberBodyType = {
  mobile: string;
};

export type getInternsForMentorsBodyType = {
  mentor_id: string;
};

export type sendFeedbackBodyType = {
  mentor_id: string | undefined;
  intern_id: string;
  ratings: number;
  feedback: string;
  month: number;
};

export type setMentorBodyType = {
  intern_id: string;
  mentor_id: string;
};

export type uploadingWorkDetailsBodyType = {
  name: string;
  intern_id: string;
  month: number;
  project_worked: string;
  work_description: string;
  workHours?: number;
};

export type getMonthlyReportResultType = {
  name: string;
  age: number;
  mobile: string;
  department: string;
  project_worked: string;
  work_description: string;
  feedback: string;
  rating: number;
};
