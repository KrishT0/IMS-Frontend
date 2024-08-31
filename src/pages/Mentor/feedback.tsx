import { FC, useState } from "react";
import { Intern } from "../../types";
import { Rate } from "antd";
import { useUser } from "../../store/user";
import dayjs from "dayjs";
import { sendFeedback } from "../../api";

type ErrorType = {
  comment: string;
  ratings: string;
};

const FeedBack: FC<Intern> = ({ _id, name }) => {
  const [comment, setComment] = useState<string>("");
  const [ratings, setRating] = useState<number>(2.5);
  const [error, setError] = useState<ErrorType>({
    comment: "",
    ratings: "",
  });
  const { user } = useUser();

  const mentorId = user?._id;

  /**
   * 
   * This function will validate the fields and give error if any.
   * @returns boolean (true if all fields are valid else false)
   */
  const validateFields = () => {
    const newError: ErrorType = { comment: "", ratings: "" };
    let isValid = true;

    if (!comment) {
      newError.comment = "Comment is required";
      isValid = false;
    }

    if (!ratings) {
      newError.ratings = "Ratings is required";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  /**
   * 
   * This function will submit feedback details by calling API
   */
  const submitClickHandler = async () => {
    if (!validateFields()) {
      return;
    }

    const month = dayjs().month() + 1;
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
  };

  return (
    <div className="mx-5">
      <div className="text-2xl m-5 text-center font-semibold">
        {name.toUpperCase()}
      </div>
      <div>
        <div className="flex flex-col gap-2 ">
          <div className="flex flex-col">
            <p className="text-xl w-24">Comments</p>
            {error.comment && (
              <p className="text-red-500 text-xs">{error.comment}</p>
            )}
          </div>
          <textarea
            className="border-2 rounded-md w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex flex-col">
            <p className="text-xl w-24">Rating</p>
            {error.ratings && (
              <p className="text-red-500 text-xs">{error.ratings}</p>
            )}
          </div>
          <div className="flex items-center">
            <Rate
              allowHalf
              defaultValue={2.5}
              value={ratings}
              onChange={(value) => setRating(value)}
            />
          </div>
        </div>
        <button
          className="text-lg p-1 mt-5 mx-auto bg-black text-white rounded-lg"
          onClick={submitClickHandler}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FeedBack;
