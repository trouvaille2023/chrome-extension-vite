<script setup lang="ts">
import { ref } from 'vue';
import Layout from '@/layout/Layout.vue';

let dataTime = ref(Date.now());
setInterval(() => {
    dataTime.value = Date.now();
}, 500);
const showAbout = () => {
    alert(`About me...<br>About me...`);
};

const showSetting = () => {
    window.open('setting.html', '_blank');
};
</script>

<template>
    <Layout>
        <div class="jh-wang-popup-box">
            <div class="jh-wang-popup-time-wrap">
                <n-time :time="dataTime" type="date" class="date" />
                <n-time :time="dataTime" format="hh:mm:ss" class="time" />
            </div>
            <div class="jh-wang-popup-footer">
                <n-el tag="span" class="jh-wang-about" @click="showAbout">关于</n-el>
                <n-el tag="span" class="jh-wang-popup" @click="showSetting">设置</n-el>
            </div>
        </div>
    </Layout>
</template>

<style scoped lang="scss">
.jh-wang-popup-box {
    display: grid;
    grid-template-rows: 1fr 72px;
    height: 100vh;
    width: 100%;
    .jh-wang-popup-time-wrap {
        display: grid;
        grid-template-rows: 72px 1fr;
        align-items: center;
        .date {
            font-size: 32px;
        }
        .time {
            font-size: 86px;
            font-weight: bold;
            font-family: 'Helvetica Neue', sans-serif;
        }
    }
    .jh-wang-popup-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        column-gap: 36px;
        .jh-wang-about,
        .jh-wang-popup {
            height: 38px;
            width: 120px;
            line-height: 38px;
            border-radius: 4px;
            border: 1px solid #2a2a2e;
            font-size: 18px;
            user-select: none;
            &:hover {
                cursor: pointer;
                border: 1px solid #54545a;
            }
        }
    }
}
</style>
