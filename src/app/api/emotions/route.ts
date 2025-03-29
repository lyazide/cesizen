import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Fetch all emotions
    const emotions = await prisma.emotion.findMany();

    console.log(emotions);
    if (!emotions || emotions.length === 0) {
      return NextResponse.json(
        { error: "No emotions found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: emotions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching emotions:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the emotions." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { emotion, emotionBase } = await req.json();
  try {
    const newemotion = await prisma.emotion.create({
      data: {
        emotion,
        emotionBase,
      },
    });
    return NextResponse.json({ data: newemotion }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { emotion, emotionBase, id } = await req.json();
  try {
    const newemotion = await prisma.emotion.update({
      where: { id: id },
      data: {
        emotion,
        emotionBase,
      },
    });
    return NextResponse.json({ data: newemotion }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  try {
    const deletedemotion = await prisma.emotion.delete({
      where: { id: id },
    });
    return NextResponse.json({ data: deletedemotion }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
