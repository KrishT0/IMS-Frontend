import { FC, useEffect, useState } from "react";
import { InternForMentorType } from "../../types";
import FeedBack from "./feedback";
import { getInternsForMentors } from "../../api";
import { useUser } from "../../store/user";
import { FaArrowAltCircleLeft } from "react-icons/fa";

/**
 *
 * This functional component will render the mentor component.
 * @returns JSX.Element
 */
const Mentor: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [internData, setInternData] = useState<InternForMentorType[]>([]);
  const [isInternSelected, setIsInternSelected] =
    useState<InternForMentorType | null>(null);
  const { user } = useUser();

  /**
   *
   * This function will handle the back button click event.
   */
  const backClickHandler = () => {
    setIsInternSelected(null);
  };

  /**
   *
   * @param intern intern details (name, department, _id)
   * This function will handle the intern click event.
   */
  const handleInternClick = (intern: InternForMentorType) => {
    console.log(`Intern clicked: ${intern.name}`);
    setIsInternSelected(intern);
  };

  /**
   *
   * This function will fetch the interns for the mentor on component mount.
   */
  useEffect(() => {
    try {
      const fetchInterns = async () => {
        const body = {
          mentor_id: user?._id || "",
        };
        const response = await getInternsForMentors(body);
        setInternData(response);
      };

      if (user?.token) {
        fetchInterns();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user?.token]);

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
      ) : loading ? (
        <p>Loading</p>
      ) : (
        <div className="mt-10 flex flex-col items-center">
          <h2 className="text-xl font-semibold">
            Select the intern you want to review.
          </h2>
          <div className="grid grid-flow-col w-full gap-5 p-2">
            {internData.map((intern) => {
              return (
                <div
                  key={intern._id}
                  className="flex bg-slate-200 justify-center rounded-md p-2 h-fit mt-5 w-full text-xl hover:drop-shadow-lg hover:duration-100 hover:bg-slate-200 cursor-pointer"
                  onClick={() => handleInternClick(intern)}
                >
                  <p>{intern.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Mentor;
