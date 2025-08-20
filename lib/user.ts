import { prisma } from "./prisma";
import type { User } from "@/types/user";

export async function createUser(email: string, password: string): Promise<number> {
  const user = await prisma.user.create({
    data: {
      email,
      password,
    },
  });

  return user.id;
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) return undefined;

  return {
    id: user.id,
    email: user.email,
    password: user.password,
  };
}
