import { FC, useState } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import Papa from "papaparse";
import { getMonthlyReport } from "../../api";
import dayjs from "dayjs";

const Report: FC = () => {
  const [month, setMonth] = useState<number>(dayjs().month() + 1);

  /**
   *
   * @description Ant Design DatePicker component's onChange event handler.
   * @param date complete date object.
   * @param dateString compact date string having only month and year.
   */
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(dateString);
    setMonth(date?.month()! + 1);
  };

  /**
   *
   * @description Function to download the monthly report.
   * @returns CSV file.
   */
  const downloadCSV = async () => {
    try {
      console.log(month);
      const response = await getMonthlyReport({ month: month });
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
        <DatePicker
          onChange={onChange}
          value={dayjs().month(month - 1)}
          picker="month"
        />
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
