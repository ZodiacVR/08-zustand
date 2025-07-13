import { nextServer } from './api';
import type { AuthData, UpdateUserPayload, User } from '../../types/user';
import type { Note, NewNotePayload, NotesResponse, FetchNotesParams } from '../../types/note';



export async function register(data: AuthData): Promise<User> {
  const response = await nextServer.post('/auth/register', data);
  return response.data;
}

export async function login(data: AuthData): Promise<User> {
  const response = await nextServer.post('/auth/login', data);
  return response.data;
}

export async function logout(): Promise<void> {
  await nextServer.post('/auth/logout'); 
}

export async function fetchProfile(): Promise<User> {
  const response = await nextServer.get('/users/me');
  return response.data;
}

export async function fetchNotes(params?: FetchNotesParams): Promise<NotesResponse> {
  const response = await nextServer.get('/notes', { params });
  return response.data;
}

export async function createNote(note: NewNotePayload): Promise<Note> {
  const response = await nextServer.post('/notes', note);
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await nextServer.delete(`/notes/${id}`);
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get(`/notes/${id}`);
  return response.data;
}
export const checkSession = async (): Promise<boolean> => {
  try {
    const res = await nextServer.get<User | null>("/auth/session");
    return !!res.data;
  } catch {
    return false;
  }
};

export const getMe = async (): Promise<User | null> => {
  try {
    const res = await nextServer.get<User>("/users/me");
    return res.data;
  } catch {
    return null;
  }
};

export const patchUser = async (data: UpdateUserPayload) => {
  const res = await nextServer.patch<User>("/users/me", data);
  return res.data;
};