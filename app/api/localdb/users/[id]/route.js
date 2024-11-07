import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const { id } = params;

  try {
    const lead = await prisma.lead.findUnique({
      where: { id: parseInt(id) },
      include: {
        student: true,
        account: true,
      },
    });

    if (!lead) {
      return new Response(JSON.stringify({ error: "Lead not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(lead), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch lead" }), {
      status: 500,
    });
  }
}
