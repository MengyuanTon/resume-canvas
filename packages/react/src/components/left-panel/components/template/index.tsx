import { Message } from "@arco-design/web-react";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import type { Editor } from "sketching-core";
import { Range } from "sketching-core";
import { DeltaSet } from "sketching-delta";

import { Background } from "../../../../modules/background";
import type { TemplateConfig } from "../../../../modules/template";
import { loadTemplate, TEMPLATE_CONFIG } from "../../../../modules/template";
import type { LocalStorageData } from "../../../../utils/storage";
import { activateTemplate, getActiveTemplate, getDraft, saveDraft } from "../../../../utils/storage";
import styles from "./index.m.scss";

export const Template: FC<{
  editor: Editor;
}> = ({ editor }) => {
  const [active, setActive] = useState(getActiveTemplate);
  const request = useRef(0);
  useEffect(() => () => { request.current++; }, []);

  const onLoadTemplate = async (item: TemplateConfig) => {
    const attempt = ++request.current;
    if (item.id === getActiveTemplate()) return;
    try {
      const draft = getDraft(item.id);
      const data: LocalStorageData | null = draft || await loadTemplate(item);
      if (attempt !== request.current) return;
      if (!data) {
        Message.error("模板加载失败");
        return;
      }
      const deltaSet = new DeltaSet(data.deltaSetLike);
      saveDraft({ ...Background.rect, deltaSetLike: editor.deltaSet.getDeltas() });
      if (!draft) saveDraft(data, item.id);
      activateTemplate(item.id);
      Background.setRange(Range.fromRect(data.x, data.y, data.width, data.height));
      editor.canvas.setOffset(0, 0);
      editor.state.setContent(deltaSet);
      setActive(item.id);
    } catch {
      if (attempt === request.current) Message.error("切换模板失败，请检查浏览器存储空间");
    }
  };

  return (
    <div className={styles.container}>
      {TEMPLATE_CONFIG.map(item => (
        <button className={styles.item} type="button" key={item.id} aria-pressed={active === item.id} onClick={() => onLoadTemplate(item)}>
          <img src={item.image} alt="" />
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
};
