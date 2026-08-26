"use server"

import { revalidatePath } from "next/cache";
import { todos } from "../db.js"

export async function addTodo(formdata:FormData){
    // Get the string from the form
   // "If it's null, just use an empty string"
    const task = formdata.get("todoText")?.toString() || "";
    
    // 3. Push it as an object with an ID and the text
    todos.push({ 
        id: Math.random(), // just generating a random ID for practice
        text: task 
    });
    
    // Refresh the page
    revalidatePath("/todo");
}