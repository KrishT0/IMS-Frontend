import { FC } from "react";
import { firestore } from "../../firebase/firebase.config";

const Home: FC = () => {
  return (
    <div>
      <div>Users</div>
      <div>
        <li>user1</li>
        <li>user2</li>
      </div>
    </div>
  );
};

export default Home;
