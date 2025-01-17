import { cj, cc, removeUserSelectEvent, closeLoginModalEvent, closeAdMask, set96ksheight, setJushuitanCardSize } from './util';
// eslint-disable-next-line @typescript-eslint/no-empty-function
(window as any).cj = cj || function () {};
// eslint-disable-next-line @typescript-eslint/no-empty-function
(window as any).cc = cc || function () {};
init();
function init() {
    removeUserSelectEvent();
    closeLoginModalEvent();
    closeAdMask();
    set96ksheight();
    setJushuitanCardSize();
}
