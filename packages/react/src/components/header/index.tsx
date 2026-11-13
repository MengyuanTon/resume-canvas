import type { FC } from "react";

import { useEditor } from "../../hooks/use-editor";
import { Left } from "./components/left";
import { Right } from "./components/right";
import styles from "./index.m.scss";

export const Header: FC = () => {
  const { editor } = useEditor();

  return (
    <div className={styles.container}>
      <div className={styles.brand}>简历画布</div>
      <Left editor={editor} />
      <Right editor={editor} />
    </div>
  );
};
