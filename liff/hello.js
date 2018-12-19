window.onLoadFuncs = [];

function init() {
    window.appendLog = (function() {
        var p = document.getElementById('logs');
        var logs = p.getElementsByTagName('li');
        var array = [];

        return function(newMsg) {
            var now = new Date();
            var prefix = "<span class='time'>"
                + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "." + now.getUTCMilliseconds()
                + "</span>";
            array.push(prefix + newMsg);
            while(array.length > logs.length) {
                array.shift();
            }

            for (var i = 0; i < array.length; ++i) {
                logs[i].innerHTML = array[i];
            }
        }
    })();

    window.onLoadFuncs.forEach(function(f) {
        if (f !== undefined && !!f && typeof f === "function") {
            f.apply();
        }
    });
}

function initializeApp(data) {
    document.getElementById('languagefield').textContent = data.language;
    document.getElementById('viewtypefield').textContent = data.context.viewType;
    document.getElementById('useridfield').textContent = data.context.userId;
    document.getElementById('utouidfield').textContent = data.context.utouId;
    document.getElementById('roomidfield').textContent = data.context.roomId;
    document.getElementById('groupidfield').textContent = data.context.groupId;
}

window.onload = function() {
    init();

    if (liff === undefined || !liff) {
        alert('No LIFF SDK ?!');
    } else {
        appendLog("init LIFF....");
        liff.init(function (data) {
            appendLog("LIFF initialized");
            initializeApp(data);
        }, function(e) {
            appendLog(e.toString());
        });
    }
};

