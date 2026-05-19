"use client";

import { useFormStatus } from "react-dom";
import { updateNote } from "./actions";

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="min-h-[44px] rounded-md border border-neutral-700 bg-neutral-800 px-3 py-2 text-xs text-neutral-200 transition hover:bg-neutral-700 disabled:opacity-60"
    >
      {pending ? "שומר…" : "שמירה"}
    </button>
  );
}

// Explicit-save note editor (not save-on-blur). Submits to the `updateNote`
// Server Action, which re-checks auth and writes server-side only.
export default function NoteCell({
  id,
  note,
}: {
  id: string;
  note: string | null;
}) {
  return (
    <form action={updateNote} className="flex flex-col gap-2">
      <input type="hidden" name="id" value={id} />
      <textarea
        name="note"
        defaultValue={note ?? ""}
        rows={2}
        placeholder="הערה פנימית…"
        className="w-full min-w-[12rem] resize-y rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1.5 text-sm text-neutral-100 outline-none placeholder:text-neutral-600 focus:border-neutral-500"
      />
      <div className="flex justify-end">
        <SaveButton />
      </div>
    </form>
  );
}
