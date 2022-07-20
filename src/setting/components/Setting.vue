<script setup lang="ts">
import { h, ref, renderSlot } from 'vue';
import Layout from '@/layout/Layout.vue';
import { FormInst, NButton, NSwitch } from 'naive-ui';
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
        render: (row: Partial<ModelType>) => {
            return h(NSwitch, {
                value: row.badgeBool,
                checkedValue: true,
                uncheckedValue: false,
                disabled: true,
            });
        },
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
        render: (row: Partial<ModelType>) => {
            return h(NSwitch, {
                value: row.boxBool,
                checkedValue: true,
                uncheckedValue: false,
                disabled: true,
            });
        },
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
        render: (row: Partial<ModelType>) => {
            return h(NSwitch, {
                value: row.fillBool,
                checkedValue: true,
                uncheckedValue: false,
                disabled: true,
            });
        },
    },
    {
        title: '用户名',
        key: 'fillAccount',
        align: 'center',
    },
    // {
    //     title: '密码',
    //     key: 'fillPasswd',
    //     align: 'center',
    // },
    {
        title: '操作',
        key: 'operate',
        align: 'center',
        render: (row: ModelType) => {
            return [
                h(
                    NButton,
                    {
                        size: 'small',
                        onClick: () => {
                            addOrEdit.value = 'edit';
                            model.value = {
                                id: row.id,
                                site: row.site,
                                badgeBool: row.badgeBool,
                                badgeText: row.badgeText,
                                badgeColor: row.badgeColor,
                                boxBool: row.boxBool,
                                boxColor: row.boxColor,
                                fillBool: row.fillBool,
                                fillAccount: row.fillAccount,
                                fillPasswd: row.fillPasswd,
                                handleBool: row.handleBool,
                                handleAccount: row.handleAccount,
                                handlePasswd: row.handlePasswd,
                            };
                            showModal.value = true;
                        },
                    },
                    { default: () => '编辑' }
                ),
                h(
                    NButton,
                    {
                        size: 'small',
                        style: { color: 'red', marginLeft: '20px' },
                        onClick: () => {
                            chrome.runtime.sendMessage({ event: 'delSiteList', data: row }, async (response) => {
                                if (response) {
                                    // message.success('删除成功');
                                    getSiteList();
                                }
                            });
                        },
                    },
                    { default: () => '删除' }
                ),
            ];
        },
    },
];

const dataList = ref([]);
let showModal = ref(false);
const addOrEdit = ref('new');
const formRef = ref<FormInst | null>(null);
type ModelType = {
    id: number; //id
    site: string; //网址
    badgeBool: boolean; //显示标记
    badgeText: string; //标记文字
    badgeColor: string; //标记颜色
    boxBool: boolean; //显示边框
    boxColor: string; //边框颜色
    fillBool: boolean; //自动填充
    fillAccount: string; //填充用的用户名
    fillPasswd: string; //填充用的密码
    handleBool: boolean; //是否手动修正选择器
    handleAccount: string; //用户名选择器
    handlePasswd: string; //密码选择器
};
// const message = useMessage();
let model = ref<ModelType>({
    id: Date.now(),
    site: '',
    badgeBool: true,
    badgeText: '',
    badgeColor: '#18A058',
    boxBool: true,
    boxColor: '#18A058',
    fillBool: true,
    fillAccount: '',
    fillPasswd: '',
    handleBool: false,
    handleAccount: '',
    handlePasswd: '',
});
const submitCallback = (e: MouseEvent) => {
    formRef.value?.validate((error) => {
        if (!error) {
            chrome.runtime.sendMessage(
                {
                    event: 'setSiteList',
                    data: {
                        id: model.value.id,
                        site: model.value.site.trim(),
                        badgeBool: model.value.badgeBool,
                        badgeText: model.value.badgeText.trim(),
                        badgeColor: model.value.badgeColor.trim(),
                        boxBool: model.value.boxBool,
                        boxColor: model.value.boxColor.trim(),
                        fillBool: model.value.fillBool,
                        fillAccount: model.value.fillAccount.trim(),
                        fillPasswd: model.value.fillPasswd,
                        handleBool: model.value.handleBool,
                        handleAccount: model.value.handleAccount.trim(),
                        handlePasswd: model.value.handlePasswd.trim(),
                    },
                },
                async (response) => {
                    if (response) {
                        // message.success('添加成功');
                        addOrEdit.value = 'new';
                        showModal.value = false;
                        getSiteList();
                    }
                }
            );
        }
    });
};
const modalCloseCallback = () => {
    showModal.value = false;
};
const addSiteCallback = () => {
    model.value = {
        id: Date.now(),
        site: '',
        badgeBool: true,
        badgeText: '',
        badgeColor: '#18A058',
        boxBool: true,
        boxColor: '#18A058',
        fillBool: true,
        fillAccount: '',
        fillPasswd: '',
        handleBool: false,
        handleAccount: '',
        handlePasswd: '',
    };
    showModal.value = true;
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
            <n-button class="add" style="margin-bottom: 20px" type="primary" size="small" @click="addSiteCallback">添加</n-button>
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
            @negative-click="modalCloseCallback"
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
