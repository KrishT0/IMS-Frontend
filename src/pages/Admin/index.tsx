import { FC, useState } from "react";
import UserCreation from "./UserCreation";
import Report from "./Report";

const Admin: FC = () => {
  const [adminOption, setAdminOption] = useState<string>("report");

  return (
    <div className="mt-10 p-5">
      <h1 className="text-3xl font-medium text-center">Admin</h1>
      {adminOption === "report" ? (
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <button
              onClick={() => setAdminOption("create_user")}
              className="bg-black text-white p-1 px-2 rounded-md w-fit"
            >
              Create user
            </button>
          </div>
          <Report />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <button
              onClick={() => setAdminOption("report")}
              className="bg-black text-white p-1 px-2 rounded-md w-fit "
            >
              Report
            </button>
          </div>
          <UserCreation />
        </div>
      )}
    </div>
  );
};

export default Admin;
