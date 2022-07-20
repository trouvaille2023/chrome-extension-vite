<script setup lang="ts">
import { NSpace, NButton } from 'naive-ui';
const list = [
    { key: 'index', name: '主页', value: '' },
    { key: 'time', name: '时间', value: '' },
    { key: 'setting', name: '设置', value: '' },
    { key: 'about', name: '关于', value: '' },
];
const goToItem = function (item: typeof list[0]) {
    if (/setting/.test(item.key)) {
    }
};
</script>

<template>
    <NSpace class="jh-wang-newtab-box">
        <!--        <NButton strong secondary v-for="item in list" :key="item.key" @click="goToItem(item)">-->
        <!--            {{ item.name }}-->
        <!--        </NButton>-->
        <!--        <n-button type="primary"> Primary </n-button>-->
        <!--        <n-button>Default</n-button>-->
        <!--        <n-button class="items" v-for="item in list" :key="item.key">{{ item.name }}</n-button>-->
    </NSpace>
</template>

<style scoped lang="scss">
.jh-wang-newtab-box {
    display: grid;
    grid-row-gap: 6px;
    padding: 6px 0;
    .items {
        font-size: 1.5em;
        user-select: none;
        &:hover {
            cursor: pointer;
        }
    }
}
</style>
