export async function injectBox() {
    try {
        chrome.runtime.sendMessage({ event: 'getSiteList', data: null }, async (data) => {
            if (data && data?.siteList.length) {
                generateBox({ siteList: data.siteList });
            }
        });
    } catch (e) {
        console.info('插件报错，不用管', e);
    }
}

/**
 * 自动填充用户名密码
 * @param site
 * @param account
 * @param passwd
 */
function autoCompleteLogin(site: string, account: string, passwd: string): void {
    if (site === location.hostname && /\/login/gi.test(location.pathname)) {
        const username: Exclude<Element, null> & { value: string } = document.querySelector('input[name="username"]') as Element & { value: string };
        const password: Exclude<Element, null> & { value: string } = document.querySelector('input[name="password"]') as Element & { value: string };
        if (username && password) {
            username.value = account;
            username.dispatchEvent(new Event('input'));
            password.value = passwd;
            password.dispatchEvent(new Event('input'));
        }
    }
}

function setPosttion(x: number, ax: number, y: number, ay: number, ontextflaghander: HTMLElement) {
    let ofw = document.body.offsetWidth,
        ofh = document.body.offsetHeight;

    if (x >= ofw - 46) ax = ofw - 46;

    if (x <= 0) ax = 6;

    if (y > ofh - 46) ay = ofh - 46;

    if (y <= 0) ay = 6;

    ontextflaghander.style.top = ay + 'px';
    ontextflaghander.style.left = ax + 'px';
}

function generateBox({ siteList }: any) {
    let host = location.hostname;
    for (const siteObj of siteList) {
        if (host === 'localhost') {
            autoCompleteLogin('localhost', '15818787099', 'Ab123456789');
        }
        if (siteObj.site !== host) {
            continue;
        }
        let htmlDivElement = document.createElement('div');

        // const { siteList } = await chrome.storage.local.get(['siteList']);
        // const { bgColorObject } = await chrome.storage.local.get(['bgColorObject']);

        // autoCompleteLogin(siteObj.site, '15818787099', 'Ab123456789');
        // const bgo = bgColorObject[item.target];
        let bc = siteObj?.boxColor || '#FF00007F';
        let bgc = siteObj?.badgeColor || '#FF0000CC';
        let txt = siteObj?.text || '生产';

        htmlDivElement.setAttribute('id', 'ontextflag');
        htmlDivElement.setAttribute(
            'style',
            'width: 100vw;height: 100vh;border: 6px solid transparent;box-sizing: border-box;position: fixed;top: 0;left: 0;z-index: 999999999;pointer-events: none;'
        );
        htmlDivElement.style.borderColor = bc;
        document.body?.appendChild(htmlDivElement);

        let subHtmlDivElement = document.createElement('div');
        subHtmlDivElement.setAttribute('id', 'ontextflaghander');
        subHtmlDivElement.setAttribute('draggable', 'true');
        subHtmlDivElement.setAttribute(
            'style',
            ' width: 40px;height: 40px;background-color: red;border-radius: 50%;position: absolute;top: 30px;right: 30px;line-height: 40px;text-align: center;color: white;cursor: move;pointer-events: all;user-select: none;font-size: 14px;'
        );
        htmlDivElement.appendChild(subHtmlDivElement);

        if (!subHtmlDivElement) return;
        subHtmlDivElement.innerText = txt;
        subHtmlDivElement.style.backgroundColor = bgc;

        subHtmlDivElement.ondrag = (args) => {
            const { x, y } = args;
            subHtmlDivElement.style.display = 'none';
            subHtmlDivElement.style.top = y - 20 + 'px';
            subHtmlDivElement.style.left = x - 20 + 'px';
        };

        subHtmlDivElement.ondragend = async (args) => {
            const { x, y } = args;
            let ax = x,
                ay = y;
            subHtmlDivElement.style.display = 'unset';
            setPosttion(x, ax, y, ay, subHtmlDivElement);
            chrome.runtime.sendMessage({ event: 'setFlagHostListPosition', data: { flagHostListPosition: [ax, ay] } }, async (data) => {
                console.log(data);
            });
        };

        chrome.runtime.sendMessage({ event: 'getFlagHostListPosition', data: null }, async (pos) => {
            if (Object.values(pos).length && pos?.flagHostListPosition) {
                let [x, y] = pos.flagHostListPosition;
                let ax = x,
                    ay = y;
                const onTextFlagHandler = document.getElementById('ontextflaghander');
                if (onTextFlagHandler && x && y) {
                    setPosttion(x, ax, y, ay, onTextFlagHandler);
                }
            }
        });
    }
}
