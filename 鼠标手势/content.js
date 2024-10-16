let isRightClicking = false;
let wasDragged = false;
let startX;

document.addEventListener("mousedown", (event) => {
  if (event.button === 2) {
    // 鼠标右键按下
    isRightClicking = true;
    wasDragged = false;
    startX = event.clientX;
  }
});

document.addEventListener("mousemove", (event) => {
  if (isRightClicking) {
    const endX = event.clientX;
    if (Math.abs(endX - startX) > 10) {
      // 检测到移动，标记为滑动
      wasDragged = true;
    }
  }
});

document.addEventListener("mouseup", (event) => {
  if (isRightClicking && event.button === 2) {
    const endX = event.clientX;
    if (wasDragged) {
      // 如果确实有滑动，就根据方向进行导航
      if (startX - endX > 50) {
        window.history.back();
      } else if (endX - startX > 50) {
        window.history.forward();
      }
      event.preventDefault(); // 阻止右键菜单
    }
  }
  isRightClicking = false;
});

document.addEventListener("contextmenu", (event) => {
  if (wasDragged) {
    // 阻止滑动时的右键菜单
    event.preventDefault();
    wasDragged = false; // 重置标记
  }
});
