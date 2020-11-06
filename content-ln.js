let storage = chrome.storage.local;
let scrollPosKey = location.href.trim() + "scrollPos";
let timeKey = location.href.trim() + "timeSpent";
var timeObj = {};


// (async function() {
//     var yesterday = await storage.get('yesterday', (x) => x);
//     var today = await storage.get('today', (x) => x) || getTodayDate();

//     if(getTodayDate() !== yesterday) {
//         yesterday = today;
//         today = getTodayDate();

//         storage.set({ 'yesterday' : yesterday}, console.log);
//         storage.set({ 'today' : today});

//         totalUpTimes();
//     }
// })();

//units in seconds
let inactiveTimeLimit = 30;
let inactiveTabTimeout = 0;

var timerInterval;
var inactiveTimeout;

///init///
//Scroll to last position
window.scrollTo(0, localStorage.getItem(scrollPosKey));
startUntilTimeout();

let saveScrollInterval = setTimeout(function() {
    setInterval(function() {
        localStorage.setItem(scrollPosKey, window.pageYOffset);
    },  3 * 1000);
}, 3 * 1000);

///Check for inactivity///
window.addEventListener('scroll', () => startUntilTimeout(), true);
window.addEventListener("mousemove", () => startUntilTimeout());
document.addEventListener("visibilitychange", function(){
    if(document.visibilityState === "visible") {
        startUntilTimeout(inactiveTabTimeout);
        return;
    }

    setTimeout(function() {
        if(document.visibilityState === "hidden") {
            stop();
        }
    }, inactiveTabTimeout * 1000);
});

///Timer functions///
function startUntilTimeout(timeLimit) {
    start();
    clearTimeout(inactiveTimeout);
    inactiveTimeout = setTimeout(function() {
        stop();
    }, (timeLimit || inactiveTimeLimit) * 1000);
}

function start() {
    if(!timerInterval) {
        timerInterval = setInterval(function(){
            storage.get(timeKey, (data) => {
                let oldTime = data[timeKey] || 0;
                timeObj[timeKey] = oldTime + 1;
                storage.set(timeObj);
            });    
        }, 1 * 1000);
    }
}

function stop() {
    if(timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

///Reset Stats///
function resetTotalTime() {
    timeObj[timeKey] = 0;
    storage.set(timeObj);
}

///Misc///
function getTodayDate(){
    var today = new Date();
    return today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + (today.getDay() + 1);
}
