import { FC, useEffect, useState } from "react";
import { InternWorkReport, MentorForInternType } from "../../types";
import { useUser } from "../../store/user";
import { selectingMentor, getMentorsForInterns } from "../../api";
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

  const submitClickHandler = () => {
    console.table([projects, workDone, workHours]);
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
