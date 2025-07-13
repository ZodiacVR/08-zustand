import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
import { FetchNotesParams, Note, NotesResponse } from "@/types/note";


const getCookieHeader = async (): Promise<string> => {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(({ name, value }) => `${name}=${value}`)
    .join("; ");
};

export const checkSession = async () => {
  const cookieHeader = await getCookieHeader();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieHeader = await getCookieHeader();
  const { data } = await nextServer.get("/users/me", {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return data;
};

export const fetchServerNotes = async (
  params?: FetchNotesParams
): Promise<NotesResponse> => {
  const cookieHeader = await getCookieHeader();
  const res = await nextServer.get("/notes", {
    params,
    headers: {
      Cookie: cookieHeader,
    },
  });
  return res.data;
};

export const fetchServerNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getCookieHeader();
  const res = await nextServer.get(`/notes/${id}`, {
    headers: {
      Cookie: cookieHeader,
    },
  });
  return res.data;
};