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
import { useRefreshToken } from "../../store/refreshToken";
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
  const { setRefreshToken } = useRefreshToken();

  const navigate = useNavigate();

  /**
   *
   * @description This useEffect will check if the user is already logged in or not.
   *  If the user is already logged in, then it will redirect the user to the home page.
   *  If the user is not logged in, then it will show the login page.
   */
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

  /**
   *
   * @description This useEffect will start a timer for 30 seconds when the OTP is sent.
   */
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

  /**
   *
   * @description This function will create a new captcha.
   * If the captcha is already created, then it will use the existing captcha.
   */
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

  /**
   *
   * @description This function will verify the mobile number.
   * If the mobile number is not found, then it will show an error message.
   * If the mobile number is found, then it will store details of user in zustand store in localstorage.
   */
  const onSignup = async () => {
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

  /**
   * @description This function will verify the OTP.
   * If the OTP is invalid, then it will show an error message.
   * If the OTP is valid, then it will store the token and refresh token in zustand store in localstorage.
   * It will also redirect the user to the home page.
   */
  const onVerifyOtp = () => {
    if (!window.confirmationResult) return;
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((userCredential: any) => {
        setRefreshToken(userCredential.user.refreshToken);
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

  /**
   *
   * @description This function will handle the login button role.
   */
  const loginButtonRole = () => {
    if (otpSent) {
      onVerifyOtp();
    } else {
      onSignup();
    }
  };

  /**
   *
   * @description This function will resend the OTP and will also verify the captcha and restart opt timer.
   */
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

  /**
   *
   * @param newOtp string
   * @description This function will handle the OTP change.
   */
  const handleOtpChange = (newOtp: string) => {
    setOtp(newOtp.replace(/\s/g, ""));
  };

  /**
   *
   * @param event React.ChangeEvent<HTMLInputElement>
   * @description This function will handle the phone number change and remove white space.
   */
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s+/g, "");
    if (/^\d{0,10}$/.test(value)) {
      setPhoneNumber(value);
    }
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
            onChange={handlePhoneNumberChange}
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
