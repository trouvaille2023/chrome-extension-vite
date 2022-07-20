function initData() {
    console.log('====-->', 'initData');

    chrome.storage.local.get(['siteList'], async (result) => {
        if (!Object.values(result).length) {
            console.count('siteList');
            let siteList = [
                { site: 'saas.ibtool.cn', target: 'pro', default: true, boxColor: '#FF00007F', badgeColor: '#FF0000CC', text: 'PROD' },
                { site: 'client.ibtool.cn', target: 'pro', default: true, boxColor: '#FF00007F', badgeColor: '#FF0000CC', text: 'PROD' },
                { site: 'saas.dev.ibtool.cn', target: 'dev', default: true, boxColor: '#00FF883A', badgeColor: '#00FF00CC', text: 'DEV' },
                { site: 'saas.sit.ibtool.cn', target: 'sit', default: true, boxColor: '#5900FF3E', badgeColor: '#5900FFCC', text: 'SIT' },
                { site: 'saas.client.dev.ibtool.cn', target: 'dev', default: true, boxColor: '#00FF883A', badgeColor: '#00FF00CC', text: 'DEV' },
                { site: 'saas.client.sit.ibtool.cn', target: 'sit', default: true, boxColor: '#5900FF3E', badgeColor: '#5900FFCC', text: 'SIT' },
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
                    list.push(data);
                } else {
                    list = [];
                }
                chrome.storage.local.set({ siteList: list }, async () => {
                    callback('success');
                    return true;
                });

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
    }
    return true;
});

function initHandle(_, sendResponse) {
    console.log('初始化数据');
    initData();
    sendResponse();
}
