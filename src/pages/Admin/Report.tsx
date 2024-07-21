import { FC } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import Papa from "papaparse";

const Report: FC = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const data = [
    {
      name: "John Doe",
      department: "frontend",
      mentor: "Bob Marley",
      projects_worked: "Project 1, Project 2",
      work_description: "Worked on the frontend of the project",
      work_hours: 160,
    },
    {
      name: "John Doe",
      department: "frontend",
      mentor: "Bob Marley",
      projects_worked: "Project 1, Project 2",
      work_description: "Worked on the frontend of the project",
      work_hours: 160,
    },
    {
      name: "John Doe",
      department: "frontend",
      mentor: "Bob Marley",
      projects_worked: "Project 1, Project 2",
      work_description: "Worked on the frontend of the project",
      work_hours: 160,
    },
  ];

  const downloadCSV = (data: any) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "report.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="px-2 flex flex-col gap-4 mx-auto">
      <div className="flex gap-5">
        <p>Please select the month</p>
        <DatePicker onChange={onChange} picker="month" />
      </div>
      <button
        className="px-2 p-1 bg-black text-white rounded-md w-1/2 mx-auto"
        onClick={() => downloadCSV(data)}
      >
        Download report
      </button>
    </div>
  );
};

export default Report;
