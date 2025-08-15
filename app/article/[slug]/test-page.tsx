import { notFound } from "next/navigation";

export const revalidate = 30;

export default async function TestPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <h1>Test Page</h1>
      <p>Slug: {params.slug}</p>
    </div>
  );
}
