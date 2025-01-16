import { initializeDatabase } from "./app/(auth)/db/schema";

export async function register(){
    await initializeDatabase()
}