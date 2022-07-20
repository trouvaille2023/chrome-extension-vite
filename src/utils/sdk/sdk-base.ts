/* 嵌入，共有四种隔离域
    page: 前台页面
    content: content script
    server: background
    popup: popup.html
*/

export default class PageExtensionSDK {
    handlers: { [key: string]: Function } = {};
    callbacks: { [key: string]: Function } = {};
    private self = '';
    private other = '';

    constructor({ self, other }: { self: string; other: string }) {
        this.self = self;
        this.other = other;
        this.init();
    }

    get selfKey() {
        return `${this.self}:extension`;
    }
    get otherKey() {
        return `${this.other}:extension`;
    }

    private init = () => {
        window.addEventListener('message', async (evt) => {
            const { selfKey, otherKey } = this;
            const { from, eventName, params, callback, status } = evt.data;
            if (from !== otherKey) {
                return;
            }

            // 返回
            if (status === 'res') {
                return this.callbacks[callback]?.(params);
            }

            // 请求, 必须使用和我相符的域
            if (!eventName.startsWith(this.self)) {
                return;
            }
            const handler = this.handlers[eventName];
            const res = await handler?.(params);

            // response
            window.postMessage(
                {
                    from: selfKey,
                    status: 'res',
                    eventName,
                    params: res,
                    callback,
                },
                '*'
            );
        });
    };

    on = async (eventName: string, handler: Function) => {
        this.handlers[eventName] = handler;
    };

    call = async (eventName: string, params: any) => {
        const { callbacks } = this;
        const callback = `hytest_extension_${Date.now()}`;
        window.postMessage(
            {
                from: this.selfKey,
                status: 'req',
                eventName,
                params,
                callback,
            },
            '*'
        );

        return new Promise((resolve) => {
            callbacks[callback] = function (res: any) {
                delete callbacks[callback];
                resolve(res);
            };
        });
    };
}
