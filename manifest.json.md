```json5
{
  name: "Martin", //插件名字
  description: "A Extension for Google Chrome.", //插件描述，会显示在Chrome扩展程序卡片中
  version: "1.0.0", //插件版本号
  manifest_version: 3, //manifest版本号，最新为3
  permissions: [
    "storage",
    "tabs",
    "cookies",
    "notifications",
    "declarativeContent",
    "scripting",
  ],
  background: {
    service_worker: "background.js",
    type: "module",
  },
  host_permissions: ["*://*/*"],
  homepage_url: "https://test.com",
  content_security_policy: {
    extension_pages: "script-src 'self'; object-src 'self'",
  },
  action: {
    default_title: "Martin",
    default_icon: "icon128.png",
    default_popup: "popup.html",
  },
  icons: {
    "16": "icon128.png",
    "48": "icon128.png",
    "128": "icon128.png",
  },
  content_scripts: [
    {
      matches: ["<all_urls>"],
      js: ["content.js"],
      run_at: "document_end",
    },
  ],
  web_accessible_resources: [
    {
      resources: ["sdk.js"],
      matches: ["<all_urls>"],
    },
  ]
}
```
