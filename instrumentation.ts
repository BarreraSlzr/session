import { initializeDatabase } from "./lib/db/schema";

export async function register(){
    await initializeDatabase()
}