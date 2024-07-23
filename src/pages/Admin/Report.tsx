import { FC } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import Papa from "papaparse";
import { getMonthlyReport } from "../../api";
import dayjs from "dayjs";

const Report: FC = () => {
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  const downloadCSV = async () => {
    try {
      const response = await getMonthlyReport({ month: dayjs().month() + 1 });
      console.log(response);
      const csv = Papa.unparse(response);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.setAttribute("hidden", "");
      a.setAttribute("href", url);
      a.setAttribute("download", "report.csv");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="px-2 flex flex-col gap-4 mx-auto">
      <div className="flex gap-5">
        <p>Please select the month</p>
        <DatePicker onChange={onChange} picker="month" />
      </div>
      <button
        className="px-2 p-1 bg-black text-white rounded-md w-1/2 mx-auto"
        onClick={downloadCSV}
      >
        Download report
      </button>
    </div>
  );
};

export default Report;
