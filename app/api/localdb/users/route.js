import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        student: true,
        account: true,
      },
    });
    return new Response(JSON.stringify(leads), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch leads" }), {
      status: 500,
    });
  }
}
