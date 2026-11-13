import { Message } from "@arco-design/web-react";
import type { Editor } from "sketching-core";
import { Range } from "sketching-core";
import { DeltaSet } from "sketching-delta";
import { isString, Storage, TSON } from "sketching-utils";

import { Background } from "../../../modules/background";
import type { LocalStorageData } from "../../../utils/storage";
import { STORAGE_KEY } from "../../../utils/storage";

const id = "__sketching-core_input__";

export const importJSON = async (editor: Editor) => {
  let input = document.getElementById(id) as HTMLInputElement;
  if (!input) {
    input = document.createElement("input");
    input.id = id;
    input.type = "file";
    input.accept = ".json";
    input.style.display = "none";
    input.onchange = e => {
      const files = (e.target as HTMLInputElement).files;
      if (files && files[0]) {
        const file = files[0];
        const reader = new FileReader();
        reader.onload = e => {
          try {
            const str = e.target && e.target.result;
            const json = isString(str) && TSON.parse<LocalStorageData>(str);
            if (
              json && json.deltaSetLike && json.deltaSetLike.ROOT?.key === "entry" &&
              [json.x, json.y, json.width, json.height].every(Number.isFinite) &&
              json.width > 0 && json.height > 0 && json.width <= 4000 && json.height <= 6000
            ) {
              const deltaSetLike = json.deltaSetLike;
              const deltaSet = new DeltaSet(deltaSetLike);
              Background.setRange(Range.fromRect(json.x, json.y, json.width, json.height));
              editor.state.setContent(deltaSet);
              Background.render();
              Storage.local.set(STORAGE_KEY, json);
              Message.success("已导入并保存到此浏览器");
            } else {
              Message.error("导入失败，请检查文件");
            }
          } catch (error) {
            console.log(error);
            Message.error("导入失败，请检查文件格式");
          }
        };
        reader.readAsText(file);
      }
      document.body.appendChild(input);
    };
  }
  input.value = "";
  input.click();
};
