import { Storage } from "sketching-utils";
import template from "./research-template.json";
import type { DeltaSetLike } from "sketching-delta";

export type LocalStorageData = {
  x: number;
  y: number;
  width: number;
  height: number;
  deltaSetLike: DeltaSetLike;
};

const LEGACY_KEY = "resume-canvas:v1";
const ACTIVE_KEY = "resume-canvas:active-template";
export const DEFAULT_TEMPLATE = "research";

let activeTemplate: string | undefined;

export const getActiveTemplate = () =>
  activeTemplate ?? (activeTemplate = Storage.local.get<string>(ACTIVE_KEY) || DEFAULT_TEMPLATE);

const draftKey = (id: string) => `resume-canvas:draft:${id}`;

export const getDraft = (id = getActiveTemplate()) =>
  Storage.local.get<LocalStorageData>(draftKey(id)) ||
  (id === DEFAULT_TEMPLATE ? Storage.local.get<LocalStorageData>(LEGACY_KEY) : null);

export const saveDraft = (data: LocalStorageData, id = getActiveTemplate()) =>
  Storage.local.set(draftKey(id), data);

export const activateTemplate = (id: string) => {
  Storage.local.set(ACTIVE_KEY, id);
  activeTemplate = id;
};
export const EXAMPLE: LocalStorageData = template;
