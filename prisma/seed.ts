import { prisma } from "../lib/prisma";

async function main() {
  const trainings = [
    { title: "Yoga", image: "/yoga.jpg", description: "A gentle way to improve flexibility and balance." },
    { title: "Boxing", image: "/boxing.jpg", description: "A high-energy workout that improves strength and speed." },
    { title: "Running", image: "/running.jpg", description: "A great way to improve cardiovascular health and endurance." },
    { title: "Weightlifting", image: "/weightlifting.jpg", description: "A strength-building workout that helps tone muscles." },
    { title: "Cycling", image: "/cycling.jpg", description: "A low-impact workout that improves cardiovascular health and endurance." },
    { title: "Gaming", image: "/gaming.jpg", description: "A fun way to improve hand-eye coordination and reflexes." },
    { title: "Sailing", image: "/sailing.jpg", description: "A relaxing way to enjoy the outdoors and improve balance." },
  ];

  await Promise.all(
    trainings.map(t =>
      prisma.training.upsert({
        where: { title: t.title },
        update: {},
        create: t,
      })
    )
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });