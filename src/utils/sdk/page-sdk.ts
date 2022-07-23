// import PageExtensionSDK from './sdk-base';
import { cj, cc, removeUserSelectEvent } from './util';
// (window as any).PageExtensionSDK = new PageExtensionSDK({ self: 'page', other: 'content' });
(window as any).cj = cj || function () {};
(window as any).cc = cc || function () {};
removeUserSelectEvent();
// injectBox();
