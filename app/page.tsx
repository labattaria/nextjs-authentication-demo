import AuthForm from "@/components/auth-form";
import type { AuthMode } from "@/types/auth";
import './globals.css';

interface HomeProps {
  searchParams: {
    [key: string]: string | undefined;
  };
}

export default function Home({ searchParams }: HomeProps) {
  const formMode: AuthMode = searchParams.mode === "signup" ? "signup" : "login";
  return <AuthForm mode={formMode} />;
}
