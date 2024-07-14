import { FC, useEffect, useState } from "react";
import { InternForMentorType } from "../../types";
import FeedBack from "./feedback";
import { getInternsForMentors } from "../../api";
import { useUser } from "../../store/user";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Mentor: FC = () => {
  const [internData, setInternData] = useState<InternForMentorType[]>([]);
  const [isInternSelected, setIsInternSelected] =
    useState<InternForMentorType | null>(null);
  const { user } = useUser();

  const backClickHandler = () => {
    setIsInternSelected(null);
  };

  const handleInternClick = (intern: InternForMentorType) => {
    console.log(`Intern clicked: ${intern.name}`);
    setIsInternSelected(intern);
  };

  useEffect(() => {
    try {
      (async function () {
        const body = {
          mentor_id: user?._id || "",
        };
        const response = await getInternsForMentors(body);
        setInternData(response);
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col mt-5">
        {isInternSelected && (
          <button
            className="bg-slate-200 p-2 w-fit ml-3 hover:bg-slate-300 duration-200 text-lg font-semibold rounded-lg"
            onClick={backClickHandler}
          >
            <FaArrowAltCircleLeft />
          </button>
        )}
        <div className="w-full text-center">
          <h1 className="text-5xl">Mentor's Feedback</h1>
        </div>
      </div>
      {isInternSelected ? (
        <FeedBack
          _id={isInternSelected._id}
          name={isInternSelected.name}
          department={isInternSelected.department}
        />
      ) : (
        <div className="mt-10 flex flex-col items-center">
          {internData.map((intern) => {
            return (
              <div
                key={intern._id}
                className="flex border-2 mt-5 w-full text-xl hover:drop-shadow-lg hover:duration-100 hover:bg-slate-200 cursor-pointer"
                onClick={() => handleInternClick(intern)}
              >
                <div className="flex justify-between w-full">
                  <p>{intern.name}</p>
                  <p>{intern.department}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default Mentor;
