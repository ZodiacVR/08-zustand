import { create } from "zustand";
import { persist } from "zustand/middleware";
import { NoteTag } from "@/types/note";

const initialDraft = {
    title: '',
    content: '',
    tag: 'Todo' as NoteTag,
};
interface NoteDraft {
    title: string;
    content: string;
    tag: NoteTag;
}
interface NoteStore {
    draft: NoteDraft;
    setDraft: (draft: Partial<NoteDraft>) => void;
    clearDraft: () => void;
}
export const useNoteStore = create<NoteStore>()(
    persist(
        (set) => ({
            draft: initialDraft,
            setDraft: (partial) => set((state) => ({
                draft:{...state.draft, ...partial},
            })),
            clearDraft: () => set({draft: initialDraft}),
        }),
        {
            name: "note-draft-storage",
            partialize: (state) => ({ draft: state.draft }),
        }
      )
  )