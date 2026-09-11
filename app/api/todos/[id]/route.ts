// app/api/todos/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { todoService } from "@/lib/services/todoService";
import { validateUpdateTodo } from "@/lib/validations/todoSchema";
import { revalidatePath } from "next/cache";

interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/todos/[id]
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const todo = await todoService.getTodoById(id);

    if (!todo) {
      return NextResponse.json({
        success: false,
        error: `Task with ID '${id}' was not found.`,
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: todo,
    }, { status: 200 });

  } catch (error) {
    console.error("GET /api/todos/[id] error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error. Failed to retrieve task.",
    }, { status: 500 });
  }
}

/**
 * PATCH /api/todos/[id]
 */
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json().catch(() => null);

    // 1. Validate partial payload
    const validation = validateUpdateTodo(body);
    if (!validation.isValid || !validation.data) {
      return NextResponse.json({
        success: false,
        error: "Validation failed",
        details: validation.errors,
      }, { status: 400 });
    }

    // 2. Update task in data service
    const updatedTodo = await todoService.updateTodo(id, validation.data);
    if (!updatedTodo) {
      return NextResponse.json({
        success: false,
        error: `Task with ID '${id}' was not found.`,
      }, { status: 404 });
    }

    // 3. Revalidate cache
    revalidatePath("/todos");

    return NextResponse.json({
      success: true,
      data: updatedTodo,
    }, { status: 200 });

  } catch (error) {
    console.error("PATCH /api/todos/[id] error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error. Failed to update task.",
    }, { status: 500 });
  }
}

/**
 * DELETE /api/todos/[id]
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const success = await todoService.deleteTodo(id);

    if (!success) {
      return NextResponse.json({
        success: false,
        error: `Task with ID '${id}' was not found.`,
      }, { status: 404 });
    }

    // Revalidate cache
    revalidatePath("/todos");

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully.",
    }, { status: 200 });

  } catch (error) {
    console.error("DELETE /api/todos/[id] error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error. Failed to delete task.",
    }, { status: 500 });
  }
}