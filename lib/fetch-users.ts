import { User } from "@/types/user";

const API_URL = "https://randomuser.me/api/";
const SEED = "abc";

export async function fetchUsers(quantity = 100, page = 1): Promise<User[]> {
    const url = `${API_URL}?results=${quantity}&page=${page}&seed=${SEED}`;
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }
    const data = await res.json();
    return data.results;
}