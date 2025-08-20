import { logout } from "@/actions/auth-actions";
import type { ReactNode } from "react";
import "../globals.css";

export const metadata = {
  title: "Next Auth",
  description: "Next.js Authentication",
};

interface AuthRootLayoutProps {
  children: ReactNode;
}

export default function AuthRootLayout({ children }: AuthRootLayoutProps) {
  return (
    <>
      <header className="flex justify-between items-center max-w-[50rem] my-8 mx-auto">
        <p className="text-xl">Welcome back!</p>
        <form action={logout}>
          <button className="font-inherit cursor-pointer py-2 px-6 border-none bg-[#6f34a9] text-[#d0cfd6] rounded hover:bg-[#5f2a8a] active:bg-[#5f2a8a]">Logout</button>
        </form>
      </header>
      {children}
    </>
  );
}
