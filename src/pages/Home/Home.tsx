import { FC, useState, useEffect } from "react";
import { firestore } from "../../firebase/firebase.config";
import { collection, getDocs } from "firebase/firestore";

type Users = {
  name: string;
  age: number;
  mobile: string;
  id?: string;
};

const Home: FC = () => {
  const [users, setUsers] = useState<Users[]>([]);
  const getData = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "users"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      console.log(data);
      setUsers(data as Users[]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" m-5">
      <div className="text-7xl text-center">Users</div>
      <div>
        <ul className=" flex items-start justify-center flex-col">
          {users.map((u: Users) => {
            return (
              <li className=" flex gap-2 " key={u.mobile}>
                <div>{u.name}</div>
                <div>{u.age}</div>
                <div>{u.mobile}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
