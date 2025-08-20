import { verifyAuth } from "@/lib/auth";
import { getTrainings } from "@/lib/training";
import { redirect } from "next/navigation";
import type { Training } from "@/types/training";
import '../../globals.css';

export default async function TrainingPage() {
  const result = await verifyAuth();

  if (!result.user) {
    redirect("/");
    return null;
  }

  const trainingSessions: Training[] = getTrainings();

  return (
    <main className="max-w-[50rem] my-8 mx-auto">
      <h1 className="text-3xl text-center mb-4">Find your favorite activity</h1>
      <ul className="max-w-[40rem] my-8 mx-auto p-0 grid gap-4 list-none grid-cols-[repeat(auto-fill,minmax(10rem,1fr))]">
        {trainingSessions.map((training) => (
          <li
            key={training.id}
            className="flex flex-col items-center my-4 rounded bg-[#0a0a0a] shadow-[0_0_10px_0_rgba(0,0,0,0.4)]"
          >
            <img
              src={`/trainings/${training.image}`}
              alt={training.title}
              className="w-full"
            />
            <div className="text-center">
              <h2 className="mt-4 px-4 text-[#d0cfd6] text-base uppercase">{training.title}</h2>
              <p className="m-4 text-[#7c7a80]">{training.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
