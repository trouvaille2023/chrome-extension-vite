<script setup lang="ts">
import { h, ref } from 'vue';
import { FormInst, NButton, NSwitch, useDialog, useMessage } from 'naive-ui';

document.title = '设置';
const dialog = useDialog();
const showDelModal = ref(false);
const delRow = ref<ModelType | null>(null);

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
                            siteValue.value = {
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
                            delRow.value = row;
                            showDelModal.value = true;
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
const message = useMessage();
let siteValue = ref<ModelType>({
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
    formRef.value
        ?.validate((error) => {
            if (!error && siteValue.value.site.trim()) {
                chrome.runtime.sendMessage(
                    {
                        event: 'setSiteList',
                        data: {
                            id: siteValue.value.id,
                            site: siteValue.value.site.trim(),
                            badgeBool: siteValue.value.badgeBool,
                            badgeText: siteValue.value.badgeText.trim(),
                            badgeColor: siteValue.value.badgeColor.trim(),
                            boxBool: siteValue.value.boxBool,
                            boxColor: siteValue.value.boxColor.trim(),
                            fillBool: siteValue.value.fillBool,
                            fillAccount: siteValue.value.fillAccount.trim(),
                            fillPasswd: siteValue.value.fillPasswd,
                            handleBool: siteValue.value.handleBool,
                            handleAccount: siteValue.value.handleAccount.trim(),
                            handlePasswd: siteValue.value.handlePasswd.trim(),
                        },
                    },
                    async (response) => {
                        if (response) {
                            message.success('添加成功');
                            addOrEdit.value = 'new';
                            showModal.value = false;
                            getSiteList();
                        }
                    }
                );
            }
        })
        .catch((e) => {
            console.info(e);
        });
    return false;
};
const modalCloseCallback = () => {
    showModal.value = false;
};
const addSiteCallback = () => {
    siteValue.value = {
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
const rules = {
    site: { required: true, message: '域名不可为空' },
    handleAccount: { required: true, message: '域名不可为空' },
    handlePasswd: { required: true, message: '域名不可为空' },
};
const getSiteList = () => {
    chrome.runtime.sendMessage({ event: 'getSiteList', data: null }, async (data) => {
        if (data && data?.siteList.length) {
            console.log(data.siteList);
            dataList.value = data?.siteList;
        }
    });
};

const submitDelCallback = () => {
    if (delRow.value) {
        chrome.runtime.sendMessage({ event: 'delSiteList', data: delRow.value }, async (response) => {
            if (response) {
                message.success('删除成功');
                getSiteList();
            }
        });
    }
};

const cancelDelCallback = () => {
    delRow.value = null;
    showDelModal.value = false;
};

getSiteList();
</script>

<template>
    <!--    <Layout>-->
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
            <n-form ref="formRef" :model="siteValue" :rules="rules" size="small" label-placement="top">
                <n-form-item label="域名" path="site">
                    <n-input v-model:value="siteValue.site" placeholder="请填写域名，如：www.baidu.com" />
                </n-form-item>
                <n-form-item label="显示标记">
                    <n-switch v-model:value="siteValue.badgeBool">
                        <template #checked>显示</template>
                        <template #unchecked>隐藏</template>
                    </n-switch>
                </n-form-item>
                <template v-if="siteValue.badgeBool">
                    <n-form-item label="标记文字">
                        <n-input v-model:value="siteValue.badgeText" placeholder="显示在标记上的文字,不要超过两个汉字或4个字母" />
                    </n-form-item>
                    <n-form-item label="标记颜色">
                        <n-color-picker
                            v-model:value="siteValue.badgeColor"
                            :show-alpha="true"
                            :modes="['hex']"
                            :swatches="['#18A058', '#2080F0', '#F0A020', '#D03050FF']"
                        />
                    </n-form-item>
                </template>
                <n-form-item label="显示边框">
                    <n-switch v-model:value="siteValue.boxBool">
                        <template #checked>显示</template>
                        <template #unchecked>隐藏</template>
                    </n-switch>
                </n-form-item>
                <n-form-item label="边框颜色" v-if="siteValue.boxBool">
                    <n-color-picker
                        v-model:value="siteValue.boxColor"
                        :show-alpha="true"
                        :modes="['hex']"
                        :swatches="['#18A058', '#2080F0', '#F0A020', '#D03050FF']"
                    />
                </n-form-item>
                <n-form-item label="是否自动填充">
                    <n-switch v-model:value="siteValue.fillBool">
                        <template #checked>是</template>
                        <template #unchecked>否</template>
                    </n-switch>
                </n-form-item>
                <template v-if="siteValue.fillBool">
                    <n-form-item label="用户名">
                        <n-input v-model:value="siteValue.fillAccount" placeholder="需要自动填充的用户名" />
                    </n-form-item>
                    <n-form-item label="密码">
                        <n-input v-model:value="siteValue.fillPasswd" placeholder="需要自动填充的密码" />
                    </n-form-item>
                    <n-form-item label="手动修正选择器">
                        <n-switch v-model:value="siteValue.handleBool">
                            <template #checked>是</template>
                            <template #unchecked>否</template>
                        </n-switch>
                    </n-form-item>
                    <template v-if="siteValue.handleBool">
                        <n-form-item label="用户名选择器" path="handleAccount">
                            <n-input v-model:value="siteValue.handleAccount" placeholder="当系统自动识别的填充元素不准确时，自定义一个选择器" />
                        </n-form-item>
                        <n-form-item label="密码选择器" path="handlePasswd">
                            <n-input v-model:value="siteValue.handlePasswd" placeholder="当系统自动识别的填充元素不准确时，自定义一个选择器" />
                        </n-form-item>
                    </template>
                </template>
            </n-form>
        </n-card>
    </n-modal>
    <n-modal
        v-model:show="showDelModal"
        preset="dialog"
        title="确认"
        content="确认要删除这条记录吗？🤔"
        positive-text="确认"
        negative-text="放弃"
        @positive-click="submitDelCallback"
        @negative-click="cancelDelCallback"
    />
    <!--    </Layout>-->
</template>

<style scoped lang="scss"></style>
