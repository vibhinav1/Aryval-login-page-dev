import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      address,
      city,
      postalCode,
      child,
    } = await req.json();

    const existingAccount = await prisma.account.findUnique({
      where: { email },
    });

    if (existingAccount) {
      return new Response(JSON.stringify({ error: "Email already in use" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = await prisma.account.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const lead = await prisma.lead.create({
      data: {
        FirstName: firstName,
        LastName: lastName,
        Phone: phone,
        Email: email,
        Address: address,
        City: city,
        PostalCode: postalCode,
        accountId: account.id,
        student: child
          ? {
              create: {
                First_Name__c: child.firstName,
                Last_Name__c: child.lastName,
                Birthdate__c: new Date(child.birthday),
                Grade_of_Interest__c: child.gradeOfInterest,
                Entry_Year__c: child.entryYear,
              },
            }
          : undefined,
      },
    });

    return new Response(
      JSON.stringify({ message: "Registration successful" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Registration failed" }), {
      status: 500,
    });
  }
}
