# DeepSplit Audio

![Screenshot](docs/web.png)

## 项目介绍

DeepSplit Audio 是一个基于 AI 的音频分离 Web 应用程序，允许用户将音频轨道分离为人声、鼓、贝斯和其他乐器等单独组件。它使用现代 Web 技术构建，提供了一个用户友好的界面，使用最先进的模型进行高质量音频分离。

## 功能特性

- **AI 驱动的分离**：利用先进的 Demucs 模型进行高质量音频分离
- **多种模型**：支持各种模型，具有不同的速度和质量权衡
- **两种分离模式**：人声+背景音乐分离或完整乐器分离
- **响应式设计**：在桌面和移动设备上无缝工作
- **多语言支持**：支持英语和中文
- **实时进度**：显示处理进度，允许关闭浏览器

## 技术栈

- React
- TypeScript
- ElysiaJS
- Bun
- Vite
- Tailwind CSS
- Demucs
- SQLite
- Docker

## 快速开始

### 前置条件

- Bun (v1.0+)
- Node.js (v18+，如果不使用 Bun)
- Docker (用于容器化部署)

### 安装

```bash
# 克隆仓库
git clone https://github.com/qishiyou/DeepSplit-Audio.git
cd DeepSplit-Audio

# 安装依赖
bun install
```

### 运行应用

```bash
# 启动开发服务器
bun dev

# 打开浏览器并导航到
# http://localhost:3000
```

## 使用说明

### 步骤 1: 上传音频文件

将音频文件拖放到上传区域或点击浏览文件。支持的格式包括 MP3、WAV、FLAC 等。

### 步骤 2: 选择分离模式

- **人声 + 背景音乐**：将音频分离为两个轨道 - 人声和器乐
- **完整乐器分离**：将音频分离为单独的乐器（鼓、贝斯、其他）

### 步骤 3: 选择模型和质量

根据您的需求选择合适的模型：

- **htdemucs_6s**：非常快，质量较低
- **htdemucs**：快速，质量平衡
- **htdemucs_ft**：高质量，较慢
- **mdx_extra_q**：超高质量，最慢

### 步骤 4: 开始分离

点击 "分离" 按钮开始分离过程。处理时间取决于音频文件的长度和选择的模型。

### 步骤 5: 下载结果

处理完成后，您可以收听并下载分离后的轨道。

## 部署

### Docker Compose (推荐)

创建一个 `.env` 文件，包含以下变量：

```
SECRET=your-secret-key
DEMUCS_API=http://your-demucs-api-url
DEMUCS_API_KEY=your-demucs-api-key (可选)
```

然后运行：

```bash
docker compose up -d --build
```

### 手动部署

#### 1. 部署 Demucs 服务器

```bash
cd demucs
python server.py
```

#### 2. 构建 Web 应用

```bash
# 构建客户端
bun run build:client

# 构建服务器
bun run build:server

# 启动服务器
bun preview
```

## 开发

### 目录结构

```
├── src/
│   ├── components/       # React 组件
│   ├── db/              # 数据库配置和 schema
│   ├── html/            # HTML 页面和模板
│   ├── i18n/            # 国际化文件
│   ├── lib/             # 工具函数
│   ├── routes/          # API 路由
│   └── main.ts          # 应用入口点
├── demucs/              # Demucs 音频分离服务器
├── public/              # 静态资源
└── scripts/             # 构建和部署脚本
```

### 开发命令

```bash
# 启动开发服务器
bun dev

# 类型检查
bun run typecheck

# 代码检查
bun run lint

# 格式化代码
bun run format

# 构建生产版本
bun run build
```

## 贡献

欢迎贡献！请按照以下步骤操作：

1. Fork 仓库
2. 创建一个新分支 (`git checkout -b feature/your-feature`)
3. 进行更改
4. 测试您的更改
5. 提交更改 (`git commit -m 'Add some feature'`)
6. 推送到分支 (`git push origin feature/your-feature`)
7. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证。有关更多信息，请参阅 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或反馈，请在 GitHub 上打开 issue 或联系项目维护者。
