import db from './db';
import type { Training } from "@/types/training";

export function getTrainings(): Training[] {
  const stmt = db.prepare('SELECT * FROM trainings');
  const rows = stmt.all();

  return rows.map((row: any) => ({
    id: row.id as number,
    title: row.title as string,
    image: row.image as string,
    description: row.description as string,
  }));
}
