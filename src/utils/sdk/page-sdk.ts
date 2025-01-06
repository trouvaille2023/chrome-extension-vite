import {cj, cc, removeUserSelectEvent, closeLoginModalEvent, closeAdMask, set96ksheight} from './util';
(window as any).cj = cj || function () {};
(window as any).cc = cc || function () {};
init();
function init() {
    removeUserSelectEvent();
    closeLoginModalEvent();
    closeAdMask();
    set96ksheight()
}
