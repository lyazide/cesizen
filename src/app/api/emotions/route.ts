import prisma from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all emotions
    const emotions = await prisma.emotion.findMany();

    //console.log(emotions);
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
    const newEmotion = await prisma.emotion.create({
      data: {
        emotion,
        emotionBase,
      },
    });
    return NextResponse.json({ data: newEmotion }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const { emotion, emotionBase, id } = await req.json();
  try {
    const newEmotion = await prisma.emotion.update({
      where: { id: id },
      data: {
        emotion,
        emotionBase,
      },
    });
    return NextResponse.json({ data: newEmotion }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { id }: { id: number } = await req.json();
  try {
    const deletedEmotion = await prisma.emotion.delete({
      where: { id: id },
    });
    return NextResponse.json({ data: deletedEmotion }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
