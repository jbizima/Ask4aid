import {
  Link,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import axios from "axios";

import back from "../assets/back.svg"
export async function action({ request }) {
  const formData = await request.formData();
  
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/login`,
      {
        email,
        password,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorage.setItem("token", res?.data?.access_token);
    return redirect("/contribute");
  } catch (error) {
    return error?.response?.data?.msg || error.message;
  }
}

export default function Login() {

  const actionMessage = useActionData();
  const { state } = useNavigation();
  const message = actionMessage;

  return (
    <div className="w-full bg-[#FFF7ED] h-screen flex justify-center items-center px-[26px]">
      <div className="w-full max-w-[494px]">
        <div className="flex items-center gap-3 justify-between">
          <Link to="/" className="text-xl font-medium hover:underline flex items-center gap-1"><img src={back} alt="" width={12} height={12} /> back</Link>
          <h1 className="font-bold text-[32px] leading-[24px] text-dark text-center">
            Sign in to your account
          </h1>
        </div>

        {message && (
          <h2 className="text-red-700 text-lg text-center mt-5">{message}</h2>
        )}
        <Form replace method="post" className="flex flex-col mt-8">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="border indent-3 border-[#4D4D4D] h-14 rounded-t-[5px] border-opacity-5 bg-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="border indent-3 border-[#4D4D4D] h-14 rounded-b-[5px] bg-white border-opacity-5"
          />
          <button
            disabled={state === "submitting"}
            className="bg-[#FF8C38] mt-5 py-4 rounded-md font-bold text-white w-full"
          >
            {state === "submitting" ? "submitting" : "Signin"}
          </button>
        </Form>
        <p className="font-medium text-2xl text-dark mt-2">
          Not yet a contributor?{" "}
          <Link to="/signup" className="font-bold text-[#FF8C38]">
            Apply here
          </Link>
        </p>
      </div>
    </div>
  );
}
