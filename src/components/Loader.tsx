import { FC } from "react";
import { RiLoader5Fill } from "react-icons/ri";

const Loader: FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin  text-5xl">
        <RiLoader5Fill  />
      </div>
    </div>
  );
};

export default Loader;
