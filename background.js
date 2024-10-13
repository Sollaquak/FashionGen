// import { checkKeyInJsonFile, checkAndWriteToJsonFile } from './json-operations';
// import { callGPT } from './gpt-call';

// import { checkAndWriteToJsonFile } from "./write-to-json";

// const JSON_FILE_PATH = './data/image-descs.json'

// Create the context menu
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "copyImageAddress",
        title: "Get Similar Sustainable Pieces",
        contexts: ["image"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "copyImageAddress" && info.srcUrl) {
        // Send a message with the image URL to the active tab
        chrome.tabs.sendMessage(tab.id, { action: "showImageUrl", imageUrl: info.srcUrl });
        chrome.action.openPopup();
        // const labels = genDescription(info.imageUrl)
        // print(labels)
    }
});

// const passToGPT = async (url) => {
// }