import { cj, cc, removeUserSelectEvent, closeLoginModalEvent } from './util';
(window as any).cj = cj || function () {};
(window as any).cc = cc || function () {};
removeUserSelectEvent();
closeLoginModalEvent();
