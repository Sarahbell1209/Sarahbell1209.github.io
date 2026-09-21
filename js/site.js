/* Theme, animation, bilingual content, and same-page view switching. */
/* To edit translations, update languageContent below. */
const root = document.documentElement;
const toggle = document.querySelector('#themeToggle');
const label = document.querySelector('#themeLabel');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) root.dataset.theme = savedTheme;

function syncTheme() {
  const dark = root.dataset.theme === 'dark';
  const zh = root.lang === 'zh-CN';
  label.textContent = zh ? (dark ? '浅色' : '深色') : (dark ? 'Light mode' : 'Dark mode');
  toggle.setAttribute('aria-label', zh ? (dark ? '切换至浅色模式' : '切换至深色模式') : (dark ? 'Switch to light mode' : 'Switch to dark mode'));
  document.querySelector('meta[name="theme-color"]').content = dark ? '#16140f' : '#faf8f5';
}
syncTheme();
toggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('portfolio-theme', root.dataset.theme);
  syncTheme();
});

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const profilePhoto = document.querySelector('.profile-photo');
const photoPlaceholder = document.querySelector('.photo-placeholder');
function showPhotoPlaceholder() {
  if (!profilePhoto || !photoPlaceholder) return;
  profilePhoto.hidden = true;
  photoPlaceholder.hidden = false;
}
if (profilePhoto) {
  profilePhoto.addEventListener('error', showPhotoPlaceholder);
  if (profilePhoto.complete && profilePhoto.naturalWidth === 0) showPhotoPlaceholder();
}
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .08 });
document.querySelectorAll('.fade-in').forEach(el => reduced ? el.classList.add('visible') : observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.sidebar nav a')];
const navObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) links.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
}), { rootMargin: '-20% 0px -65% 0px' });
sections.forEach(section => navObserver.observe(section));

if (matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced) {
  const glow = document.querySelector('#cursorGlow');
  document.addEventListener('mousemove', event => { glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`; glow.style.opacity = '1'; });
  document.addEventListener('mouseleave', () => glow.style.opacity = '0');
}
// Format: [CSS selector, English HTML, Chinese HTML]
const languageContent = [
  ['.band-inner p', 'front end · back end · data & AI · cloud delivery', '前端 · 后端 · 数据与 AI · 云端交付'],
  ['.availability', '<i></i> Open to opportunities', '<i></i> 正在寻找工作机会'],
  ['.role', 'Full-Stack Software Engineer', '全栈软件工程师'],
  ['.affiliation', 'M.S. Software Engineering<br>University of Texas at Arlington', '软件工程硕士<br>德克萨斯大学阿灵顿分校'],
  ['nav a[href="#about"]', 'About', '关于我'], ['nav a[href="#capabilities"]', 'Skills', '技能'],
  ['nav a[href="#now"]', 'Now', '近期关注'], ['nav a[href="#projects"]', 'Projects', '项目'],
  ['nav a[href="#education"]', 'Education', '教育'], ['nav a[href="#resume"]', 'Résumé', '简历'], ['[data-outside-target="thoughts"]', 'Spoken Sharing', '口播分享'], ['[data-outside-target="music"]', 'Music', '音乐'], ['[data-outside-target="model-coser"]', 'Model / Coser', '模特 / Coser'], ['.nav-group-label', 'Beyond engineering', '工程之外'],
  ['[data-contact-email]', 'wjx1209457769@gmail.com', 'wjx1209457769@gmail.com'], ['.contact-location', 'Arlington, Texas', '美国德克萨斯州阿灵顿'],
  ['#about .section-label', 'About', '关于我'],
  ['#about .intro', 'I build software from <em>data to interface</em>, with projects across AI/ML, full-stack applications, and edge inference.', '我从<em>数据到界面</em>构建软件，项目涵盖 AI/机器学习、全栈应用和边缘推理。'],
  ['#about>p:nth-of-type(2)', 'I am pursuing a Master of Software Engineering at the University of Texas at Arlington. Relevant coursework includes Algorithms and Data Structures, Artificial Intelligence, Data Mining, and Software Design.', '我正在德克萨斯大学阿灵顿分校攻读软件工程硕士。相关课程包括算法与数据结构、人工智能、数据挖掘和软件设计。'],
  ['#about>p:nth-of-type(3)', 'My work includes multilingual clinical AI, multimodal video analysis, pedestrian flow counting, offline wildlife detection, and intelligent clothing image classification and retrieval.', '我的项目包括多语言临床 AI、多模态视频分析、行人流量计数、离线野生动物检测，以及智能服装图像分类与检索。'],
  ['#about .interest-tags', '<span>Full-stack products</span><span>Applied AI</span><span>Data pipelines</span><span>Computer vision</span><span>Cloud systems</span>', '<span>全栈产品</span><span>应用型 AI</span><span>数据管道</span><span>计算机视觉</span><span>云端系统</span>'],
  ['#capabilities .section-label', 'Skills', '技能'],
  ['.capability:nth-child(1) .cap-kicker', '01 / Front end', '01 / 前端'], ['.capability:nth-child(1) h2', 'Product interfaces', '产品界面'],
  ['.capability:nth-child(1) p', 'Responsive React experiences, workflow state, reusable components, accessible interactions, and clear presentation of complex data.', '构建响应式 React 体验、复杂工作流状态、可复用组件、无障碍交互，以及清晰的数据呈现。'],
  ['.capability:nth-child(2) .cap-kicker', '02 / Back end', '02 / 后端'], ['.capability:nth-child(2) h2', 'Services & integrations', '服务与系统集成'],
  ['.capability:nth-child(2) p', 'REST APIs, workflow orchestration, relational storage, third-party systems, containerization, and production deployment.', '开发 REST API、工作流编排、关系型存储、第三方系统集成、容器化及生产环境部署。'],
  ['.capability:nth-child(3) .cap-kicker', '03 / Data & AI', '03 / 数据与 AI'], ['.capability:nth-child(3) h2', 'Analysis pipelines', '分析管道'],
  ['.capability:nth-child(3) p', 'Collection, cleaning, transcription, multimodal analysis, validation, performance measurement, and model-powered applications.', '覆盖数据采集、清洗、转录、多模态分析、结果验证、性能评估及模型驱动型应用。'],
  ['#now .section-label', 'Now', '近期关注'], ['.now-head span', '<i></i> September 2026', '<i></i> 2026 年 9 月'], ['.now-head small', 'What I’m focused on', '目前专注方向'],
  ['.now-panel>h2', 'Dependable, data-driven products with clean interfaces and verifiable outputs.', '打造界面清晰、输出可验证、稳定可靠的数据驱动型产品。'],
  ['.now-grid div:nth-child(1) p', 'Multilingual clinical workflow engineering', '多语言临床工作流工程'], ['.now-grid div:nth-child(2) p', 'Evidence validation for multimodal analysis', '多模态分析的证据验证'], ['.now-grid div:nth-child(3) p', 'Cloud deployment and system integration', '云端部署与系统集成'],
  ['#projects .section-label', 'Selected projects', '精选项目'],
  ['#project-eob .project-type', 'Data reconciliation workflow', '数据对账工作流'], ['#project-eob p', 'A reconciliation workflow for comparing insurance responses with internal billing records and surfacing discrepancies that require review.', '用于比较保险响应与内部账单记录，并识别需要人工复核差异的数据对账工作流。'], ['#project-eob .project-layers', '<span><b>Input</b> Insurance responses</span><span><b>Compare</b> Billing records</span><span><b>Output</b> Review queue</span>', '<span><b>输入</b> 保险响应</span><span><b>比对</b> 账单记录</span><span><b>输出</b> 复核队列</span>'], ['#project-eob .project-footer>span:first-child', 'Data validation · Discrepancy detection · Billing workflows', '数据验证 · 差异识别 · 账单工作流'], ['#project-eob .status', 'Project overview', '项目概览'],
  ['.status:not(.complete)', 'Active development', '持续开发中'], ['.status.complete', 'Completed', '已完成'],
  ['#project-eob .status', 'Project overview', '项目概览'],
  ['#resume .section-label', 'Curriculum Vitae', '个人简历'], ['.resume-card strong', 'Jingxuan Wang — Résumé', 'Jingxuan Wang — 个人简历'], ['.resume-card small', 'Education, experience, projects, and technical skills', '教育经历、工作经验、项目成果与技术能力'], ['.resume-card>i', 'View full résumé ↗', '查看完整简历 ↗'],
  ['.skill-group:nth-child(1)>span', 'AI / ML', 'AI / 机器学习'], ['.skill-group:nth-child(1)>p', 'PyTorch, vision-language models, YOLOv8, OpenCV, Whisper, object detection, image classification, edge inference', 'PyTorch、视觉语言模型、YOLOv8、OpenCV、Whisper、目标检测、图像分类、边缘推理'], ['.skill-group:nth-child(2)>span', 'Programming', '编程语言'], ['.skill-group:nth-child(2)>p', 'Python, Java, TypeScript, SQL', 'Python、Java、TypeScript、SQL'], ['.skill-group:nth-child(3)>span', 'Tools', '工具'], ['.skill-group:nth-child(3)>p', 'Raspberry Pi, Docker, Git, AWS, Flask, Django REST, MySQL, React, Vercel', 'Raspberry Pi、Docker、Git、AWS、Flask、Django REST、MySQL、React、Vercel'], ['.skill-group:nth-child(4)>span', 'Languages', '语言'], ['.skill-group:nth-child(4)>p', 'Chinese (Native), English (Professional Working Proficiency)', '中文（母语）、英语（专业工作熟练度）'],
  ['#project-clinical .project-type', 'May 2026 – Present', '2026 年 5 月至今'], ['#project-clinical .project-points', '<li>Developed a multilingual pediatric dental assistant that converts clinician-patient conversations into Gemini-generated SOAP drafts for clinician review and approved-note write-back to Open Dental</li><li>Integrated switchable Google Cloud Speech-to-Text, Deepgram, and Whisper engines with speaker diarization to support English, Chinese, Spanish, and mixed-language transcription</li><li>Connected patient histories, treatment records, and transcripts to citation-grounded clinical Q&amp;A, supporting traceable responses grounded in patient source information</li>', '<li>开发多语言儿童牙科助手，将医患对话转换为 Gemini 生成的 SOAP 草稿，供临床医生审核，并将批准后的病历写回 Open Dental</li><li>集成可切换的 Google Cloud Speech-to-Text、Deepgram 和 Whisper 引擎及说话人分离功能，支持英语、中文、西班牙语和混合语言转录</li><li>将患者病史、治疗记录和转录内容连接到基于引用的临床问答，使回答可追溯至患者源信息</li>'],
  ['#project-creator .project-type', 'Python · Whisper · vision-language models · local inference · Jun 2026 – Present', 'Python · Whisper · 视觉语言模型 · 本地推理 · 2026 年 6 月至今'], ['#project-creator .project-points', '<li>Developed a staged multimodal pipeline that collected, deduplicated, sampled, transcribed, and analyzed 125 public videos using Whisper, vision-language models, and local inference</li><li>Achieved approximately 0.26x real-time factor for local transcription, enabling audio processing substantially faster than its original duration</li><li>Implemented structured schemas, stage checkpoints, and evidence-ID validation to keep synthesized findings traceable to source material</li>', '<li>开发分阶段多模态管道，使用 Whisper、视觉语言模型和本地推理采集、去重、采样、转录并分析 125 个公开视频</li><li>本地转录达到约 0.26 倍实时因子，使音频处理速度显著快于原始时长</li><li>实现结构化模式、阶段检查点和证据 ID 验证，使综合结论可追溯至源材料</li>'],
  ['#project-wildlife .project-type', 'Python · YOLOv8 · OpenCV · Raspberry Pi · Dec 2024 – Mar 2025', 'Python · YOLOv8 · OpenCV · Raspberry Pi · 2024 年 12 月至 2025 年 3 月'], ['#project-wildlife .project-points', '<li>Deployed an offline wildlife detector on Raspberry Pi that achieved approximately 10 FPS and over 80% detection accuracy on resource-constrained hardware</li><li>Implemented local filtering, event logging, and storage to support reviewable detections without continuous cloud connectivity</li>', '<li>在 Raspberry Pi 上部署离线野生动物检测器，在资源受限硬件上达到约 10 FPS 和超过 80% 的检测准确率</li><li>实现本地过滤、事件记录和存储，在无需持续云连接的情况下支持可复核的检测结果</li>'],
  ['#project-pedestrian .project-type', 'Python · YOLOv8 · OpenCV · Raspberry Pi · Mar 2026 – Apr 2026', 'Python · YOLOv8 · OpenCV · Raspberry Pi · 2026 年 3 月至 4 月'], ['#project-pedestrian .project-points', '<li>Developed a Raspberry Pi edge-vision pipeline with YOLOv8 and OpenCV for pedestrian detection and counting from image and video inputs with local on-device analysis</li>', '<li>使用 YOLOv8 和 OpenCV 开发 Raspberry Pi 边缘视觉管道，对图像和视频输入进行行人检测与计数，并在设备本地完成分析</li>'],
  ['#project-clothing .project-type', 'Python · PyTorch · Flask · Mar 2026 – May 2026', 'Python · PyTorch · Flask · 2026 年 3 月至 5 月'], ['#project-clothing .project-points', '<li>Trained a ResNet-50 model on a cleaned 4,000-image subset spanning 10 categories and achieved 77.25% validation accuracy</li><li>Implemented vector similarity search and batch image processing through Flask REST APIs backed by MySQL</li>', '<li>在清洗后的 4,000 张、覆盖 10 个类别的图像子集上训练 ResNet-50 模型，验证准确率达到 77.25%</li><li>通过由 MySQL 支持的 Flask REST API 实现向量相似度搜索和批量图像处理</li>'],
  ['#education .section-label', 'Education', '教育经历'], ['#education .timeline-item:nth-child(1) time', 'Aug 2025 – Dec 2026', '2025 年 8 月至 2026 年 12 月'], ['#education .timeline-item:nth-child(1) h2', 'Master of Software Engineering', '软件工程硕士'], ['#education .timeline-item:nth-child(1) p', 'University of Texas at Arlington, Arlington, TX', '德克萨斯大学阿灵顿分校，美国德克萨斯州阿灵顿'], ['#education .timeline-item:nth-child(1) span', 'Relevant Coursework: Algorithms and Data Structures, Artificial Intelligence, Data Mining, Software Design', '相关课程：算法与数据结构、人工智能、数据挖掘、软件设计'], ['#education .timeline-item:nth-child(2) time', 'Sep 2021 – Jun 2025', '2021 年 9 月至 2025 年 6 月'], ['#education .timeline-item:nth-child(2) h2', 'Bachelor of Engineering in Network Engineering', '网络工程工学学士'], ['#education .timeline-item:nth-child(2) p', 'Beijing Forestry University, Beijing, China', '北京林业大学，中国北京'],
  ['#outside-work .section-label', 'Outside of Work', '工作之余'], ['.outside-intro', 'A small space for the things I make when I step away from engineering—ideas I’m thinking through out loud, and songs I enjoy returning to.', '这里记录一些工程工作之外的创作——用口播整理仍在思考的问题，也用弹唱留下我喜欢的歌曲。'],
  ['.outside-card:nth-child(1) .outside-type', 'Thinking aloud', '口播思考'], ['.outside-card:nth-child(1) h2', 'Spoken reflections', '一些说出来的思考'], ['.outside-card:nth-child(1) p', 'Short-form reflections on questions, experiences, and ideas I’m still working through.', '通过短口播记录问题、经历，以及一些还在逐渐形成中的个人理解。'], ['.outside-card:nth-child(1) small', 'Selected posts will be linked here soon.', '精选内容链接将陆续补充。'],
  ['.outside-card:nth-child(2) .outside-type', 'Music', '音乐'], ['.outside-card:nth-child(2) h2', 'Acoustic covers', '弹唱记录'], ['.outside-card:nth-child(2) p', 'Casual singing and guitar recordings—a different kind of practice, expression, and connection.', '随手记录一些唱歌与吉他弹唱，也是一种不同形式的练习、表达与连接。'], ['.outside-card:nth-child(2) small', 'Selected videos will be linked here soon.', '精选视频链接将陆续补充。'],
  ['.future-note span', 'Next, gradually', '接下来，慢慢更新'], ['.future-note p', 'AI frontiers · research notes · personal interpretations · books worth sharing', 'AI 前沿 · 研究笔记 · 个人理解 · 值得分享的书籍'],
  ['footer>span:last-child', 'Built for GitHub Pages', '基于 GitHub Pages 构建'],
  ['.outside-page .band-inner p', 'thoughts · music · life outside engineering', '思考 · 音乐 · 工程之外的生活'], ['.outside-page .availability', '<i></i> Creating slowly', '<i></i> 慢慢创作中'],
  ['.outside-page .back-link', '← Back to portfolio', '← 返回作品集'], ['.outside-page .identity h1', 'Outside of Work', '工作之余'], ['.outside-page .role', 'Thoughts, music, and things in progress.', '思考、音乐，以及仍在形成中的事物。'], ['.outside-page .affiliation', 'A quieter corner of my site.', '网站里一个更安静的角落。'],
  ['.outside-page nav a[href="#outside-work"]', 'Overview', '概览'], ['.outside-page nav a[href="#thoughts"]', 'Spoken reflections', '口播思考'], ['.outside-page nav a[href="#music"]', 'Acoustic covers', '弹唱记录'],
  ['.outside-page .sidebar-contact a[href="index.html"]', 'Portfolio', '作品集'], ['.outside-page .sidebar-contact a[href^="mailto"]', 'Email', '邮箱'],
  ['.outside-page .outside-hero', 'Ideas I’m thinking through <em>out loud</em>, and songs I enjoy returning to.', '一些正在<em>说出来</em>的思考，以及我愿意反复唱起的歌。'], ['.outside-page .outside-intro', 'This is a small space for the things I make when I step away from engineering. For now, it holds spoken reflections and casual acoustic covers; other interests will grow here gradually.', '这里记录我离开工程工作之后的创作。目前主要是思考类口播和随性的弹唱，其他兴趣也会在这里慢慢生长。'],
  ['#thoughts .section-label', '01 / Thinking aloud', '01 / 口播思考'], ['#thought-card .outside-type', 'Spoken reflections', '口播思考'], ['#thought-card h2', 'Some thoughts are clearer when spoken.', '有些想法，说出来会更清晰。'], ['#thought-card p', 'Short-form reflections on questions, experiences, and ideas I’m still working through.', '通过短口播记录问题、经历，以及一些还在逐渐形成中的个人理解。'], ['#thought-card small', 'Selected posts will be linked here soon.', '精选内容链接将陆续补充。'],
  ['#music .section-label', '02 / Music', '02 / 音乐'], ['#music-card .outside-type', 'Acoustic covers', '弹唱记录'], ['#music-card h2', 'A different kind of practice.', '另一种形式的练习。'], ['#music-card p', 'Casual singing and guitar recordings—a place for expression, rhythm, and connection beyond code.', '随手记录唱歌与吉他弹唱，在代码之外寻找表达、节奏与连接。'], ['#music-card small', 'Selected videos will be linked here soon.', '精选视频链接将陆续补充。'],
  ['.outside-page footer a', 'Back to portfolio ↑', '返回作品集 ↑']
  ,['.outside-view .view-back', '← Back to portfolio', '← 返回作品集'], ['.outside-view .outside-hero', 'Ideas I’m thinking through <em>out loud</em>, and a life shaped by music.', '一些正在<em>说出来</em>的思考，以及被音乐塑造的生活。'], ['.outside-view .outside-intro', 'For now, this space brings together spoken sharing and music. I’ll add selected pieces gradually instead of relying on a social feed.', '目前，这里主要记录口播分享和音乐。我会逐渐整理精选内容，而不是直接依赖社交媒体信息流。'],
  ['.outside-note b', 'A note', '说明'], ['.outside-note p', 'Most current videos live on Douyin, which may not be reliably accessible outside China. Selected work will be republished here in a more accessible format.', '目前的视频主要发布在中国抖音，海外访问可能不稳定。之后会把精选内容用更容易访问的形式重新发布在这里。'],
  ['#thought-card .outside-type', 'Spoken sharing', '口播分享'], ['#thought-card h2', 'Learning by explaining and reflecting.', '在表达与反思中学习。'], ['#thought-card .outside-copy>p', 'Short-form videos for organizing what I learn, sharing books, and putting personal reflections into words.', '通过短视频整理所学、分享书籍，也把个人感悟转化为更清晰的表达。'],
  ['.sharing-tracks span:nth-child(1)', '<b>Reflections</b><small>Now sharing</small>', '<b>感悟分享</b><small>已有内容</small>'], ['.sharing-tracks span:nth-child(2)', '<b>Knowledge</b><small>Planned</small>', '<b>知识分享</b><small>计划中</small>'], ['.sharing-tracks span:nth-child(3)', '<b>Books</b><small>Planned</small>', '<b>图书分享</b><small>计划中</small>'], ['#thought-card .media-slot span', 'Selected reflection video', '精选感悟口播'], ['#thought-card .media-slot small', 'Accessible version coming soon', '易访问版本即将补充'],
  ['#music-card .outside-type', 'Music', '音乐'], ['#music-card h2', 'Collecting sounds, one instrument at a time.', '收藏声音，也不断认识新的乐器。'], ['#music-card .outside-copy>p', 'I record guitar-and-vocal covers, and also enjoy guzheng, piano, and violin. I like collecting and trying different instruments—each one offers a new way to listen and express.', '我会录制吉他弹唱，也喜欢古筝、钢琴和小提琴。我还喜欢收集并尝试不同的乐器——每一种乐器都带来新的聆听与表达方式。'], ['#music-card .instrument-list', '<span>Guitar</span><span>Guzheng</span><span>Piano</span><span>Violin</span><span>More to explore +</span>', '<span>吉他</span><span>古筝</span><span>钢琴</span><span>小提琴</span><span>继续探索 +</span>'], ['#music-card .media-slot span', 'Selected acoustic video', '精选弹唱视频'], ['#music-card .media-slot small', 'Accessible version coming soon', '易访问版本即将补充'],
  ['#model-coser .section-label', '03 / Model & Coser', '03 / 模特与 Coser'], ['.coser-intro h2', 'Character, styling, and visual storytelling.', '角色、造型与视觉叙事。'], ['.coser-intro p', 'A place for selected modeling and cosplay work—exploring how posture, styling, setting, and character can tell a story in a single frame.', '用于展示精选模特与 Cosplay 作品，探索姿态、造型、场景和角色如何在一张照片中完成叙事。'], ['.gallery-slot:nth-child(1) small', 'Add portrait photo', '添加人像照片'], ['.gallery-slot:nth-child(2) small', 'Add cosplay photo', '添加 Cosplay 照片'], ['.gallery-slot:nth-child(3) small', 'Add styling photo', '添加造型照片'], ['.gallery-note', 'Selected photos will be added here. This gallery stays separate from professional engineering work and only appears after opening “Outside of Work.”', '精选照片会陆续添加在这里。该照片区与专业工程内容分开，仅在主动打开“工作之余”后显示。']
];

const langToggle = document.querySelector('#langToggle');
const langLabel = document.querySelector('#langLabel');
function applyLanguage(language) {
  const zh = language === 'zh';
  root.lang = zh ? 'zh-CN' : 'en';
  languageContent.forEach(([selector, en, cn]) => { const element = document.querySelector(selector); if (element) element.innerHTML = zh ? cn : en; });
  langLabel.textContent = zh ? 'EN' : '中文';
  langToggle.setAttribute('aria-label', zh ? 'Switch to English' : '切换至中文');
  const outsidePage = document.body.classList.contains('outside-page');
  document.title = outsidePage ? (zh ? '工作之余 | Jingxuan Wang' : 'Outside of Work | Jingxuan Wang') : (zh ? 'Jingxuan Wang | 全栈软件工程师' : 'Jingxuan Wang | Software Engineer');
  localStorage.setItem('portfolio-language', language);
  syncTheme();
}
applyLanguage(localStorage.getItem('portfolio-language') || 'en');
langToggle.addEventListener('click', () => applyLanguage(root.lang === 'zh-CN' ? 'en' : 'zh'));

const outsideLinks = [...document.querySelectorAll('[data-outside-target]')];
const outsideView = document.querySelector('#outsideView');
const viewBack = document.querySelector('#viewBack');
const homeContent = [...document.querySelectorAll('main > .section, main > footer')];
let portfolioScroll = 0;
function showOutsideView(targetId = 'outside-work', activeLink = null) {
  portfolioScroll = window.scrollY;
  homeContent.forEach(element => element.hidden = true);
  outsideView.hidden = false;
  links.forEach(link => link.classList.toggle('active', link === activeLink));
  history.replaceState(null, '', `#${targetId}`);
  requestAnimationFrame(() => document.querySelector(`#${targetId}`)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' }));
}
function showPortfolio(targetHash = '#about') {
  outsideView.hidden = true;
  homeContent.forEach(element => element.hidden = false);
  history.replaceState(null, '', targetHash);
  if (targetHash === '#about') window.scrollTo({ top: portfolioScroll, behavior: reduced ? 'auto' : 'smooth' });
}
outsideLinks.forEach(link => link.addEventListener('click', event => { event.preventDefault(); showOutsideView(link.dataset.outsideTarget, link); }));
viewBack?.addEventListener('click', () => showPortfolio('#about'));
links.filter(link => !outsideLinks.includes(link)).forEach(link => link.addEventListener('click', () => { if (!outsideView.hidden) showPortfolio(link.hash); }));
const initialOutsideLink = outsideLinks.find(link => link.hash === location.hash);
if (initialOutsideLink || location.hash === '#outside-work') showOutsideView(initialOutsideLink?.dataset.outsideTarget || 'outside-work', initialOutsideLink || null);
document.querySelector('#year').textContent = new Date().getFullYear();
