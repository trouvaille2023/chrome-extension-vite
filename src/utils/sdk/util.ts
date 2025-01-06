export function cc() {
    // example lebron.util.consoleGroup([1,2,3],'jack',{name:'lucy'})
    if (arguments.length === 0) {
        return;
    }
    for (let p in arguments) {
        console.group(arguments[p]);
    }
    for (let p in arguments) {
        console.groupEnd();
    }
}

// 显示json的具体属性
export function cj() {
    if (arguments.length === 0) {
        return;
    }
    for (let p in arguments) {
        console.log(JSON.parse(JSON.stringify(arguments[p])));
    }
}

/**
 * 移除CSDN的禁止复制功能
 * 展开CSDN折叠的代码
 */
export async function removeUserSelectEvent() {
    try {
        if (window.location.hostname.indexOf('ibtool.cn') < 0) {
            if (window.location.hostname.indexOf('blog.csdn.net') > -1) {
                for (let i = 0; i < 100; i++) {
                    [...(document.querySelectorAll('#content_views pre') as any)].forEach((el) => {
                        el.style.userSelect = 'unset';
                    });
                    [...(document.querySelectorAll('#content_views pre code') as any)].forEach((el) => {
                        el.style.userSelect = 'unset';
                    });
                    [...(document.querySelectorAll('.look-more-preCode') as any)].map((i) => i.click());
                    await sleep(100);
                }
            }
            for (let i = 0; i < 100; i++) {
                [...(document.querySelectorAll('*') as any)].forEach((el) => {
                    el.style.userSelect = 'unset';
                });
                await sleep(100);
            }
        }
    } catch (e) {
        console.info('插件报错，不用管', e);
    }
}

/**
 * 移除CSDN的禁止复制功能
 * 展开CSDN折叠的代码
 */
export async function closeLoginModalEvent() {
    try {
        if (window.location.hostname.indexOf('zhihu.com') > -1) {
            for (let i = 0; i < 30; i++) {
                const ele = document.querySelector('div.Modal.Modal--default.signFlowModal > button.Modal-closeButton');
                if (ele instanceof HTMLButtonElement) {
                    ele.click();
                    return;
                }
                await sleep(100);
            }
        }
    } catch (e) {
        console.info('插件报错，不用管', e);
    }
}

/**
 * 去除Adblock的遮罩
 */
export async function closeAdMask() {
    try {
        if (window.location.hostname.indexOf('supercloudsms.com') > -1) {
            for (let index = 0; index < 50; index++) {
                try {
                    const el = document.querySelector('#adb-mask');
                    if (el) {
                        el.remove();
                        return;
                    }
                    await sleep(1000);
                } catch (e) {
                    console.info('插件报错，不用管', e);
                }
            }
        }
    } catch (e) {
        console.info('插件报错，不用管', e);
    }
}

export async function sleep(ms: number) {
    return new Promise<void>((resove) => {
        setTimeout(() => {
            resove();
        }, ms);
    });
}

/**
 *
 */
export async function set96ksheight() {
    try {
        await sleep(300);
        if (window.location.href.indexOf('59ds.com/goodsDetail') > -1 || window.location.href.indexOf('96ds.com/goodsDetail') > -1) {
            try {
                (document.querySelector('.edit-spec > div:nth-child(2) > div:nth-child(2)') as HTMLDivElement).style.maxHeight = '';
            } catch (e) {
                console.info('插件报错，不用管', e);
            }
        }
    } catch (e) {
        console.info('插件报错，不用管', e);
    }
}
