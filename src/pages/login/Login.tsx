import { FC, useState } from "react";
import OtpInput from "react-otp-input";
import { MdPhoneAndroid } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";

const Login: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  console.log(otp);

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp.replace(/\s/g, ""));
  };

  return (
    <div className=" text-center mt-52">
      <h1 className="text-6xl font-semibold mb-5">Login</h1>

      {!otpSent ? (
        <p className="mt-5 text-2xl">Please enter your phone number </p>
      ) : (
        <>
          <div className=" flex items-center justify-center animate-bounce ">
            <span className="text-red-600 text-6xl bottom-7  left-8 relative animate-pulse">
              .
            </span>
            <MdPhoneAndroid className="text-4xl " />
          </div>
          <p>Please check your device for OTP</p>
        </>
      )}
      <div className="flex flex-col gap-5 items-center">
        {!otpSent ? (
          <input
            className="border-2 border-gray-300 p-2 mt-5 rounded-md w-96 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="10-digit Phone number"
          />
        ) : (
          <OtpInput
            value={otp}
            onChange={handleOtpChange}
            numInputs={6}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              border: "2px solid #a3a3a3",
              marginRight: "5px",
              marginLeft: "5px",
              borderColor: "#a3a3a3",
              height: "40px",
              width: "40px",
              marginTop: "20px",
              borderRadius: "4px",
              outline: "none",
              boxShadow: "0 0 0 1px transparent",
              transition: "box-shadow 0.2s ease-in-out",
            }}
          />
        )}
        <button
          className={`bg-black text-white ${
            otpSent && "max-w-[290px]"
          } p-2 mt-1 rounded-md w-96 text-center focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400`}
        >
          {loading ? (
            <ImSpinner2 className=" w-full animate-spin text-xl" />
          ) : !otpSent ? (
            "Login"
          ) : (
            "Verify OTP"
          )}
        </button>
      </div>
    </div>
  );
};

export default Login;
