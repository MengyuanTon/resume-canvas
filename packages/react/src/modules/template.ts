import { EXAMPLE } from "../utils/storage";

export type TemplateConfig = {
  name: string;
  image: string;
  template: string;
};

export const TEMPLATE_CONFIG: TemplateConfig[] = [
  {
    name: "科研简历",
    image: "./research-template/preview.png",
    template: "research-resume",
  },
];

export const loadTemplate = async (id: string) => id === "research-resume" ? EXAMPLE : null;
