import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { email, password } = await req.json();
        const account = await prisma.account.findUnique({ where: { email } });

        if (!account) {
            return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
        }

        const isMatch = await bcrypt.compare(password, account.password);
        if (!isMatch) {
            return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
        }

        const token = jwt.sign({ id: account.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const { password: _, ...accountInfo } = account;

        return new Response(JSON.stringify({ token, ...accountInfo }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Login failed" }), { status: 500 });
    }
}
