let storage = chrome.storage.local;
let konosubaPath = "file:///C:/Users/Jeff%20Park/Documents/LightNovels/Kono%20Subarashii%20Sekai%20ni%20Shukufuku%20wo!%20[JP]/[%E6%9A%81%E3%81%AA%E3%81%A4%E3%82%81]%20%E3%81%93%E3%81%AE%E7%B4%A0%E6%99%B4%E3%82%89%E3%81%97%E3%81%84%E4%B8%96%E7%95%8C%E3%81%AB%E7%A5%9D%E7%A6%8F%E3%82%92%EF%BC%814/index.html";
let aobutaPath = "file:///C:/Users/Jeff%20Park/Documents/LightNovels/[%E9%B4%A8%E5%BF%97%E7%94%B0%E4%B8%80]%20%E9%9D%92%E6%98%A5%E3%83%96%E3%82%BF%E9%87%8E%E9%83%8E%201%20%E9%9D%92%E6%98%A5%E3%83%96%E3%82%BF%E9%87%8E%E9%83%8E%E3%81%AF%E3%83%90%E3%83%8B%E3%83%BC%E3%82%AC%E3%83%BC%E3%83%AB%E5%85%88%E8%BC%A9%E3%81%AE%E5%A4%A2%E3%82%92%E8%A6%8B%E3%81%AA%E3%81%84/index.html";

var timeObj = {};

let konosubaTotalKey = konosubaPath + "totalTime";
let konosubaCurrentKey = konosubaPath + "timeSpent";
let aobutaTotalKey = aobutaPath + "totalTime";
let aobutaCurrentKey = aobutaPath + "timeSpent";

let konosubaButton = document.getElementById('konosubaButton');
let konosubaTotalText = document.getElementById('konosubaTotalTime');
let konosubaCurrentText = document.getElementById('konosubaCurrentTime');

let aobutaButton = document.getElementById('aobutaButton');
let aobutaTotalText = document.getElementById('aobutaTotalTime');
let aobutaCurrentText = document.getElementById('aobutaCurrentTime');

let totalButton = document.getElementById('totalButton');

konosubaButton.onclick = () => onClick(konosubaPath);
aobutaButton.onclick = () => onClick(aobutaPath);
totalButton.onclick = () => {
    totalUpTimes(konosubaPath);
    totalUpTimes(aobutaPath);
};

chrome.storage.local.get(
    [konosubaCurrentKey, konosubaTotalKey, aobutaCurrentKey, aobutaTotalKey], (data) => {
        konosubaCurrentText.innerHTML = toMin(data[konosubaCurrentKey]);
        konosubaTotalText.innerHTML = toMin(data[konosubaTotalKey]);
        aobutaCurrentText.innerHTML = toMin(data[aobutaCurrentKey]);
        aobutaTotalText.innerHTML = toMin(data[aobutaTotalKey]);
});

function onClick(path) {
    let msg = {
        type: "Open File",
        path: path,
    };
    chrome.runtime.sendMessage(msg);
}

//Temporary until I learn React
chrome.storage.onChanged.addListener(function(changes, storageType){
    if(storageType === "local" && changes) {
        if(changes[konosubaCurrentKey]) {
            konosubaCurrentText.innerHTML = toMin(changes[konosubaCurrentKey].newValue);
        }
        if(changes[konosubaTotalKey]) {
            konosubaTotalText.innerHTML = toMin(changes[konosubaTotalKey].newValue);
        }

        if(changes[aobutaCurrentKey]) {
            aobutaCurrentText.innerHTML = toMin(changes[aobutaCurrentKey].newValue);
        }
        if(changes[aobutaTotalKey]) {
            aobutaTotalText.innerHTML = toMin(changes[aobutaTotalKey].newValue);
        }
    }
});

function toMin(secs) {
    return (secs / 60).toFixed(1);
}

function totalUpTimes(path) {
    let totalTimeSpentKey = path + "totalTime";
    let timeKey = path + "timeSpent";
    
    storage.get([timeKey, totalTimeSpentKey], (data) => {
        let totalTime = data[totalTimeSpentKey] || 0;
        let currentTime = data[timeKey];
        timeObj[timeKey] = 0;
        timeObj[totalTimeSpentKey] = totalTime + currentTime;
        storage.set(timeObj);
    });
}