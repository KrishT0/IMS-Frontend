import { FC, useState } from "react";
import { Intern } from "../../types";
import FeedBack from "./feedback";

const Mentor: FC = () => {
  const [isInternSelected, setIsInternSelected] = useState<Intern | null>(null);

  const internData = [
    { id: "1", name: "Alex", department: "frontend" },
    { id: "2", name: "Raphael", department: "ML" },
    { id: "3", name: "Daton", department: "backend" },
    { id: "4", name: "Poxy", department: "devops" },
    { id: "5", name: "Sammy", department: "backend" },
  ];

  const backClickHandler = () => {
    setIsInternSelected(null);
  };

  const handleInternClick = (intern: Intern) => {
    console.log(`Intern clicked: ${intern.name}`);
    setIsInternSelected(intern);
  };

  return (
    <>
      <div className="flex flex-col mt-5">
        {isInternSelected && (
          <button
            className="bg-slate-200 p-1 text-lg font-semibold rounded-lg w-20 mr-5"
            onClick={backClickHandler}
          >
            go back
          </button>
        )}
        <div className="w-full text-center">
          <h1 className="text-5xl">Mentor's Feedback</h1>
        </div>
      </div>
      {isInternSelected ? (
        <FeedBack
          id={isInternSelected.id}
          name={isInternSelected.name}
          department={isInternSelected.department}
        />
      ) : (
        <div className="mt-10 flex flex-col items-center">
          {internData.map((intern) => {
            return (
              <div
                key={intern.id}
                className="flex border-2 mt-5 w-full text-xl hover:drop-shadow-lg hover:duration-100 hover:bg-slate-200 cursor-pointer"
                onClick={() => handleInternClick(intern)}
              >
                <p className="mr-2">{intern.id}</p>
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
