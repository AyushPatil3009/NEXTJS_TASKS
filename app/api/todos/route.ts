// app/api/todos/route.ts
import { NextRequest, NextResponse } from "next/server";
import { todoService } from "@/lib/services/todoService";
import { validateCreateTodo } from "@/lib/validations/todoSchema";
import { TodoQueryParams } from "@/lib/types/todo";
import { revalidatePath, revalidateTag } from "next/cache";

/**
 * GET /api/todos
 * Supports: ?search=&status=&priority=&category=&sortBy=&sortOrder=&page=&limit=
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const params: TodoQueryParams = {
      search: searchParams.get("search") || undefined,
      status: (searchParams.get("status") as TodoQueryParams["status"]) || "all",
      priority: (searchParams.get("priority") as TodoQueryParams["priority"]) || "all",
      category: (searchParams.get("category") as TodoQueryParams["category"]) || "all",
      sortBy: (searchParams.get("sortBy") as TodoQueryParams["sortBy"]) || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as TodoQueryParams["sortOrder"]) || "desc",
      page: searchParams.get("page") ? parseInt(searchParams.get("page")!, 10) : 1,
      limit: searchParams.get("limit") ? parseInt(searchParams.get("limit")!, 10) : 6,
    };

    const result = await todoService.getTodos(params);

    return NextResponse.json({
      success: true,
      data: result,
    }, { status: 200 });

  } catch (error) {
    console.error("GET /api/todos error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error. Failed to fetch tasks.",
    }, { status: 500 });
  }
}

/**
 * POST /api/todos
 * Creates a new todo with validation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);

    // 1. Validate Input (Phase 4 Validation Layer)
    const validation = validateCreateTodo(body);
    if (!validation.isValid || !validation.data) {
      return NextResponse.json({
        success: false,
        error: "Validation failed",
        details: validation.errors,
      }, { status: 400 });
    }

    // 2. Create in Data Layer
    const newTodo = await todoService.createTodo(validation.data);

    // 3. Revalidate Next.js cache so UI updates immediately
    revalidatePath("/todos");
    // In production we also revalidate tags: revalidateTag("todos");

    return NextResponse.json({
      success: true,
      data: newTodo,
    }, { status: 201 });

  } catch (error) {
    console.error("POST /api/todos error:", error);
    return NextResponse.json({
      success: false,
      error: "Internal Server Error. Failed to create task.",
    }, { status: 500 });
  }
}   