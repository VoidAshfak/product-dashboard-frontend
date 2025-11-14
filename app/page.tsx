"use client";
import { useAppSelector } from "@/store/redux-hooks";

export default function Home() {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <div>
      <main>
        <p>{JSON.stringify(user)}</p>
      </main>
    </div>
  );
}
