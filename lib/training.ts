import { prisma } from "./prisma";
import type { Training } from "@/types/training";

export async function getTrainings(): Promise<Training[]> {
  const trainings = await prisma.training.findMany();

  return trainings.map((t: typeof trainings[number]) => ({
    id: t.id,
    title: t.title,
    image: t.image,
    description: t.description,
  }));
}