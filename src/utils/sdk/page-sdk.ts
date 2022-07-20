// import PageExtensionSDK from './sdk-base';
import { cj, cc, removeUserSelectEvent } from './util';
// (window as any).PageExtensionSDK = new PageExtensionSDK({ self: 'page', other: 'content' });
(window as any).cj = cj || function () {};
(window as any).cc = cc || function () {};
removeUserSelectEvent();
(window as any).addEventListener('load', function () {
    const body = document.body;
    let s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src', chrome.runtime.getURL('sdk.js'));
    body.appendChild(s);
});
// injectBox();
