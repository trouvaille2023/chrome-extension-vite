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
function initData(list) {
    // console.log('====-->', 'initData');

    chrome.storage.local.get(['siteList'], async (result) => {
        // if (Object.values(result).length) {
        //     console.count('siteList');
        //     let siteList = [];
        //     await chrome.storage.local.set({ siteList });
        // }
        if (result?.siteList) {
            let newList = [...result.siteList, ...list].reverse();
            newList = newList.reduce((pre, cur) => {
                if (!pre.some((i) => i.site === cur.site && i?.port === cur?.port)) {
                    pre.push({ ...cur, id: Date.now() + Math.random() * 10000 });
                }
                return pre;
            }, []);
            await chrome.storage.local.set({ siteList: newList });
        } else {
            await chrome.storage.local.set({
                siteList: list.map((i) => {
                    return { ...i, id: Date.now() + Math.random() * 10000 };
                }),
            });
        }
        return true;
    });
}

chrome.runtime.onInstalled.addListener(function (object) {
    if (object.reason === 'install') {
        console.log('====', 'Installed');
        initData([]);
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
                if (data.id) {
                    list = list.filter((sit) => sit.id !== data.id);
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
        case 'importSiteList':
            initData(data);
            callback(true);
            return true;
        case 'getGoodsList':
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'toGetGoodsList' });
            });
            callback(true);
            return true;
        case 'getAllGoodsList':
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { action: 'toGetAllGoodsList' });
            });

            callback(true);
            return true;
    }
    return true;
});

function initHandle(_, sendResponse) {
    // console.log('初始化数据');
    initData([]);
    sendResponse();
}

try {
    chrome.contextMenus.create(
        {
            type: 'normal',
            title: '批量打开编辑',
            id: 'performAction',
            contexts: ['all'],
        },
        (e) => {
            console.log(`彩蛋🥚🥚🥚 callback`);
        }
    );
    chrome.contextMenus.create(
        {
            type: 'normal',
            title: '过滤聚水潭小于300库存的',
            id: 'ignoreLittleStock',
            contexts: ['all'],
        },
        (e) => {
            console.log(`彩蛋🥚🥚🥚 callback`);
        }
    );
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //     setTimeout(() => {
    //         chrome.tabs.sendMessage(tabs[0].id, { message: 'Hello from background.js' });
    //     }, 3000);
    // });

    // 处理菜单项点击事件
    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId === 'performAction') {
            chrome.tabs.sendMessage(tab.id, { action: 'performAction' });
        }
        if (info.menuItemId === 'ignoreLittleStock') {
            chrome.tabs.sendMessage(tab.id, { action: 'ignoreLittleStock' });
        }
    });
    // 处理菜单项点击事件
    // chrome.contextMenus.onClicked.addListener(function (info, tab) {
    //     if (info.menuItemId === 'imgAction') {
    //         chrome.tabs.sendMessage(tab.id, { action: 'imgAction' });
    //     }
    // });
} catch (e) {
    console.error(e);
}

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
// chrome.contextMenus.onClicked.addListener(async (info, tab) => {
//     chrome.runtime.sendMessage({ event: 'easterEgg' }, () => {
//         return true;
//     });
// });
