/*
  mock 用户功能
*/
import api from '@/utils/api';

// 修改反馈页用户cookie，并自动刷新
export const content = async function () {
    api.onMessage('server:fetch-iframe-src', async ({ data, sender }: any) => {
        return { src: 'test.com/hello', host: 'test.com' };
    });
};
