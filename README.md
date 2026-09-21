# Jingxuan Wang — Personal Portfolio

这是一个无需构建工具的静态个人网站，可直接通过 GitHub Pages 发布。主页支持中英文、深浅主题，以及“工作之余”的同页内容切换。

## 仓库结构

```text
.
├── index.html                         # 页面结构和英文基础内容
├── css/
│   └── site.css                       # 全部视觉样式和响应式布局
├── js/
│   └── site.js                        # 交互、主题、语言和双语文案
├── assets/
│   ├── documents/
│   │   └── Jingxuan_Wang_Resume.pdf   # 网站下载的公开简历
│   ├── images/                        # 以后放照片、项目图、封面
│   └── media/                         # 以后放压缩后的视频或音频
└── README.md                          # 本维护说明
```

## 我想修改……应该去哪里？

| 要修改的内容 | 文件 | 搜索关键词 |
|---|---|---|
| 姓名、学校、邮箱、GitHub、LinkedIn | `index.html` | `Jingxuan Wang`、`sidebar-contact` |
| 左侧个人照片 | `assets/images/profile-photo.jpg` | 放入同名 JPG 即可自动显示 |
| About 个人介绍 | `index.html` | `id="about"` |
| AI/ML、编程语言、工具和语言能力 | `index.html` | `id="capabilities"` |
| 目前关注的方向 | `index.html` | `id="now"` |
| 项目名称、介绍、指标、技术栈 | `index.html` | `id="projects"` |
| 教育经历与课程 | `index.html` | `id="education"` |
| 工作之余、口播、弹唱、Cosplay | `index.html` | `id="outsideView"` |
| 替换公开简历 | `assets/documents/Jingxuan_Wang_Resume.pdf` | 用同名 PDF 覆盖即可 |
| 中文翻译 | `js/site.js` | `languageContent` |
| 中英文切换逻辑 | `js/site.js` | `applyLanguage` |
| 深浅主题逻辑 | `js/site.js` | `syncTheme` |
| “工作之余”同页切换 | `js/site.js` | `showOutsideView` |
| 颜色与字体 | `css/site.css` | 文件顶部的 `:root` |
| 桌面侧栏和主栏宽度 | `css/site.css` | `.sidebar`、`main` |
| 项目卡片样式 | `css/site.css` | `.project` |
| 工作之余卡片样式 | `css/site.css` | `.outside-` |
| 手机布局 | `css/site.css` | `@media` |

## 常见修改

### 更新英文内容

在 `index.html` 中找到对应的 `<section id="...">` 并修改文字。不要修改现有 `id`、`class` 和 `data-*` 属性，否则导航、样式或语言切换可能失效。

### 同步中文翻译

在 `js/site.js` 中找到 `languageContent`。每一项结构为：

```js
['CSS 选择器', 'English content', '中文内容']
```

修改 `index.html` 的英文后，也要更新这里对应的英文和中文内容。

### 添加一个新项目

1. 在 `index.html` 的 `id="projects"` 区域复制一个完整的 `<article class="project">`。
2. 修改项目名称、描述、指标和技术栈。
3. 在 `css/site.css` 中添加新缩略图样式，或将截图放进 `assets/images/`。
4. 在 `js/site.js` 的 `languageContent` 中加入新项目的中文翻译。

### 添加视频或社交内容

- 封面图片放进 `assets/images/`。
- 自托管视频放进 `assets/media/`，发布前建议压缩，并提供英文字幕。
- 不建议只依赖抖音嵌入；海外访问可能受地区、登录或网络限制。
- 模特与 Cosplay 照片放在“工作之余”的 `Model & Coser` 区域，不与专业项目混排。

### 添加左侧个人照片

将照片裁剪为接近竖版人像比例，命名为：

```text
assets/images/profile-photo.jpg
```

页面会自动替换当前照片占位区。建议使用清晰、背景简洁、适合公开展示的照片。

### 替换简历

把新文件命名为 `Jingxuan_Wang_Resume.pdf`，覆盖：

```text
assets/documents/Jingxuan_Wang_Resume.pdf
```

这样不需要修改 HTML 链接。

## 本地预览

在仓库根目录运行：

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:8765/
```

## 发布前检查

- 英文内容和中文翻译是否同步。
- 简历链接是否能打开。
- 邮箱、GitHub、LinkedIn 是否正确。
- 手机宽度下是否正常显示。
- 视频和图片文件是否经过压缩。
- 不要提交私人简历、证件、电话号码或不准备公开的素材。
