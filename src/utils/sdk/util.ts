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
export function removeUserSelectEvent() {
    try {
        if (window.location.hostname === 'blog.csdn.net') {
            [...(document.querySelectorAll('#content_views pre') as any)].forEach((el) => {
                el.style.userSelect = 'unset';
            });
            [...(document.querySelectorAll('#content_views pre code') as any)].forEach((el) => {
                el.style.userSelect = 'unset';
            });
            setTimeout(() => {
                [...(document.querySelectorAll('.look-more-preCode') as any)].map((i) => i.click());
            }, 3000);
        }
    } catch (e) {
        console.info('插件报错，不用管', e);
    }
}
