import { FC, useState } from "react";

const UserCreation: FC = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [mobile, setMobile] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.table({ name, age, mobile, department });
    //api call to create user
  };

  return (
    <div>
      <div>User Creation</div>
      <form className=" flex flex-col gap-2" onSubmit={submitHandler}>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Name"
            className="border-2 rounded-md w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age"
            className="border-2 rounded-md w-full"
            value={age}
            onChange={(e) => setAge(+e.target.value)}
          />
        </div>
        <input
          type="text"
          placeholder="Mobile"
          className="border-2 rounded-md w-full"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          className="border-2 rounded-md w-full"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button className="px-2 p-1 bg-black text-white rounded-md w-1/2 mx-auto">
          Create User
        </button>
      </form>
    </div>
  );
};

export default UserCreation;
