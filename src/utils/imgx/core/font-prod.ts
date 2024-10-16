import type { Font } from "satori";

const file = async (source: string, name: string, style?: Font["style"], weight?: Font["weight"]) => ({
  data: (await import(source)).default,
  name,
  style,
  weight,
});

export const load = async () =>
  await Promise.all(
    ([300, 400, 500, 600, 700] as const).map((weight) =>
      file(`./../raw/source-code-pro-${weight}.mjs`, "source-code-pro", "normal", weight)
    )
  );
