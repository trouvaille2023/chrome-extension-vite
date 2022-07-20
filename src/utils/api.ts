// 将 chrome.runtime.onMessage 封装为 Promise

type Handler = ({ data, sender }: { data: any; sender: chrome.runtime.MessageSender }) => any;

class API {
    handlers: { [key: string]: Handler } = {};

    constructor() {
        this.init();
    }

    init() {
        chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
            const { type, payload } = request;
            const handler = this.handlers[type];

            if (handler) {
                const res = await handler({
                    data: payload,
                    sender,
                });
                sendResponse({
                    data: res,
                });
            } else {
                sendResponse({ data: '没找到函数' });
            }

            // unless you return true from the event listener to indicate you wish to send a response asynchronously
            return true;
        });
    }

    sendMessage(messageName: string, data?: any) {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({ type: messageName, payload: data }, (response) => {
                resolve({
                    data: response,
                });
            });
        });
    }

    async sendTabMessage(messageName: string, data?: any) {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        return new Promise((resolve) => {
            chrome.tabs.sendMessage(tab.id as number, { type: messageName, payload: data }, (response) => {
                resolve({
                    data: response,
                });
            });
        });
    }

    onMessage(messageName: string, handler: Handler) {
        const handlers = this.handlers;
        handlers[messageName] = handler;
    }
}

export const api = new API();
export default api;
