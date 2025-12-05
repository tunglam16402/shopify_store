/* eslint-disable @typescript-eslint/no-explicit-any */
export async function fetchReviews(payload: any) {
  const res = await fetch("/api/reviews/query", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Failed to load reviews");

  return res.json();
}
