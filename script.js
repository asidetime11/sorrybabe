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
        // 获取窗口可视区域的宽度和高度
        const maxWidth = window.innerWidth - refuseBtn.offsetWidth;
        const maxHeight = window.innerHeight - refuseBtn.offsetHeight;

        // 生成随机坐标
        // Math.random() 生成 0-1 之间的数
        const randomX = Math.random() * maxWidth;
        const randomY = Math.random() * maxHeight;

        // 将按钮设置为 fixed 定位，这样它是相对于整个窗口移动的
        refuseBtn.style.position = 'fixed';
        refuseBtn.style.left = randomX + 'px';
        refuseBtn.style.top = randomY + 'px';
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

    // 表单提交相关的逻辑 (可选：用 JS 增强体验，不刷新页面)
    /* 
       注意：如果你使用了 Formspree，默认它会跳转到一个成功页面。
       如果你希望留在本页并显示"提交成功"，可以使用下面的 AJAX 代码。
       如果不使用 AJAX，下面的代码可以忽略，表单会自动跳转。
    */
    const form = document.getElementById("choiceForm");
    
    // (可选) 拦截表单提交，使用 AJAX 发送
    /*
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const status = document.createElement("p");
        form.appendChild(status);
        
        const data = new FormData(event.target);
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "收到啦！我会尽快准备的！";
                form.reset(); // 清空表单
                // 隐藏提交按钮防止重复提交
                document.getElementById('submitBtn').style.display = 'none';
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                        status.innerHTML = "提交失败了，请截图发给我吧。";
                    }
                })
            }
        }).catch(error => {
            status.innerHTML = "提交失败了，请截图发给我吧。";
        });
    });
    */