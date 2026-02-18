import { VoyageAIClient } from "voyageai";

let client: VoyageAIClient | null = null;

function getClient(): VoyageAIClient | null {
  if (!process.env.VOYAGE_API_KEY) return null;
  if (!client) {
    client = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY });
  }
  return client;
}

export async function generateEmbedding(
  text: string
): Promise<number[] | null> {
  const c = getClient();
  if (!c) return null;

  const result = await c.embed({
    input: [text],
    model: "voyage-law-2",
  });

  return result.data?.[0]?.embedding ?? null;
}

export async function generateEmbeddings(
  texts: string[]
): Promise<(number[] | null)[]> {
  const c = getClient();
  if (!c) return texts.map(() => null);

  const result = await c.embed({
    input: texts,
    model: "voyage-law-2",
  });

  return (
    result.data?.map((d) => d.embedding ?? null) ?? texts.map(() => null)
  );
}
