import { Message, Modal } from "@arco-design/web-react";
import type { FC } from "react";
import type { Editor } from "sketching-core";
import { Range } from "sketching-core";
import { DeltaSet } from "sketching-delta";
import { Storage } from "sketching-utils";

import { Background } from "../../../../modules/background";
import type { TemplateConfig } from "../../../../modules/template";
import { loadTemplate, TEMPLATE_CONFIG } from "../../../../modules/template";
import type { LocalStorageData } from "../../../../utils/storage";
import { STORAGE_KEY } from "../../../../utils/storage";
import styles from "./index.m.scss";

export const Template: FC<{
  editor: Editor;
}> = ({ editor }) => {
  const onLoadTemplate = (item: TemplateConfig) => {
    Modal.confirm({
      title: "切换简历模板",
      simple: true,
      content: <div className={styles.modalContent}>加载「{item.name}」会替换当前画布。需要保留当前简历时，请先导出 JSON。</div>,
      onConfirm: async () => {
        const res: LocalStorageData | null = await loadTemplate(item);
        if (!res) return Message.error("模板加载失败");
        Background.setRange(Range.fromRect(res.x, res.y, res.width, res.height));
        const deltaSetLike = res.deltaSetLike;
        const deltaSet = new DeltaSet(deltaSetLike);
        editor.canvas.setOffset(0, 0);
        editor.state.setContent(deltaSet);
        Storage.local.set(STORAGE_KEY, res);
        Background.render();
      },
    });
  };

  return (
    <div className={styles.container}>
      {TEMPLATE_CONFIG.map(item => (
        <button className={styles.item} type="button" key={item.name} onClick={() => onLoadTemplate(item)}>
          <img src={item.image} alt="" />
          <span>{item.name}</span>
        </button>
      ))}
    </div>
  );
};
