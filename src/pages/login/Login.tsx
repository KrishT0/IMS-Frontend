import { FC, useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import { MdPhoneAndroid } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import { auth } from "../../firebase/firebase.config";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { verifyMobileNumber } from "../../api";
import { useUser } from "../../store/user";
import toast, { Toaster } from "react-hot-toast";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    confirmationResult: ConfirmationResult;
  }
}

const Login: FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resendOtp, setResendOtp] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(30);
  const { setUser, setToken } = useUser();

  const navigate = useNavigate();

  console.log("login page");
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("User is signed in");
        navigate("/app/home");
      }
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    let timer: any;
    if (otpSent) {
      timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter > 0) return prevCounter - 1;
          clearInterval(timer);
          return 0;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, resendOtp]);

  const resendOtpHandler = () => {
    onResendOtp();
    setResendOtp(true);
    setCounter(30);
  };

  const onVerifyCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            onSignup();
          },
          "expired-callback": () => {},
        }
      );
    }
  };

  const onSignup = async () => {
    console.log(phoneNumber);
    setLoading(true);
    try {
      const body = { mobile: phoneNumber };
      const user = await verifyMobileNumber(body);
      if (!user.length) {
        setLoading(false);
        toast.error("User not found");
      } else {
        setUser(user[0]);
        onVerifyCaptcha();
        const appVerifier = window.recaptchaVerifier;

        const formatedPhoneNumber = `+91${phoneNumber}`;
        console.log(formatedPhoneNumber);

        signInWithPhoneNumber(auth, formatedPhoneNumber, appVerifier)
          .then((confirmationResult: ConfirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setOtpSent(true);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onVerifyOtp = () => {
    if (!window.confirmationResult) return;
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((userCredential: any) => {
        setToken(userCredential.user.accessToken);
        setLoading(false);
        navigate("/app/home");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error("Invalid OTP");
        setOtp("");
      });
  };

  const loginButtonRole = () => {
    if (otpSent) {
      onVerifyOtp();
    } else {
      onSignup();
    }
  };

  const onResendOtp = () => {
    onVerifyCaptcha();
    const formatedPhoneNumber = `+91${phoneNumber}`;
    signInWithPhoneNumber(auth, formatedPhoneNumber, window.recaptchaVerifier)
      .then((confirmationResult: ConfirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setOtpSent(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp.replace(/\s/g, ""));
  };

  return (
    <div className=" text-center mt-[20%]">
      <h1 className="text-6xl font-semibold mb-5">
        Log<span className="text-red-500">i</span>n.
      </h1>
      <div id="recaptcha-container"></div>

      {!otpSent ? (
        <p className="mt-5 text-2xl">Please enter your phone number </p>
      ) : (
        <>
          <div className=" flex items-center justify-center animate-bounce ">
            <span className="text-red-500 text-6xl bottom-8 left-11 relative animate-pulse">
              .
            </span>
            <MdPhoneAndroid className="text-4xl " />
          </div>
          <p className="text-lg">Please check your device</p>
        </>
      )}
      <div className="flex flex-col gap-5 items-center">
        {!otpSent ? (
          <input
            className="border-2 border-gray-300 p-2 mt-5 rounded-md w-96 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="10-digit Phone number"
          />
        ) : (
          <>
            <OtpInput
              value={otp}
              onChange={handleOtpChange}
              numInputs={6}
              renderInput={(props) => <input {...props} type="tel" />}
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
            <div className="flex justify-center w-[390px] mx-auto">
              {counter ? (
                <p>
                  Resend OTP after:
                  <span className="text-red-500"> {counter} sec</span>
                </p>
              ) : (
                <button onClick={resendOtpHandler}>RESEND OTP</button>
              )}
            </div>
          </>
        )}
        <button
          className={`bg-black text-white ${
            otpSent && "max-w-[290px]"
          } p-2 mt-1 rounded-md w-96 text-center focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-400`}
          onClick={loginButtonRole}
        >
          {loading ? (
            <ImSpinner2 className=" w-full animate-spin text-xl" />
          ) : !otpSent ? (
            "Login"
          ) : (
            "Verify OTP"
          )}
        </button>
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default Login;
