window.onLoadFuncs = [];

window.onLoadFuncs.push(function () {
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
});

window.onload = function() {
    window.onLoadFuncs.forEach(function(f) {
        if (f !== undefined && !!f && typeof f === "function") {
            f.apply();
        }
    });
};

