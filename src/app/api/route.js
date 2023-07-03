import dbConnect from "@/utils/dbConnect";
import Todolist from "@/models/Todo";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    dbConnect();
    const todos = await Todolist.find();
    return new NextResponse(JSON.stringify(todos), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    dbConnect();
    const body = await request.json();
    const todo = new Todolist(body);
    await todo.save();
    return new NextResponse(JSON.stringify(todo), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};
