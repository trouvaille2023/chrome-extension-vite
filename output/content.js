function t(t){if(void 0!==t.port&&null!==t.port||(t.port=""),t.site===location.hostname&&t.port===location.port&&/\/login/gi.test(location.pathname)){let e=document.querySelector('input[name="username"]'),o=document.querySelector('input[name="password"]');t.handleBool&&(e=document.querySelector(t.handleAccount),o=document.querySelector(t.handlePasswd)),e&&o&&(e.value=t.fillAccount,e.dispatchEvent(new Event("input")),o.value=t.fillPasswd,o.dispatchEvent(new Event("input")))}}function e(t,e,o,n,i){let s=document.body.offsetWidth,a=document.body.offsetHeight;t>=s-46&&(e=s-46),t<=0&&(e=6),o>a-46&&(n=a-46),o<=0&&(n=6),i.style.top=n+"px",i.style.left=e+"px"}function o(t,e={}){const o={duration:3e3,animationDuration:500,backgroundColor:"#333",textColor:"#fff",...e},n=document.createElement("div");n.className="toast",n.style.position="fixed",n.style.top="120px",n.style.left="50%",n.style.transform="translateX(-50%)",n.style.backgroundColor="#28a745",n.style.color="#fff",n.style.padding="10px 20px",n.style.borderRadius="5px",n.style.boxShadow="0 2px 10px rgba(0, 0, 0, 0.1)",n.style.zIndex="1000",n.style.opacity="0",n.style.transition="opacity 0.3s ease-in-out",n.style.backgroundColor=o.backgroundColor,n.style.color=o.textColor,n.textContent=t,document.body.appendChild(n),setTimeout((()=>{n.style.opacity="1"}),50),setTimeout((()=>{n.style.opacity="0",setTimeout((()=>{n.parentNode&&n.parentNode.removeChild(n)}),o.animationDuration)}),o.duration)}window.addEventListener("load",(function(){const t=document.body;var e=document.createElement("script");e.setAttribute("type","text/javascript"),e.setAttribute("src",chrome.runtime.getURL("sdk.js")),t.appendChild(e)})),async function(){try{chrome.runtime.sendMessage({event:"getSiteList",data:null},(async o=>{o&&(null==o?void 0:o.siteList.length)&&function({siteList:o}){var n;let i=location.hostname;for(const s of o){if(s.site!==i)continue;let o=document.createElement("div");if(s.boxBool&&(o.setAttribute("id","ontextflag"),o.setAttribute("style","width: 100vw;height: 100vh;border: 6px solid transparent;box-sizing: border-box;position: fixed;top: 0;left: 0;z-index: 999999999;pointer-events: none;"),o.style.borderColor=s.boxColor,null==(n=document.body)||n.appendChild(o)),s.badgeBool){let t=document.createElement("div");if(t.setAttribute("id","ontextflaghander"),t.setAttribute("draggable","true"),t.setAttribute("style"," width: 40px;height: 40px;background-color: red;border-radius: 50%;position: absolute;top: 30px;right: 30px;line-height: 40px;text-align: center;color: white;cursor: move;pointer-events: all;user-select: none;font-size: 14px;"),o.appendChild(t),!t)return;t.innerText=s.badgeText,t.style.backgroundColor=s.badgeColor,chrome.runtime.sendMessage({event:"getFlagHostListPosition",data:null},(async t=>{if(Object.values(t).length&&(null==t?void 0:t.flagHostListPosition)){let[o,n]=t.flagHostListPosition,i=o,s=n;const a=document.getElementById("ontextflaghander");a&&o&&n&&e(o,i,n,s,a)}})),t.ondrag=e=>{const{x:o,y:n}=e;t.style.display="none",t.style.top=n-20+"px",t.style.left=o-20+"px"},t.ondragend=async o=>{const{x:n,y:i}=o;let s=n,a=i;t.style.display="unset",e(n,s,i,a,t),chrome.runtime.sendMessage({event:"setFlagHostListPosition",data:{flagHostListPosition:[s,a]}},(async t=>{}))}}s.fillBool&&t(s)}}({siteList:o.siteList})})),await async function(){await chrome.runtime.onMessage.addListener((function({event:t,data:e},o,n){if("easterEgg"===t)console.log("💐💐💐💐💐💐");return!0}))}()}catch(o){console.info("插件报错，不用管",o)}}(),chrome.runtime.onMessage.addListener((function(t,e,n){"performAction"===t.action&&[...document.querySelectorAll('span[data-btm="d63429"]')].forEach((t=>{t.click()})),"ignoreLittleStock"===t.action&&function(){try{let t=document.querySelectorAll("#fxzzGoodsListBox .ant-spin-container >.ant-row > div");for(let e of t)+e.querySelector(".antd-pro-components-goods-list-components-item-index-num").textContent<300&&e.querySelector(".ant-checkbox-wrapper-checked.antd-pro-components-goods-list-index-checkbox .ant-checkbox-checked .ant-checkbox-input").click();o("操作成功",{duration:1e3,backgroundColor:"#28a745",textColor:"#fff"})}catch(t){o("操作失败",{duration:1e3,backgroundColor:"#28a745",textColor:"#fff"}),console.info("插件报错，不用管",t)}}(),"batchClickUnreadMessage"===t.action&&function(){try{let t=document.querySelectorAll("div[class^=messageContainer] .auxo-checkbox-input");for(const e of t)e.click();o("操作成功")}catch(t){console.info("插件报错，不用管",t)}}()}));
