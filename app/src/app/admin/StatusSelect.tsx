"use client";

import { useRef } from "react";
import { updateStatus } from "./actions";

const LABELS: Record<string, string> = {
  new: "חדש",
  in_progress: "בטיפול",
  closed: "נסגר",
};

export default function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const current = LABELS[status] ? status : "new";

  return (
    <form ref={formRef} action={updateStatus} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={current}
        onChange={() => formRef.current?.requestSubmit()}
        className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-sm outline-none focus:border-neutral-500"
      >
        <option value="new">חדש</option>
        <option value="in_progress">בטיפול</option>
        <option value="closed">נסגר</option>
      </select>
    </form>
  );
}
