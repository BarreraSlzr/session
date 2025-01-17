import { initializeDatabase } from "./app/(auth)/lib/db/schema";

export async function register(){
    await initializeDatabase()
}