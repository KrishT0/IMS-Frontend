import { FC } from "react";
import Admin from "../Admin";
import Intern from "../Intern";
import Mentor from "../Mentor";
import { useUser } from "../../store/user";

const Home: FC = () => {
  const { user } = useUser();
  return (
    <>
      {user?.role === "admin" ? (
        <Admin />
      ) : user?.role === "intern" ? (
        <Intern />
      ) : (
        <Mentor />
      )}
    </>
  );
};

export default Home;
