<script setup lang="ts">
import { computed } from 'vue';
import { darkTheme, useOsTheme } from 'naive-ui';

const osThemeRef = useOsTheme();
let theme = computed(() => (osThemeRef.value === 'dark' ? darkTheme : null));
</script>

<template>
    <n-config-provider :theme="theme" abstract>
        <slot></slot>
    </n-config-provider>
</template>
