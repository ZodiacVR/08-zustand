import {
    dehydrate,
    HydrationBoundary,
    QueryClient,
  } from "@tanstack/react-query";
  import { fetchNoteById } from "@/lib/api";
  import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";
  import { Metadata } from "next";
  
  interface NoteDetailsPageProps {
    params: Promise<{ id: string }>;
  }
  export async function generateMetadata({
    params,
  }: NoteDetailsPageProps): Promise<Metadata> {
    const { id } = await params;
    const note = await fetchNoteById(Number(id));
    const description =
      note.content.length > 100
        ? note.content.slice(0, 100) + "..."
        : note.content;
  
    return {
      title: `Note: ${note.title}`,
      description,
      openGraph: {
        title: `Note: ${note.title}`,
        description,
        url: `https://08-zustand-git-main-pavlomarkovskyis-projects.vercel.app/notes/${note.id}`,
        images: [
          {
            url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          },
        ],
      },
    };
  }
  
  export default async function NoteDetailsPage({
    params,
  }: NoteDetailsPageProps) {
    const { id: idStr } = await params;
    const id = Number(idStr);
    const queryClient = new QueryClient();
  
    await queryClient.prefetchQuery({
      queryKey: ["note", id],
      queryFn: () => fetchNoteById(id),
    });
  
    return (
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient id={id} />
      </HydrationBoundary>
    );
  }