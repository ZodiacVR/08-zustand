import { fetchServerNoteById } from "@/lib/api/serverApi";
import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import NotePreviewModal from "./NotePreview.client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreviewModalPage({ params }: PageProps) {
  const { id } = await params;
  if (!id || typeof id !== "string") {
    throw new Error("Invalid note ID");
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchServerNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreviewModal id={id} />
    </HydrationBoundary>
  );
}