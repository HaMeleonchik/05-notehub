import axios from "axios";
import type { NewNote, Note } from "../types/note";

interface NoteHttpResponse{
    notes: Note[], 
    totalPages: number,
}
const url = "https://notehub-public.goit.study/api/notes"
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;
export async function fetchNotes(searchQuery: string, page: number): Promise<{notes: Note[], totalPages:number}> {
    const response = await axios.get<NoteHttpResponse>(url, {
        params: {
            ...(searchQuery.trim() && { search: searchQuery.trim() }),
            page,
            perPage: 12,
        },
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    }
    )
    return {
        notes: response.data.notes,
        totalPages:response.data.totalPages
    }
}




export async function createNote(taskData: NewNote) {
    const response = await axios.post<Note>(url, taskData, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    }
    )

    return response.data

}


export async function deleteNote(taskId: number) {
const response = await axios.delete<Note>(`${url}/${taskId}`, {
        headers: {
            Authorization: `Bearer ${myKey}`,
        }
    }
    )
    return response.data
}
