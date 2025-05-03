"use client";

import { useSession } from "next-auth/react";

export default function TestSession() {
  const { data: session, status } = useSession();

  return (
    <div>
      <p>Status: {status}</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
