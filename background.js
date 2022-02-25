// background.js

chrome.runtime.onInstalled.addListener(() => {
    console.log('cookie clear extention loaded and waiting for cookies from medium.com and towardsdatascience.com');
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete' && tab.active) {

        const mediumArticlesRegex = /^https:\/\/([a-z0-9A-Z]+.|[a-z0-9A-Z]{0,0})(medium|towardsdatascience).com/;

        if(mediumArticlesRegex.test(tab.url) == false) return; 

        removeCookiesFromDomain("towardsdatascience.com");
        removeCookiesFromDomain("medium.com");
    
      }
    
});

function removeCookiesFromDomain(domain){
    chrome.cookies.getAll({domain}, (cookies) => {
        for (const i in cookies ) {
            cookie = cookies[i];
            console.log(cookie);
            const protocol = cookie.secure ? "https:" : "http:";
            const cookieUrl = `${protocol}//${cookie.domain}${cookie.path}`;
            chrome.cookies.remove({url: cookieUrl, name: cookie.name, storeId: cookie.storeId});
            console.log("removed cookie:"+cookie.name);
        }
    });
}
