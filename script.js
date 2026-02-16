document.addEventListener('DOMContentLoaded', () => {
    const agreeBtn = document.getElementById('agreeBtn');
    const refuseBtn = document.getElementById('refuseBtn');
    const successOverlay = document.getElementById('successOverlay');

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
        // 可选：添加放烟花的效果或者播放音乐
    });
});