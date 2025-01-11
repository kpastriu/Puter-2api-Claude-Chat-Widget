// 获取当前脚本的URL配置
const currentScript = document.currentScript;
const apiUrl = currentScript.getAttribute('data-api-url') || 'http://localhost:5000';

// 创建样式
const style = document.createElement('style');
style.textContent = `
    .chat-widget-trigger {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 60px;
        height: 60px;
        background: #4F46E5;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        cursor: pointer;
        z-index: 9998;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .chat-widget-trigger:hover {
        transform: scale(1.1);
        background: #4338CA;
    }

    .chat-widget-trigger i {
        color: white;
        font-size: 24px;
    }

    .chat-widget-container {
        position: fixed;
        width: 380px;
        height: 600px;
        right: 20px;
        bottom: 90px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: none;
        flex-direction: column;
        overflow: hidden;
        resize: both;
        min-width: 300px;
        min-height: 400px;
        border: 1px solid #e0e0e0;
        transition: border-color 0.2s;
        z-index: 9999;
    }
    
    .chat-widget-container:hover {
        border-color: #2196f3;
    }
    
    .chat-widget-container::after {
        content: '';
        position: absolute;
        right: 0;
        bottom: 0;
        width: 15px;
        height: 15px;
        cursor: se-resize;
        background: linear-gradient(135deg, transparent 50%, #2196f3 50%);
        border-radius: 0 0 12px 0;
        opacity: 0;
        transition: opacity 0.2s;
    }
    
    .chat-widget-container:hover::after {
        opacity: 1;
    }

    .chat-widget-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: #f8f9fa;
        border-bottom: 1px solid #e0e0e0;
    }

    .chat-widget-title {
        font-size: 16px;
        font-weight: 500;
        color: #333;
    }

    .chat-widget-close {
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background 0.2s;
    }

    .chat-widget-close:hover {
        background: #e9ecef;
    }

    .chat-widget-iframe {
        flex: 1;
        width: 100%;
        border: none;
    }

    @media (max-width: 480px) {
        .chat-widget-container {
            width: 100%;
            height: 100%;
            right: 0;
            bottom: 0;
            border-radius: 0;
            resize: none;
        }
        
        .chat-widget-trigger {
            right: 10px;
            bottom: 10px;
        }
    }
`;

document.head.appendChild(style);

// 创建触发器按钮
const trigger = document.createElement('div');
trigger.className = 'chat-widget-trigger';
trigger.innerHTML = '<i class="fas fa-comments"></i>';

// 创建聊天组件容器
const container = document.createElement('div');
container.className = 'chat-widget-container';

// 创建移动端顶部栏
const header = document.createElement('div');
header.className = 'chat-widget-header';
header.innerHTML = `
    <div class="chat-widget-title">Chat Assistant</div>
    <div class="chat-widget-close">
        <i class="fas fa-times"></i>
    </div>
`;

// 添加拖动调整大小的功能
let isResizing = false;
let startX, startY, startWidth, startHeight;

container.addEventListener('mousedown', (e) => {
    const rect = container.getBoundingClientRect();
    const isBottomEdge = Math.abs(e.clientY - (rect.top + rect.height)) < 10;
    const isRightEdge = Math.abs(e.clientX - (rect.left + rect.width)) < 10;
    const isCorner = isBottomEdge && isRightEdge;
    
    if (isCorner || isBottomEdge || isRightEdge) {
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = rect.width;
        startHeight = rect.height;
        
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
        e.preventDefault();
    }
});

function handleMouseMove(e) {
    if (!isResizing) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    const newWidth = Math.max(300, startWidth + deltaX);
    const newHeight = Math.max(400, startHeight + deltaY);
    
    container.style.width = newWidth + 'px';
    container.style.height = newHeight + 'px';
}

function handleMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

// 响应式处理
function handleResize() {
    if (!isVisible) return; // 只在显示状态下调整
    
    if (window.innerWidth <= 480) {
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.right = '0';
        container.style.bottom = '0';
        container.style.borderRadius = '0';
        document.body.style.overflow = 'hidden';
        container.style.resize = 'none';
    } else {
        container.style.resize = 'both';
        document.body.style.overflow = '';
    }
}

window.addEventListener('resize', handleResize);

// 创建 iframe
const iframe = document.createElement('iframe');
iframe.className = 'chat-widget-iframe';
iframe.src = apiUrl;

// 先添加 header，再添加 iframe
container.appendChild(header);
container.appendChild(iframe);

// 添加 Font Awesome
const fontAwesome = document.createElement('link');
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/font-awesome/6.0.0/css/all.min.css';

// 添加到页面
document.head.appendChild(fontAwesome);
document.body.appendChild(trigger);
document.body.appendChild(container);

// 切换显示/隐藏
let isVisible = false;

function toggleChat(show) {
    isVisible = show;
    if (isVisible) {
        container.style.display = 'flex';
        trigger.style.display = 'none';
        if (window.innerWidth <= 480) {
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        }
    } else {
        container.style.display = 'none';
        trigger.style.display = 'flex';
        document.body.style.overflow = ''; // 恢复背景滚动
    }
}

trigger.addEventListener('click', () => toggleChat(true));

// 移动端关闭按钮事件
const closeButton = header.querySelector('.chat-widget-close');
closeButton.addEventListener('click', () => toggleChat(false));

function handleMouseMove(e) {
    if (!isResizing) return;
    
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    
    const newWidth = Math.max(300, startWidth + deltaX);
    const newHeight = Math.max(400, startHeight + deltaY);
    
    container.style.width = newWidth + 'px';
    container.style.height = newHeight + 'px';
}

function handleMouseUp() {
    isResizing = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
}

// 响应式处理
function handleResize() {
    if (!isVisible) return; // 只在显示状态下调整
    
    if (window.innerWidth <= 480) {
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.right = '0';
        container.style.bottom = '0';
        container.style.borderRadius = '0';
        document.body.style.overflow = 'hidden';
        container.style.resize = 'none';
    } else {
        container.style.resize = 'both';
        document.body.style.overflow = '';
    }
}

window.addEventListener('resize', handleResize); 