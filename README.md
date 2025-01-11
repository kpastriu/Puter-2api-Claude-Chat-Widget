 # Puter 2api Claude Chat Widget

一个基于 Flask 的聊天应用，提供了一个可嵌入的聊天组件，集成了Puter 2api Claude AI 接口。

## 功能特点

- 🤖 集成 Claude AI 接口
- 💬 可嵌入的聊天组件
- 🎨 美观的用户界面
- 📱 响应式设计，支持移动端
- ⚡ 实时流式响应
- 🔌 简单的集成方式
- 🛠 可调整大小的聊天窗口

## 快速开始

### 环境要求

- Python 3.7+
- Flask 2.3.3
- Requests 2.31.0

### 安装

1. 克隆项目并进入目录：

```bash
git clone <repository-url>
cd <project-directory>
```

2. 安装依赖：

```bash
pip install -r requirements.txt
```

3. 运行应用：

```bash
python app.py
```

应用将在 `http://localhost:5000` 启动。

### 在网页中嵌入聊天组件

在你的网页中添加以下代码：

```html
<script src="http://localhost:5000/static/chat-widget.js"></script>
```

或者指定 API URL：

```html
<script src="chat-widget.js" data-api-url="http://localhost:5000"></script>
```

## 项目结构

```
.
├── app.py              # Flask 应用主文件
├── requirements.txt    # Python 依赖
├── static/
│   ├── chat-widget.js  # 可嵌入的聊天组件
│   └── example.html    # 示例页面
└── templates/
    └── chat.html       # 聊天界面模板
```

## API 接口

### Chat Completions API

**端点：** `/v1/chat/completions`

**方法：** POST

**请求头：**
- Content-Type: application/json
- Authorization: Bearer sk-looks-nb

**请求体：**
```json
{
    "model": "claude-3-5-sonnet-latest",
    "messages": [
        {"role": "user", "content": "你的消息"}
    ],
    "stream": true
}
```

**响应：** 
- 如果 stream=true，返回 Server-Sent Events 流
- 如果 stream=false，返回完整的 JSON 响应

## 特性说明

### 聊天组件

- 支持拖拽调整大小
- 响应式设计，自适应移动端
- 优雅的动画效果
- 代码高亮显示
- 支持 Markdown 格式

### 安全性

- API 密钥验证
- XSS 防护
- 安全的消息处理

## 开发说明

### 自定义样式

聊天组件的样式可以通过修改 `chat-widget.js` 中的 CSS 变量来自定义：

```css
:root {
    --primary-color: #4F46E5;
    --primary-hover: #4338CA;
    --bg-color: #F9FAFB;
    --chat-bg: #ffffff;
    --user-msg-bg: #F3F4F6;
    --assistant-msg-bg: #EEF2FF;
    --border-color: #E5E7EB;
    --text-primary: #111827;
    --text-secondary: #6B7280;
}
```

### 本地开发

1. 启用调试模式：
```python
app.run(host='0.0.0.0', port=5000, debug=True)
```

2. 监视文件变化：
```bash
python app.py
```

## 许可证

MIT License

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 常见问题

Q: 如何更改 API 地址？  
A: 在引入脚本时使用 `data-api-url` 属性指定。

Q: 支持哪些浏览器？  
A: 支持所有现代浏览器，包括 Chrome、Firefox、Safari、Edge 的最新版本。

## 联系方式

如有问题或建议，请提交 Issue。