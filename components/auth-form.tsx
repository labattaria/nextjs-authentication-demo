"use client";

import { auth } from "@/actions/auth-actions";
import Link from "next/link";
import { useFormState } from "react-dom";
import type { AuthMode, AuthResult, FormErrors } from "@/types/auth";

interface AuthFormProps {
  mode: AuthMode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const initialState: AuthResult = { errors: {} };
  const [formState, formAction] = useFormState(auth.bind(null, mode), initialState);

  return (
    <form
      className="w-[90%] max-w-[40rem] rounded-md p-12 px-16 my-20 mx-auto bg-[#b8b4c3] shadow-[0_0_10px_rgba(0,0,0,0.4)]"
      action={formAction}
    >
      <div>
        <img
          src="/images/auth-icon.jpg"
          alt="A lock icon"
          className="block w-24 h-24 rounded-full my-4 mx-auto filter drop-shadow-[0_0_6px_rgba(30,30,32,0.3)]"
        />
      </div>

      <p>
        <label className="block mb-1 font-bold text-[#46454a]" htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          className="w-full p-2 rounded-sm border-none bg-[#d9d7df] text-[#46454a] font-inherit"
        />
      </p>

      <p className="mt-4">
        <label className="block mb-1 font-bold text-[#46454a]" htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full p-2 rounded-sm border-none bg-[#d9d7df] text-[#46454a] font-inherit"
        />
      </p>

      {formState.errors && Object.keys(formState.errors).length > 0 && (
        <ul className="list-none m-0 p-0 text-[#a21d4c] mt-2">
          {Object.entries(formState.errors as FormErrors).map(([field, message]) => (
            <li key={field}>{message ?? ""}</li>
          ))}
        </ul>
      )}

      <p className="mt-4">
        <button
          type="submit"
          className="w-full font-inherit cursor-pointer p-2 px-6 border-none bg-[#4b34a9] text-[#d0cfd6] rounded-sm hover:bg-[#432aa3] active:bg-[#432aa3]"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </p>

      <p className="mt-4">
        {mode === "login" && (
          <Link
            href="/?mode=signup"
            className="text-[#564f6e] text-center block my-4 hover:text-[#4b34a9]"
          >
            Create an account.
          </Link>
        )}
        {mode === "signup" && (
          <Link
            href="/?mode=login"
            className="text-[#564f6e] text-center block my-4 hover:text-[#4b34a9]"
          >
            Login with existing account.
          </Link>
        )}
      </p>
    </form>
  );
}
