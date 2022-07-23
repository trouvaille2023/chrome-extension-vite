// import PageExtensionSDK from './sdk-base';
// import api from '@/utils/api';

// const pageExtensionSDK = new PageExtensionSDK({ self: 'content', other: 'page' });
// (window as any).pageExtensionSDK = PageExtensionSDK;

// 需要对接适配 chrome.runtime 和 window.postMessage
// chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
//     const { type, payload } = request;
//
//     if (!type.startsWith('page:')) {
//         return;
//     }
//
//     const res = await pageExtensionSDK.call(type, payload);
//
//     sendResponse({
//         data: res,
//     });
// });
//
// window.addEventListener('message', async (evt) => {
//     const { from, eventName, params, callback, status } = evt.data;
//     if (from !== `page:extension`) {
//         return;
//     }
//
//     // 返回
//     if (!['server:', 'popup:'].find((prefix) => eventName.startsWith(prefix))) {
//         return;
//     }
//
//     const res = await api.sendMessage(eventName, params);
//     window.postMessage(
//         {
//             from: 'content:extension',
//             status: 'res',
//             eventName,
//             params: res,
//             callback,
//         },
//         '*'
//     );
// });

// 负责加载 page-sdk 代码
(window as any).addEventListener('load', function () {
    const body = document.body;
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', chrome.runtime.getURL('sdk.js'));
    body.appendChild(s);
});
export default {};
