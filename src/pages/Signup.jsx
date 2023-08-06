import {
  Link,
  Form,
  useActionData,
  useNavigation,
} from "react-router-dom";
import axios from "axios";

import back from "../assets/back.svg";

export async function action({ request }) {
  const formData = await request.formData();

  const email = formData.get("email");
  const password = formData.get("password");
  const first_name = formData.get("first_name");
  const last_name = formData.get("last_name");
  const reason = formData.get("reason");

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_URL}/signup`,
      {
        email,
        password,
        first_name,
        last_name,
        reason,
      },
      { headers: { "Content-Type": "application/json" } }
    );
    localStorage.setItem("token", res?.data?.access_token);
    return { message: "Your application has been submitted. Please wait for approval.", status: "success"};
  } catch (error) {
    return{ message: error?.response?.data?.error || error.message, status: "error"};
  }
}

export default function Signup() {
  const actionMessage = useActionData();
  const { state } = useNavigation();
  const message = actionMessage?.message;

  return (
    <div className="w-full bg-[#FFF7ED] h-screen flex justify-center items-center px-[26px]">
      <div className="w-full max-w-[494px]">
        <div className="flex items-center gap-3 justify-between">
          <Link
            to="/"
            className="text-xl font-medium hover:underline flex items-center gap-1"
          >
            <img src={back} alt="" width={12} height={12} /> back
          </Link>
          <h1 className="font-bold text-[32px] leading-[24px] text-dark text-center">
            Contributor application
          </h1>
        </div>

        {message && (
          <h2 className={`${actionMessage?.status !== 'success' ? 'text-red-700': "text-green-500"} text-lg text-center mt-5`}>{message}</h2>
        )}
        <Form replace method="post" className="flex flex-col gap-0.5 mt-8">
          <div className="w-full flex gap-0.5">
            <input
              type="text"
              name="first_name"
              required
              pattern="[A-Za-z]{1,32}"
              placeholder="First name"
              className="border flex-1 indent-3 border-[#4D4D4D] h-14 rounded-t-[5px] border-opacity-5 bg-white"
            />
            <input
              type="text"
              name="last_name"
              required
              pattern="[A-Za-z]{1,32}"
              placeholder="Last name"
              className="border flex-1 indent-3 border-[#4D4D4D] h-14 rounded-t-[5px] border-opacity-5 bg-white"
            />
          </div>
          <input
            type="email"
            name="email"
            required
            placeholder="Email address"
            className="border indent-3 border-[#4D4D4D] h-14 rounded-t-[5px] border-opacity-5 bg-white"
          />
          <input
            type="password"
            name="password"
            required
            pattern="\S{4,}"
            placeholder="Password"
            className="border indent-3 border-[#4D4D4D] h-14 rounded-b-[5px] bg-white border-opacity-5"
          />
          <textarea
            name="reason"
            required
            placeholder="Reason for applying"
            className="border indent-3 border-[#4D4D4D] h-[150px] rounded-b-[5px] bg-white border-opacity-5"
          />
          <button
            disabled={state === "submitting"}
            className="bg-[#FF8C38] mt-5 py-4 rounded-md font-bold text-white w-full"
          >
            {state === "submitting" ? "submitting" : "Apply"}
          </button>
        </Form>
        <p className="font-medium text-2xl text-dark mt-2">
          Already a contributor?{" "}
          <Link to="/login" className="font-bold underline text-[#FF8C38]">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
