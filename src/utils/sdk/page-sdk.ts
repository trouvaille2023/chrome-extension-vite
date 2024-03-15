import { cj, cc, removeUserSelectEvent, closeLoginModalEvent, closeAdMask } from './util';
(window as any).cj = cj || function () {};
(window as any).cc = cc || function () {};
init();
function init() {
    removeUserSelectEvent();
    closeLoginModalEvent();
    closeAdMask();
}
