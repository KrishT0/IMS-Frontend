import { FC, useState } from "react";
import { Intern } from "../../types";
import { Rate } from "antd";
import { useUser } from "../../store/user";
import dayjs from "dayjs";
import { sendFeedback } from "../../api";

const FeedBack: FC<Intern> = ({ _id, name }) => {
  const [comment, setComment] = useState<string>("");
  const [ratings, setRating] = useState<number>(2.5);
  const { user } = useUser();

  const mentorId = user?._id;
  const getCurrentMonthNumber = () => {
    return dayjs().month() + 1;
  };
  const submitClickHandler = async () => {
    const month = getCurrentMonthNumber();
    try {
      const body = {
        mentor_id: mentorId,
        intern_id: _id,
        month,
        ratings,
        feedback: comment,
      };
      const response = await sendFeedback(body);
      console.log(response);
    } catch (error) {
      console.log(error);
    }

    console.table([comment, ratings, mentorId, _id, month]);
  };

  return (
    <div className="mx-5">
      <div className="text-2xl text-center font-semibold">
        {name.toUpperCase()}
      </div>
      <div>
        <div className="flex gap-5 ">
          <p className="text-2xl">Comments:</p>
          <textarea
            className="border-2 rounded-md w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex gap-5 mt-5">
          <p className="text-2xl">Rating:</p>
          <Rate
            allowHalf
            defaultValue={2.5}
            value={ratings}
            onChange={(value) => setRating(value)}
          />
        </div>
        <button
          className="text-lg p-1 bg-slate-200 rounded-lg"
          onClick={submitClickHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedBack;
