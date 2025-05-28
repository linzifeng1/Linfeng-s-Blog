<script setup lang="ts">
import HomePartOne from './components/HomePartOne.vue';

</script>
<template>
    <div class="home-wrapper">
        <!-- 背景装饰元素：模糊圆形渐变背景 -->
        <div class="bg-blur-circle circle-1"></div>
        <div class="bg-blur-circle circle-2"></div>
        <div class="bg-blur-circle circle-3"></div>
        <div class="bg-blur-circle circle-4"></div>
        <HomePartOne />
        <!-- 下滑查看更多提示模块 -->
        <div class="scroll-down-container">
            <div class="scroll-down-text">下滑查看更多</div>
        </div>
    </div>
</template>
<style scoped lang="scss">

.home-wrapper {
    // 布局属性
    position: relative;
    margin-top: -4rem;// 去除nav留样部分 --- 由内层盒子自主设计
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // 渐变背景色
    background: linear-gradient(135deg,
            rgba(var(--color-pure-background), 1) 0%,
            rgba(var(--color-background), 0.95) 100%);

    // 动画效果
    animation: fadeIn 0.6s ease-out forwards; // 淡入动画

    @media (max-width: 768px) {
        // 当手机端的时候不进行组件居中
        align-items: stretch;
        justify-content: flex-start;
        padding-top: 6rem;// 手机端自主设置顶部边距
    }
}

/* ===== 背景装饰元素 ===== */
// 模糊圆形基础样式
.bg-blur-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px); // 模糊效果
  opacity: 0.7; // 透明度
  z-index: 0;
  animation: pulsate 15s infinite alternate ease-in-out; // 脉动动画
  transform-origin: center;
}

// 右上角大圆
.circle-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(77, 163, 255, 0.5), rgba(107, 115, 255, 0.2));
  top: -150px;
  right: -100px;
  // 组合动画：先从右上角滑入，然后开始脉动
  animation: slideInTopRight 0.8s ease-out forwards, pulsate 15s infinite alternate ease-in-out 0.8s;
}

// 左下角大圆
.circle-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(107, 115, 255, 0.4), rgba(77, 163, 255, 0.2));
  bottom: -100px;
  left: -50px;
  // 组合动画：先从左下角滑入，然后开始脉动
  animation: slideInBottomLeft 0.8s ease-out forwards, pulsate 15s infinite alternate ease-in-out 0.8s;
}

// 左侧中部小圆
.circle-3 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(107, 115, 255, 0.35), rgba(77, 163, 255, 0.15));
  top: 40%;
  left: 15%;
  // 组合动画：先缩放淡入，然后开始脉动
  animation: fadeInScale 1s ease-out forwards, pulsate 15s infinite alternate ease-in-out 1s;
}

// 右侧中部小圆
.circle-4 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(138, 99, 210, 0.35), rgba(77, 163, 255, 0.15));
  bottom: 20%;
  right: 15%;
  // 组合动画：先缩放淡入，然后开始脉动
  animation: fadeInScale 1s ease-out forwards, pulsate 15s infinite alternate ease-in-out 1s;
}

/* ===== 主内容容器 ===== */
.home-container {
  // 定位与层级
  position: relative;
  z-index: 1; // 确保内容在背景圆形之上
  
  // 布局属性
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  max-width: 1200px; // 最大宽度限制
  padding: 3rem 4rem;
  gap: 4rem; // 左右区域间距
  
  // 动画效果
  animation: slideUp 0.6s ease-out 0.2s both; // 从下方滑入
  
  // 响应式布局：在小屏幕上切换为纵向排列
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 2rem;
    gap: 3rem;
  }
}


// 下拉查看更多
.scroll-down-container {
    // 定位与层级
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%); // 水平居中
    z-index: 10; // 确保在最上层

    // 布局属性
    display: flex;
    flex-direction: column;
    align-items: center;

    // 交互效果
    cursor: pointer; // 鼠标指针
    transition: transform 0.3s ease; // 平滑过渡

    // 动画效果
    animation: fadeInUp 1.5s ease-out 2s both; // 从下方淡入

    // 悬停效果
    &:hover {
        transform: translateX(-50%) translateY(-5px); // 上浮效果

        // 悬停时启动箭头动画
        .scroll-down-icon {
            .chevron {
                animation-play-state: running;
            }
        }

        // 悬停时文字渐变效果
        .scroll-down-text {
            background-position: 100% 50%;
        }
    }
}

// 下滑文字样式 - 保留渐变效果
.scroll-down-text {
    // 文字样式
    font-size: 0.95rem;
    font-weight: 500;
    margin-bottom: 0.8rem;

    // 渐变文字效果
    background: linear-gradient(45deg, #4DA3FF, #6B73FF, #8A63D2);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    // 过渡效果
    transition: background-position 0.8s ease; // 渐变过渡
}
</style>