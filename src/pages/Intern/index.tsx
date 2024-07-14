import { FC, useEffect, useState } from "react";
import { MentorForInternType } from "../../types";
import { useUser } from "../../store/user";
import {
  selectingMentor,
  getMentorsForInterns,
  uploadingWorkDetails,
} from "../../api";
import dayjs from "dayjs";
import toast, { Toaster } from "react-hot-toast";

const Intern: FC = () => {
  const { user, setMentor } = useUser();
  const [projects, setProjects] = useState<string>("");
  const [workDone, setWorkDone] = useState<string>("");
  const [workHours, setWorkHours] = useState<number>(0);
  const [mentors, setMentors] = useState<MentorForInternType[]>([]);
  const [isMentorSelected, setIsMentorSelected] = useState<boolean>(
    !!user?.mentor
  );

  console.log("isMentorSelected", isMentorSelected);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const body = {
          department: user?.department!,
        };
        if (!isMentorSelected) {
          const mentors = await getMentorsForInterns(body);
          setMentors(mentors);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchMentors();
  }, []);

  const mentorClickHandler = async (mentorId: string) => {
    const body = {
      mentor_id: mentorId,
      intern_id: user?._id!,
    };

    try {
      const response = await selectingMentor(body);
      if (response && response.message) {
        toast.success(response.message);
      }
      setMentor(mentorId);
      setIsMentorSelected(true);
    } catch (error) {
      console.log(error);
      toast.error("Failed to select mentor");
    }
  };

  const submitClickHandler = async () => {
    try {
      const intern_id = user?._id!;
      const name = user?.name!;
      const month = dayjs().month() + 1;
      const body = {
        name,
        intern_id,
        month,
        project_worked: projects,
        work_description: workDone,
        workHours,
      };

      const response = await uploadingWorkDetails(body);
      if (response.status === 409) {
        toast.error(response.message, { style: { background: "#fde0e0" } });
      } else {
        if (response && response.message) {
          toast.success(response.message);
          setProjects("");
          setWorkDone("");
          setWorkHours(0);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 p-5">
      <Toaster position="top-center" />
      <h1 className="text-3xl font-medium text-center">Inter user</h1>
      {isMentorSelected ? (
        <div>
          <div className="">
            <p className="text-xl">Projects work on:</p>
            <textarea
              className="border-2 rounded-md w-full"
              value={projects}
              onChange={(e) => setProjects(e.target.value)}
            />
          </div>
          <div>
            <p className="text-xl">Work done in projetcs:</p>
            <textarea
              className="border-2 rounded-md w-full"
              value={workDone}
              onChange={(e) => setWorkDone(e.target.value)}
            />
          </div>
          <div>
            <p className="text-xl">Work Hours:</p>
            <input
              className="border-2 rounded-md w-full"
              type="tel"
              value={workHours}
              onChange={(e) => setWorkHours(+e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div>
          <p className="text-xl">Select Mentors</p>
          {mentors.map((mentor) => {
            return (
              <div
                key={mentor._id}
                className="flex justify-between items-center"
              >
                <p>{mentor.name}</p>
                <button
                  className="p-1 bg-slate-200 rounded-lg"
                  onClick={() => mentorClickHandler(mentor._id)}
                >
                  Select
                </button>
              </div>
            );
          })}
        </div>
      )}
      <button
        className="p-1 bg-slate-200 rounded-lg"
        onClick={submitClickHandler}
      >
        Submit
      </button>
    </div>
  );
};

export default Intern;
