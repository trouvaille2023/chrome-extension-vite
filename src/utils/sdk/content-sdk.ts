// 负责加载 page-sdk 代码
(window as any).addEventListener('load', function () {
    const body = document.body;
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', chrome.runtime.getURL('sdk.js'));
    body.appendChild(s);
});
export default {};
