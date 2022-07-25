// type ModelType = {
//     id: number, //id
//     site: string, //网址
//     badgeBool: boolean, //显示标记
//     badgeText: string, //标记文字
//     badgeColor: string, //标记颜色
//     boxBool: boolean, //显示边框
//     boxColor: string, //边框颜色
//     fillBool: boolean, //自动填充
//     fillAccount: string, //填充用的用户名
//     fillPasswd: string, //填充用的密码
//     handleBool: boolean, //是否手动修正选择器
//     handleAccount: string, //用户名选择器
//     handlePasswd: string, //密码选择器
// };
function initData() {
    console.log('====-->', 'initData');

    chrome.storage.local.get(['siteList'], async (result) => {
        if (!Object.values(result).length) {
            console.count('siteList');
            let siteList = [
                {
                    id: Date.now(),
                    site: 'localhost',
                    badgeBool: true,
                    badgeText: '本地',
                    badgeColor: '#18A058',
                    boxBool: true,
                    boxColor: '#18A058',
                    fillBool: true,
                    fillAccount: '13800138000',
                    fillPasswd: '123456',
                    handleBool: false,
                    handleAccount: '',
                    handlePasswd: '',
                },
                {
                    id: Date.now() + 1000,
                    site: '127.0.0.1',
                    badgeBool: true,
                    badgeText: '本地',
                    badgeColor: '#18A058',
                    boxBool: true,
                    boxColor: '#18A058',
                    fillBool: true,
                    fillAccount: '13800138000',
                    fillPasswd: '123456',
                    handleBool: false,
                    handleAccount: '',
                    handlePasswd: '',
                },
            ];
            await chrome.storage.local.set({ siteList });
        }
    });
}

chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === 'install') {
        console.log('====', 'Installed');
        initData();
    }
});

chrome.runtime.onUpdateAvailable.addListener(function (object) {
    console.log('插件有新的版本了');
});

chrome.runtime.onMessage.addListener(function ({ event, data }, sender, callback) {
    // console.log(msg, _, sendResponse)
    switch (event) {
        case 'initAction':
            initHandle(sender, callback);
            break;
        case 'getSiteList':
            chrome.storage.local.get(['siteList'], async (siteList) => {
                callback(siteList);
                return true;
            });
            return true;
        case 'setSiteList':
            chrome.storage.local.get(['siteList'], async (siteList) => {
                let list = siteList.siteList;
                if (list) {
                    if (list.some((i) => i?.id === data.id)) {
                        list.forEach((item, index) => {
                            if (item.id === data.id) {
                                list.splice(index, 1, data);
                            }
                        });
                    } else {
                        list.push(data);
                    }
                } else {
                    list = [data];
                }
                chrome.storage.local.set({ siteList: list }, async () => {
                    callback('success');
                    return true;
                });

                return true;
            });

            return true;
        case 'delSiteList':
            chrome.storage.local.get(['siteList'], async (siteList) => {
                let list = siteList.siteList;
                if (data.site) {
                    list = list.filter((sit) => sit.site !== data.site);
                    chrome.storage.local.set({ siteList: list }, async () => {
                        callback('success');
                        return true;
                    });
                } else {
                    callback('fail');
                    return true;
                }

                return true;
            });

            return true;
        case 'setFlagHostListPosition':
            chrome.storage.local.set(data, async () => {
                callback('存储成功');
                return true;
            });
            return true;
        case 'getFlagHostListPosition':
            chrome.storage.local.get(['flagHostListPosition'], (pos) => {
                callback(pos);
                return true;
            });
            return true;
        case 'onlyAutoFill':
            // createContextMenus();
            return true;
    }
    return true;
});

function initHandle(_, sendResponse) {
    console.log('初始化数据');
    initData();
    sendResponse();
}

try {
    chrome.contextMenus.create(
        {
            type: 'normal',
            title: '就是个彩蛋🥚🥚🥚',
            id: 'fillAccountAndPassword',
            contexts: ['all'],
        },
        (e) => {}
    );
} catch (e) {}

// chrome.contextMenus.create(
//     {
//         type: 'normal',
//         title: '立即填充用户名和密码',
//         id: 'fillAccountAndPassword',
//         contexts: ['all'],
//     },
//     (e) => {}
// );
//
// console.log(chrome.contextMenus);
//
chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    // debugger;
    // chrome.runtime.sendMessage({ event: 'easterEgg' }, () => {
    //     return true;
    // });
});
