import { EXAMPLE } from "../utils/storage";

export type TemplateConfig = {
  name: string;
  image: string;
  source?: string;
};

export const TEMPLATE_CONFIG: TemplateConfig[] = [
  { name: "科研简历", image: "./research-template/preview.png" },
  { name: "黑白简约", image: "./research-template/ink.png", source: "./research-template/ink.json" },
  { name: "松绿双栏", image: "./research-template/pine.png", source: "./research-template/pine.json" },
  { name: "暖橙作品集", image: "./research-template/amber.png", source: "./research-template/amber.json" },
];

export const loadTemplate = async (item: TemplateConfig) => {
  if (!item.source) return EXAMPLE;
  try {
    const response = await fetch(item.source);
    return response.ok ? await response.json() : null;
  } catch {
    return null;
  }
};
