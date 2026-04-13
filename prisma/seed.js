import "dotenv/config"; // ✅ must be first
import { PrismaClient } from "../src/generated/prisma/index.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const creatorId = "75485fe1-8b4c-47c6-b660-2e158e29ffc7";

const projects = [
    {
        title: "Qwertrty",
        userId: creatorId,
        description: "lorem wegh wehg wern sdfgn sdfg sd sdfgh sdfghaws asdfgh sdfgh sdfgh sdfgh sdfg sdfg sdfg sdfghsdfg sdfg sdfg sdfg sdfg dfg",
        createdBy: creatorId,
    },
    {
        title: "dfgbfghffjfg",
        userId: creatorId,
        createdBy: creatorId,
    },
    {
        title: "dfbdnjf",
        userId: creatorId,
        createdBy: creatorId,
    },
    {
        title: "wertyu",
        userId: creatorId,
        description: "lorem wegh wehg wern sdfgn sdfg sd sdfgh sdfghaws asdfgh sdfgh sdfgh sdfgh sdfg sdfg sdfg sdfghsdfg sdfg sdfg sdfg sdfg dfg",
        createdBy: creatorId,
    },
];

const main = async () => {
    console.log("Seeding projects....");

    // ✅ loop is inside main()
    for (const project of projects) {
        await prisma.project.create({ data: project });
        console.log(`Seeded: ${project.title}`);
    }

    console.log("Seeding completed!");
};

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });