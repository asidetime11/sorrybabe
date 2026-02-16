document.addEventListener('DOMContentLoaded', () => {
    const agreeBtn = document.getElementById('agreeBtn');
    const refuseBtn = document.getElementById('refuseBtn');
    const successOverlay = document.getElementById('successOverlay');
    const toggleApologyBtn = document.getElementById('toggleApologyBtn');
    const apologyContent = document.getElementById('apologyContent');

    // 切换碎碎念显示的逻辑
    toggleApologyBtn.addEventListener('click', () => {
        apologyContent.classList.toggle('hidden');
        if (apologyContent.classList.contains('hidden')) {
            toggleApologyBtn.textContent = '查看我的碎碎念 👇';
        } else {
            toggleApologyBtn.textContent = '收起碎碎念 👆';
        }
    });

    // 拒绝按钮的移动逻辑
    const moveButton = () => {
        // 重置定位方式为 fixed，相对于视口移动
        refuseBtn.style.position = 'fixed';
        
        // 获取按钮尺寸
        const btnWidth = refuseBtn.offsetWidth;
        const btnHeight = refuseBtn.offsetHeight;
        
        // 计算可视区域的安全范围（稍微留出边缘边距）
        const maxWidth = window.innerWidth - btnWidth - 20;
        const maxHeight = window.innerHeight - btnHeight - 20;

        // 生成随机坐标
        const randomX = Math.max(10, Math.random() * maxWidth);
        const randomY = Math.max(10, Math.random() * maxHeight);

        refuseBtn.style.left = randomX + 'px';
        refuseBtn.style.top = randomY + 'px';
        
        // 确保层级最高，不被盖住
        refuseBtn.style.zIndex = '9999';
    };

    // 鼠标移入（PC端）
    refuseBtn.addEventListener('mouseover', moveButton);
    
    // 点击/触摸（移动端）
    // 为了防止手快的人真的点到了，点击时也触发移动，或者直接视为同意
    refuseBtn.addEventListener('click', (e) => {
        e.preventDefault(); // 阻止默认点击行为
        moveButton();
    });
    
    // 移动端触摸开始时也尝试移动
    refuseBtn.addEventListener('touchstart', (e) => {
       e.preventDefault();
       moveButton(); 
    });

    // 同意按钮的点击逻辑
    agreeBtn.addEventListener('click', () => {
        successOverlay.classList.remove('hidden');
    });

    // 表单提交相关的逻辑
    const form = document.getElementById("choiceForm");
    const submitBtn = document.getElementById("submitBtn");

    form.addEventListener("submit", function(event) {
        // 阻止表单默认的跳转行为
        event.preventDefault();
        
        // 更改按钮状态
        submitBtn.textContent = "正在提交...";
        submitBtn.disabled = true;

        const data = new FormData(event.target);
        
        // 使用 fetch API 发送请求
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                // 成功时的处理
                form.innerHTML = `
                    <div style="text-align: center; padding: 20px;">
                        <h3 style="color: #4CAF50;">✅ 收到啦！</h3>
                        <p>你的选择已经发送成功了。</p>
                        <p>我会尽快兑现诺言的！爱你 ❤️</p>
                        <button id="backBtn" style="
                            margin-top: 15px;
                            padding: 10px 30px;
                            background-color: #e91e63;
                            color: white;
                            border: none;
                            border-radius: 50px;
                            font-size: 1rem;
                            cursor: pointer;
                        ">返回</button>
                    </div>
                `;
                // 给返回按钮绑定事件
                document.getElementById('backBtn').addEventListener('click', () => {
                    successOverlay.classList.add('hidden');
                    location.reload(); // 刷新页面回到初始状态
                });
            } else {
                // 失败时的处理
                submitBtn.textContent = "提交失败，请重试";
                submitBtn.disabled = false;
                alert("哎呀，提交出错了，可能是网络问题。");
            }
        }).catch(error => {
            console.error('Error:', error);
            submitBtn.textContent = "提交失败";
            submitBtn.disabled = false;
            alert("提交失败了，请截图发给我吧。");
        });
    });
});