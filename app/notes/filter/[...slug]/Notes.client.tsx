"use client";

import React, { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import type { FetchNotesResponse } from "@/lib/api";

import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import css from "./NotesPage.module.css";
import { useDebounce } from "use-debounce";
import Link from "next/link";

const PER_PAGE = Number(process.env.NEXT_PUBLIC_NOTES_PER_PAGE);
if (!PER_PAGE || Number.isNaN(PER_PAGE)) {
  throw new Error("Invalid NEXT_PUBLIC_NOTES_PER_PAGE, defaulting to 12");
}
interface NotesClientProps {
  initialData: FetchNotesResponse;
  tag: string;
}

const NotesClient = ({ tag, initialData }: NotesClientProps) => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", debouncedSearchTerm, page, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: PER_PAGE,
        search: debouncedSearchTerm,
        tag: tag?.toLowerCase() === "all" || !tag?.trim() ? undefined : tag,
      }),
    staleTime: 1000 * 60 * 5,
    placeholderData: keepPreviousData,
    initialData:
      page === 1 && debouncedSearchTerm === "" ? initialData : undefined,
  });

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const totalPages = data?.totalPages || 1;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchTerm} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={(selectedPage: number) => setPage(selectedPage)}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && (
        <div className={css.errorBox}>
          <p>Something went wrong. Please try again.</p>
          <pre>{(error as Error).message}</pre>
        </div>
      )}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {data && data.notes.length === 0 && (
        <p className={css.empty}>No notes found. Try adjusting your search.</p>
      )}
    </div>
  );
};

export default NotesClient;