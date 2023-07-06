export async function injectBox() {
    try {
        chrome.runtime.sendMessage({ event: 'getSiteList', data: null }, async (data) => {
            if (data && data?.siteList.length) {
                generateBox({ siteList: data.siteList });
            }
        });
        await getContextMenuListener();
    } catch (e) {
        console.info('插件报错，不用管', e);
    }
}

/**
 * 自动填充用户名密码
 * @param siteObj
 */
function autoCompleteLogin(siteObj: ModelType): void {
    if (siteObj.port === undefined || siteObj.port === null) {
        siteObj.port = '';
    }
    if (siteObj.site === location.hostname && siteObj.port === location.port && /\/login/gi.test(location.pathname)) {
        let username: Exclude<Element, null> & { value: string } = document.querySelector('input[name="username"]') as Element & { value: string };
        let password: Exclude<Element, null> & { value: string } = document.querySelector('input[name="password"]') as Element & { value: string };
        //如果需要手动修正元素选择器
        if (siteObj.handleBool) {
            username = document.querySelector(siteObj.handleAccount) as Element & { value: string };
            password = document.querySelector(siteObj.handlePasswd) as Element & { value: string };
        }

        if (username && password) {
            username.value = siteObj.fillAccount;
            username.dispatchEvent(new Event('input'));
            password.value = siteObj.fillPasswd;
            password.dispatchEvent(new Event('input'));
        }
    }
}

/**
 * 保存标记位置
 * @param x
 * @param ax
 * @param y
 * @param ay
 * @param ontextflaghander
 */
function setPosition(x: number, ax: number, y: number, ay: number, ontextflaghander: HTMLElement) {
    let ofw = document.body.offsetWidth,
        ofh = document.body.offsetHeight;

    if (x >= ofw - 46) ax = ofw - 46;

    if (x <= 0) ax = 6;

    if (y > ofh - 46) ay = ofh - 46;

    if (y <= 0) ay = 6;

    ontextflaghander.style.top = ay + 'px';
    ontextflaghander.style.left = ax + 'px';
}

/**
 * 创建边框、标记方法
 * @param siteList
 */
function generateBox({ siteList }: { siteList: ModelType[] }) {
    let host = location.hostname;
    for (const siteObj of siteList) {
        if (siteObj.site !== host) {
            continue;
        }
        let htmlDivElement = document.createElement('div');

        // 是否添加边框
        if (siteObj.boxBool) {
            htmlDivElement.setAttribute('id', 'ontextflag');
            htmlDivElement.setAttribute(
                'style',
                `width: 100vw;height: 100vh;border: 6px solid transparent;box-sizing: border-box;position: fixed;top: 0;left: 0;z-index: 999999999;pointer-events: none;`
            );
            htmlDivElement.style.borderColor = siteObj.boxColor;
            document.body?.appendChild(htmlDivElement);
        }
        // 是否添加标记
        if (siteObj.badgeBool) {
            let subHtmlDivElement = document.createElement('div');
            subHtmlDivElement.setAttribute('id', 'ontextflaghander');
            subHtmlDivElement.setAttribute('draggable', 'true');
            subHtmlDivElement.setAttribute(
                'style',
                ' width: 40px;height: 40px;background-color: red;border-radius: 50%;position: absolute;top: 30px;right: 30px;line-height: 40px;text-align: center;color: white;cursor: move;pointer-events: all;user-select: none;font-size: 14px;'
            );
            htmlDivElement.appendChild(subHtmlDivElement);

            if (!subHtmlDivElement) return;
            subHtmlDivElement.innerText = siteObj.badgeText;
            subHtmlDivElement.style.backgroundColor = siteObj.badgeColor;

            chrome.runtime.sendMessage({ event: 'getFlagHostListPosition', data: null }, async (pos) => {
                if (Object.values(pos).length && pos?.flagHostListPosition) {
                    let [x, y] = pos.flagHostListPosition;
                    let ax = x,
                        ay = y;
                    const onTextFlagHandler = document.getElementById('ontextflaghander');
                    if (onTextFlagHandler && x && y) {
                        setPosition(x, ax, y, ay, onTextFlagHandler);
                    }
                }
            });
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
                setPosition(x, ax, y, ay, subHtmlDivElement);
                chrome.runtime.sendMessage(
                    {
                        event: 'setFlagHostListPosition',
                        data: { flagHostListPosition: [ax, ay] },
                    },
                    async (data) => {}
                );
            };
        }
        // 是否自动填充用户名密码
        if (siteObj.fillBool) {
            autoCompleteLogin(siteObj);
        }
    }
}

type ModelType = {
    id: number; //id
    site: string; //网址
    port: string; //网址
    badgeBool: boolean; //显示标记
    badgeText: string; //标记文字
    badgeColor: string; //标记颜色
    boxBool: boolean; //显示边框
    boxColor: string; //边框颜色
    fillBool: boolean; //自动填充
    fillAccount: string; //填充用的用户名
    fillPasswd: string; //填充用的密码
    handleBool: boolean; //是否手动修正选择器
    handleAccount: string; //用户名选择器
    handlePasswd: string; //密码选择器
};

/**
 * 判断右键时是否激活自动填充菜单
 */
async function getContextMenuListener() {
    await chrome.runtime.onMessage.addListener(function ({ event, data }, sender, callback) {
        switch (event) {
            case 'easterEgg':
                console.log(`💐💐💐💐💐💐`);
                alert('💐💐💐💐💐💐');
                break;
        }
        return true;
    });
}

export function initPageEvent() {
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        if (message.action === 'performAction') {
            getGoodsList();
        }
        if (message.action === 'toGetGoodsList') {
            getGoodsList();
        }
        if (message.action === 'toGetAllGoodsList') {
            getAllGoodsList();
        }
    });
}

function getGoodsList() {
    let formattedDate = getFormattedDate();
    let shops = [];
    let goods = document.querySelectorAll(`.goods-list.shop-list > ul > li`) as any;
    for (let item of goods) {
        if (item.querySelector('.stall-recommend') && item.querySelector('.stall-recommend').parentElement.querySelector('a').href) {
            shops.push(item.querySelector('.stall-recommend').parentElement.querySelector('a').href);
        }
    }
    console.clear();
    console.log(shops.length);
    let dname = (document.querySelector(`.slzz-stall-head-name a:first-child, .stall-head-name a:first-child h1`) as any).innerText;
    if (!shops.length) {
        return alert('没有抓取到商品');
    }
    saveFile(shops.join('\n') + '\n', `${formattedDate}-${dname}`);
}

function getAllGoodsList() {
    let formattedDate = getFormattedDate();
    let shops = [];
    let goods = document.querySelectorAll(`.goods-list.shop-list > ul > li`) as any;
    for (let item of goods) {
        shops.push(item.querySelector('a').href);
    }
    console.clear();
    console.log(shops.length);
    let dname = (document.querySelector(`.slzz-stall-head-name a:first-child, .stall-head-name a:first-child h1`) as any).innerText;
    if (!shops.length) {
        return alert('没有抓取到商品');
    }
    saveFile(shops.join('\n') + '\n', `${formattedDate}-${dname}`);
}

function saveFile(data: string, filename: string) {
    if (!data) {
        console.error('Console.save: No data');
        return;
    }

    if (!filename) filename = `${filename}.txt`;

    if (typeof data === 'object') {
        data = JSON.stringify(data, undefined, 4);
    }

    let blob = new Blob([data], { type: 'text/plain' }),
        e = document.createEvent('MouseEvents'),
        a = document.createElement('a');

    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
    e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    a.dispatchEvent(e);
}

function getFormattedDate() {
    let currentDate = new Date();
    let year = currentDate.getFullYear();
    let month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    let day = currentDate.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}
