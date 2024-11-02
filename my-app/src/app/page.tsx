// app/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/alarm");
  }, [router]);

  return <div>Loading...</div>; // 遷移前に表示される内容
}
