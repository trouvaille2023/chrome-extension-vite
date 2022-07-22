<script setup>
import Layout from '@/layout/Layout.vue';
import Setting from '@/setting/components/Setting.vue';
</script>
<template>
    <n-dialog-provider>
        <n-message-provider>
            <Layout>
                <Setting />
            </Layout>
        </n-message-provider>
    </n-dialog-provider>
</template>
