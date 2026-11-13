# 简历画布

在浏览器的 Canvas 上编辑简历。科研模板使用蓝色单栏排版，支持自由移动文字、图片和形状。

[在线使用](https://mengyuanton.github.io/resume-canvas/)

- 单击选中对象，拖动可移动或调整尺寸；双击文字打开富文本编辑。
- 编辑后自动保存到当前浏览器，也可以点击「保存到浏览器」。
- 「下载 PDF」直接下载当前画布。PDF 保留排版与链接，正文为图像。
- 「导出 → JSON」保存可继续编辑的备份，「导入本地 JSON」可以在另一个浏览器恢复。
- 首次访问显示示例简历。导入的文件由浏览器在本地读取，个人简历内容不随网站发布。清理浏览器数据前可先导出 JSON 备份。

## 本地运行

需要 Node.js 22 和 pnpm 8.11.0。

```sh
pnpm install --frozen-lockfile --registry=https://registry.npmjs.org/
pnpm dev:react
```

运行 `pnpm build:react` 后，静态网站位于 `packages/react/build`。

## 来源与许可

由 [MengyuanTon](https://github.com/MengyuanTon) 维护，基于 [WindRunnerMax/CanvasEditor](https://github.com/WindRunnerMax/CanvasEditor) 改版。新增科研简历模板、调整编辑界面及保存与下载流程。原项目与改版采用 MIT，原版权声明保留于 [LICENSE](./LICENSE)。PDFKit 和 blob-stream 的许可随站点分发。
