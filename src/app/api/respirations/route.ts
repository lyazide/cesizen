import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import Respiration from "../../../types/respirations";

export async function GET() {
  try {
    // Fetch all respirations
    const respirations: Respiration[] = await prisma.respiration.findMany();

    //console.log(respirations);
    if (!respirations || respirations.length === 0) {
      return NextResponse.json(
        { error: "No respirations found." },
        { status: 404 }
      );
    }

    return NextResponse.json<{ data: Respiration[] }>(
      { data: respirations },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching respirations:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the respirations." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const {
    nom,
    description,
    inspiration,
    expiration,
    apnee,
  }: {
    nom: string;
    description: string;
    inspiration: number;
    expiration: number;
    apnee: number;
  } = await req.json();
  try {
    const newRespiration: Respiration = await prisma.respiration.create({
      data: {
        nom,
        description,
        inspiration,
        expiration,
        apnee,
      },
    });
    return NextResponse.json<{ data: Respiration }>(
      { data: newRespiration },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const {
    nom,
    description,
    inspiration,
    expiration,
    apnee,
    id,
  }: {
    nom: string;
    description: string;
    inspiration: number;
    expiration: number;
    apnee: number;
    id: number;
  } = await req.json();
  try {
    const newRespiration: Respiration = await prisma.respiration.update({
      where: { id: id },
      data: {
        nom,
        description,
        inspiration,
        expiration,
        apnee,
      },
    });
    return NextResponse.json<{ data: Respiration }>(
      { data: newRespiration },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id }: { id: number } = await req.json();
  try {
    const deletedRespiration: Respiration = await prisma.respiration.delete({
      where: { id: id },
    });
    return NextResponse.json<{ data: Respiration }>(
      { data: deletedRespiration },
      { status: 201 }
    );
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
