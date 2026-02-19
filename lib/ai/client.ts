import Anthropic from "@anthropic-ai/sdk";

let _anthropic: Anthropic | null = null;

function getClient(): Anthropic {
  if (!_anthropic) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      console.error("[QanoonAI] ANTHROPIC_API_KEY is not set — AI features will fail");
      throw new Error("ANTHROPIC_API_KEY is not configured");
    }
    _anthropic = new Anthropic({ apiKey });
  }
  return _anthropic;
}

// Use a proxy so every access to `anthropic.messages.create(...)` etc.
// goes through getClient(), ensuring env vars are loaded before first use.
export const anthropic: Anthropic = new Proxy({} as Anthropic, {
  get(_target, prop) {
    return (getClient() as any)[prop];
  },
});
