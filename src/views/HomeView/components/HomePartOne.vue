<script setup lang="ts">
import LinTag from '@/components/MyDesignComponents/Lin-Tag.vue';

</script>
<template>
    <!-- 主内容容器：左右两栏布局 -->
    <div class="home-container">
        <!-- 左侧文字区域：博客标题和简介 -->
        <div class="left-section">
            <h1 class="title">Linfeng's Blog</h1>
            <h2 class="subtitle">Every Things is impossible!</h2>
            <p class="description">将所有的不开心都抛掷脑后！</p>

            <!-- 装饰线条 -->
            <div class="decorative-line"></div>
        </div>

        <!-- 右侧个人信息卡片 -->
        <div class="right-section">
            <div class="profile-card">
                <!-- 头像和名字并排布局 -->
                <div class="header-row">
                    <div class="avatar">
                        <span class="avatar-text">林峰</span>
                    </div>
                    <div class="name-container">
                        <h3 class="name">林峰 (Linfeng)</h3>
                        <p class="role">一个在校大学生</p>
                    </div>
                </div>

                <!-- 个人简介和技能标签 -->
                <div class="profile-info">
                    <!-- 个人简介 -->
                    <div class="bio">
                        <p>热爱技术，专注于前端与后端开发</p>
                        <p>追求代码的优雅与简洁</p>
                        <p>相信技术改变世界的力量</p>
                    </div>

                    <!-- 技能标签列表 -->
                    <div class="skills">
                        <LinTag>Vue.js</LinTag>
                        <LinTag type="success">TypeScript</LinTag>
                        <LinTag type="warning">Node.js</LinTag>
                        <LinTag type="error">Android</LinTag>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
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
    height: 100vh; // 视口高度;
    padding: 3rem 4rem;
    gap: 4rem; // 左右区域间距

    // 动画效果
    animation: slideUp 0.6s ease-out 0.2s both; // 从下方滑入

    // 响应式布局：在小屏幕上切换为纵向排列
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: none;
        justify-content: none;
        padding: 7rem 2rem 2rem 2rem;
        height: 100%;// 高度自动
    }
}

/* ===== 5. 左侧区域 ===== */
.left-section {
    // 布局属性
    flex: 1;
    max-width: 550px; // 左侧区域最大宽度
    position: relative;
    // 动画效果
    animation: slideInLeft 0.7s ease-out 0.3s both; // 从左侧滑入

    @media (max-width: 768px) {
        flex: none;
    }

    // 主标题样式
    .title {
        // 文字样式
        font-size: 3.5rem;
        font-weight: 700;
        margin-bottom: 1rem;
        letter-spacing: -0.5px;
        line-height: 1.4; // 增加行高，确保字母'g'完全显示
        padding-bottom: 0.1rem; // 添加底部内边距，防止文字被截断

        // 渐变文字效果
        background: linear-gradient(45deg, #4DA3FF, #6B73FF, #8A63D2);
        background-size: 200% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        animation: gradient-text 8s ease infinite; // 渐变色动画

        // 响应式调整
        @media (max-width: 768px) {
            font-size: 2.5rem;
        }
    }

    // 副标题样式
    .subtitle {
        // 文字样式
        font-size: 1.8rem;
        font-weight: 500;
        color: rgb(var(--color-text));
        margin-bottom: 1.5rem;
        font-style: italic;
        opacity: 0.9;

        // 动画效果
        animation: fadeIn 0.6s ease-out 0.4s both; // 淡入动画

        // 响应式调整
        @media (max-width: 768px) {
            font-size: 1.4rem;
        }
    }

    // 描述文字样式
    .description {
        // 文字样式
        font-size: 1.2rem;
        color: rgb(var(--color-text));
        line-height: 1.6;
        font-weight: 300;
        max-width: 90%;

        // 动画效果
        animation: fadeIn 0.6s ease-out 0.5s both; // 淡入动画

        // 响应式调整
        @media (max-width: 768px) {
            font-size: 1rem;
            max-width: 100%;
        }
    }

    // 装饰线条样式
    .decorative-line {
        height: 4px;
        width: 80px;
        background: linear-gradient(90deg, #4DA3FF, transparent); // 渐变线条
        margin-top: 2rem;
        border-radius: 2px;
        animation: expandWidth 0.8s ease-out 0.6s both; // 展开动画
    }
}

/* ===== 6. 右侧区域 ===== */
.right-section {
    // 布局属性
    flex: 0 0 450px; // 固定宽度，不伸缩
    perspective: 1000px; // 3D透视效果

    // 动画效果
    animation: slideInRight 0.7s ease-out 0.4s both; // 从右侧滑入

    // 响应式调整
    @media (max-width: 768px) {
        flex: none;
        width: 100%;
        max-width: 450px;
    }
}

/* ===== 7. 个人资料卡片 ===== */
.profile-card {
    // 背景与模糊效果
    background: rgba(var(--color-background), 0.6); // 半透明背景
    backdrop-filter: blur(20px); // 背景模糊效果

    // 布局与形状
    border-radius: 24px;
    padding: 2.5rem;
    position: relative;
    overflow: hidden;

    // 阴影效果
    box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.08),
        0 0 0 1px rgba(255, 255, 255, 0.1),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05);

    // 过渡与变换
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); // 平滑过渡
    transform: rotateY(0deg);

    // 动画效果
    animation: cardAppear 0.7s ease-out 0.5s both; // 卡片出现动画

    /* 卡片内部装饰模糊效果 - 右上角紫色光晕 */
    &::before {
        content: '';
        position: absolute;
        top: -50px;
        right: -50px;
        width: 250px;
        height: 250px;
        background: radial-gradient(circle, rgba(138, 99, 210, 0.4), transparent 70%);
        border-radius: 50%;
        filter: blur(30px);
        z-index: 0;
        animation: pulseGlow 10s infinite alternate ease-in-out; // 光晕脉动
    }

    /* 卡片内部装饰模糊效果 - 左下角蓝色光晕 */
    &::after {
        content: '';
        position: absolute;
        bottom: -30px;
        left: -30px;
        width: 200px;
        height: 200px;
        background: radial-gradient(circle, rgba(77, 163, 255, 0.35), transparent 70%);
        border-radius: 50%;
        filter: blur(25px);
        z-index: 0;
        animation: pulseGlow 10s infinite alternate-reverse ease-in-out; // 光晕脉动
    }

    // 悬停效果
    &:hover {
        transform: translateY(-8px) rotateY(2deg); // 上移并轻微旋转
        box-shadow:
            0 30px 60px rgba(0, 0, 0, 0.12),
            0 0 0 1px rgba(255, 255, 255, 0.15),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
    }
}

/* ===== 8. 头像和名字区域 ===== */
.header-row {
    // 布局属性
    display: flex;
    align-items: center;
    margin-bottom: 1.8rem;
    position: relative;
    z-index: 1; // 确保在卡片内部装饰之上

    // 动画效果
    animation: fadeIn 1s ease-out 1.1s both; // 淡入动画
}

// 头像样式
.avatar {
    // 尺寸与形状
    width: 90px;
    height: 90px;
    border-radius: 50%;
    flex-shrink: 0;

    // 布局属性
    display: flex;
    align-items: center;
    justify-content: center;

    // 背景效果
    background: linear-gradient(135deg, #4DA3FF, #6B73FF, #8A63D2); // 渐变背景
    background-size: 300% 300%;

    // 阴影效果
    box-shadow:
        0 8px 24px rgba(77, 163, 255, 0.25),
        inset 0 2px 6px rgba(255, 255, 255, 0.2);

    // 过渡效果
    transition: all 0.5s ease; // 平滑过渡

    // 动画效果
    animation: gradient-bg 8s ease infinite, popIn 1s cubic-bezier(0.16, 1.11, 0.5, 1.29) 1.2s both;

    // 悬停效果
    &:hover {
        transform: scale(1.05) rotate(5deg); // 放大并旋转
        box-shadow:
            0 12px 30px rgba(77, 163, 255, 0.35),
            inset 0 2px 10px rgba(255, 255, 255, 0.3);
    }

    // 头像文字样式
    .avatar-text {
        color: white; // 保留白色，因为这是自定义颜色
        font-size: 1.5rem;
        font-weight: 600;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); // 文字阴影
    }
}

// 名字容器样式
.name-container {
    margin-left: 1.5rem;
    text-align: left;
    animation: fadeIn 1s ease-out 1.3s both; // 淡入动画
    color: rgb(var(--color-text)); // 适配日间/夜间模式
}

/* ===== 9. 个人信息区域 ===== */
.profile-info {
    // 定位与层级
    position: relative;
    z-index: 1; // 确保在卡片内部装饰之上

    // 动画效果
    animation: fadeIn 1s ease-out 1.4s both; // 淡入动画
}

// 个人简介样式
.bio {
    margin-bottom: 1.8rem;
    text-align: center;

    p {
        font-size: 0.95rem;
        color: rgb(var(--color-text)); // 适配日间/夜间模式
        line-height: 1.6;
        margin-bottom: 0.5rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
}

// 技能标签区域样式
.skills {
    // 布局属性
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    justify-content: center;
}

</style>