<script setup lang="ts">
import { h, ref } from 'vue';
import Layout from '@/layout/Layout.vue';
import { FormInst, NButton } from 'naive-ui';
document.title = '设置';
const columns = [
    {
        title: '序号',
        key: 'no',
        align: 'center',
        render: (_: any, index: number) => {
            return `${index + 1}`;
        },
    },
    {
        title: '域名',
        key: 'site',
        align: 'left',
        width: 200,
    },
    {
        title: '显示标记',
        key: 'badgeBool',
        align: 'center',
    },
    {
        title: '标记文字',
        key: 'badgeText',
        align: 'center',
    },
    {
        title: '标记颜色',
        key: 'badgeColor',
        align: 'center',
    },
    {
        title: '显示边框',
        key: 'boxBool',
        align: 'center',
    },
    {
        title: '边框颜色',
        key: 'boxColor',
        align: 'center',
    },
    {
        title: '是否自动填充',
        key: 'fillBool',
        align: 'center',
    },
    {
        title: '用户名',
        key: 'fillAccount',
        align: 'center',
    },
    {
        title: '密码',
        key: 'fillPasswd',
        align: 'center',
    },
    {
        title: '操作',
        key: 'operate',
        align: 'center',
        render: (row: any) => {
            return [
                h(
                    NButton,
                    {
                        size: 'small',
                        onClick: () => {},
                    },
                    { default: () => '编辑' }
                ),
                h(
                    NButton,
                    {
                        size: 'small',
                        style: { color: 'red', marginLeft: '20px' },
                        onClick: () => {},
                    },
                    { default: () => '删除' }
                ),
            ];
        },
    },
];

const dataList = ref([]);
const showModal = ref(false);
const addOrEdit = ref('new');
const formRef = ref<FormInst | null>(null);

// const message = useMessage();
const model = ref({
    site: 'www.baidu.com',
    badgeBool: true,
    badgeText: '百度',
    badgeColor: '#18A058',
    boxBool: true,
    boxColor: '#18A058',
    fillBool: true,
    fillAccount: 'aaaaaa',
    fillPasswd: '111111',
    handleBool: false,
    handleAccount: 'aaaasss',
    handlePasswd: '112333',
});
const submitCallback = (e: MouseEvent) => {
    formRef.value?.validate((error) => {
        if (!error) {
            chrome.runtime.sendMessage({ event: 'setSiteList', data: model.value }, async (response) => {
                if (response) {
                    // message.success('添加成功');
                    showModal.value = false;
                    getSiteList();
                }
            });
        }
    });
};

const rules = {};
const getSiteList = () => {
    chrome.runtime.sendMessage({ event: 'getSiteList', data: null }, async (data) => {
        if (data && data?.siteList.length) {
            dataList.value = data?.siteList;
        }
    });
};
getSiteList();
</script>

<template>
    <Layout>
        <div class="jh-wang-setting-box">
            <n-button class="add" style="margin-bottom: 20px" type="primary" size="small" @click="showModal = true">添加</n-button>
            <n-data-table :columns="columns" :data="dataList" :paginate-single-page="false" />
        </div>
        <n-modal
            v-model:show="showModal"
            :title="addOrEdit === 'new' ? '新增' : '修改'"
            style="width: 900px"
            preset="dialog"
            positive-text="确定"
            negative-text="放弃"
            :mask-closable="false"
            aria-modal="true"
            :show-icon="false"
            @positive-click="submitCallback"
            @negative-click="showModal = false"
        >
            <n-card class="jh-wang-setting-add" style="height: 780px; overflow: hidden; overflow-y: auto">
                <n-form ref="formRef" :model="model" :rules="rules" size="small" label-placement="top">
                    <n-form-item label="域名">
                        <n-input v-model:value="model.site" placeholder="请填写域名，如：www.baidu.com" />
                    </n-form-item>
                    <n-form-item label="显示标记">
                        <n-switch v-model:value="model.badgeBool">
                            <template #checked>显示</template>
                            <template #unchecked>隐藏</template>
                        </n-switch>
                    </n-form-item>
                    <template v-if="model.badgeBool">
                        <n-form-item label="标记文字">
                            <n-input v-model:value="model.badgeText" placeholder="显示在标记上的文字,不要超过两个汉字或4个字母" />
                        </n-form-item>
                        <n-form-item label="标记颜色">
                            <n-color-picker
                                v-model:value="model.badgeColor"
                                :show-alpha="true"
                                :modes="['hex']"
                                :swatches="['#18A058', '#2080F0', '#F0A020', '#D03050FF']"
                            />
                        </n-form-item>
                    </template>
                    <n-form-item label="显示边框">
                        <n-switch v-model:value="model.boxBool">
                            <template #checked>显示</template>
                            <template #unchecked>隐藏</template>
                        </n-switch>
                    </n-form-item>
                    <n-form-item label="边框颜色" v-if="model.boxBool">
                        <n-color-picker
                            v-model:value="model.boxColor"
                            :show-alpha="true"
                            :modes="['hex']"
                            :swatches="['#18A058', '#2080F0', '#F0A020', '#D03050FF']"
                        />
                    </n-form-item>
                    <n-form-item label="是否自动填充">
                        <n-switch v-model:value="model.fillBool">
                            <template #checked>是</template>
                            <template #unchecked>否</template>
                        </n-switch>
                    </n-form-item>
                    <template v-if="model.fillBool">
                        <n-form-item label="用户名">
                            <n-input v-model:value="model.fillAccount" placeholder="需要自动填充的用户名" />
                        </n-form-item>
                        <n-form-item label="密码">
                            <n-input v-model:value="model.fillPasswd" placeholder="需要自动填充的密码" />
                        </n-form-item>
                        <n-form-item label="手动修正选择器">
                            <n-switch v-model:value="model.handleBool">
                                <template #checked>是</template>
                                <template #unchecked>否</template>
                            </n-switch>
                        </n-form-item>
                        <template v-if="model.handleBool">
                            <n-form-item label="用户名选择器">
                                <n-input v-model:value="model.handleAccount" placeholder="当系统自动识别的填充元素不准确时，自定义一个选择器" />
                            </n-form-item>
                            <n-form-item label="密码选择器">
                                <n-input v-model:value="model.handlePasswd" placeholder="当系统自动识别的填充元素不准确时，自定义一个选择器" />
                            </n-form-item>
                        </template>
                    </template>
                </n-form>
            </n-card>
        </n-modal>
    </Layout>
</template>

<style scoped lang="scss"></style>
