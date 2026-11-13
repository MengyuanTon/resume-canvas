import template from "./research-template.json";
import type { DeltaSetLike } from "sketching-delta";

export type LocalStorageData = {
  x: number;
  y: number;
  width: number;
  height: number;
  deltaSetLike: DeltaSetLike;
};

export const STORAGE_KEY = "resume-canvas:v1";
export const EXAMPLE: LocalStorageData = template;
