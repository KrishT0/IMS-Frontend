import { FC, useState } from "react";
import { Intern, InternFeedback } from "../../types";
import { Rate } from "antd";

const FeedBack: FC<Intern> = ({ id, name }) => {
  const [internInfo, setInternInfo] = useState<InternFeedback | null>(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(2.5);

  const submitClickHandler = () => {
    setInternInfo({
      comment: comment,
      rating: rating,
    });
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
            value={rating}
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
