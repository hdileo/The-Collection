import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

async function main() {
  console.log("Starting database seed...");

  await prisma.review.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.game.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("Password123!", 10);

  const user1 = await prisma.user.create({
    data: {
      username: "player1",
      email: "player1@email.com",
      password: passwordHash,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "player2",
      email: "player2@email.com",
      password: passwordHash,
    },
  });

  const game1 = await prisma.game.create({
    data: {
      title: "Clair Obscur: Expedition 33",
      genre: "RPG",
      platform: "PC",
      releaseYear: 2025,
    },
  });

  const game2 = await prisma.game.create({
    data: {
      title: "Elden Ring",
      genre: "Action RPG",
      platform: "PC/Console",
      releaseYear: 2022,
    },
  });

  await prisma.collection.create({
    data: {
      userId: user1.id,
      gameId: game1.id,
      status: "playing",
      hoursPlayed: 10,
    },
  });

  await prisma.collection.create({
    data: {
      userId: user2.id,
      gameId: game2.id,
      status: "completed",
      hoursPlayed: 120,
    },
  });

  await prisma.review.create({
    data: {
      userId: user1.id,
      gameId: game1.id,
      rating: 9,
      comment: "Amazing game",
    },
  });

  await prisma.review.create({
    data: {
      userId: user2.id,
      gameId: game2.id,
      rating: 10,
      comment: "Masterpiece",
    },
  });

  console.log("Seed completed successfully.");
  console.log("Test accounts:");
  console.log("player1@email.com / Password123!");
  console.log("player2@email.com / Password123!");
}

main()
  .catch((error) => {
    console.error("Seed error:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });