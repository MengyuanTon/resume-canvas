import { EXAMPLE } from "../utils/storage";

export type TemplateConfig = {
  id: string;
  name: string;
  image: string;
  source?: string;
};

export const TEMPLATE_CONFIG: TemplateConfig[] = [
  { id: "research", name: "科研简历", image: "./research-template/preview.png" },
  { id: "ink", name: "黑白简约", image: "./research-template/ink.png", source: "./research-template/ink.json" },
  { id: "pine", name: "松绿双栏", image: "./research-template/pine.png", source: "./research-template/pine.json" },
  { id: "amber", name: "暖橙作品集", image: "./research-template/amber.png", source: "./research-template/amber.json" },
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
