var cf = {};

cf.send_ajax = function (url, params, next_action) {
    $.ajax({
        "url": "model/catch_ajax.php",
        "type": 'post',
        "cache": false,
        "dataType": 'json',
        "data": params,
        "success": function (data) {
            next_action(JSON.stringify(data));
        },
        "error": function (data) {
            alert("fail");
        },
        //レスポンスが返ってきたときに実行alwaysだとsuccess後に実行される
        "complete": function () {
            cf.hide_loading();
        }
    });
}
cf.show_loading = function (next_action) {
    $(".loading").addClass("show");
    setTimeout(function () {
        if (typeof next_action === 'function') {
            next_action();
        }
    }, 500);

}
cf.hide_loading = function (next_action) {
    $(".loading").removeClass("show");
    if (typeof next_action === 'function') {
        next_action();
    }
}
cf.call_after = function (func, done) {
    return function () {
        var returnValue = func.apply(func, [].slice.call(arguments));
        done();
        return returnValue;
    };
}
cf.check_fw = function (str) {
    str = str.replace(/[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function (s) {
        return String.fromCharCode(s.charCodeAt(0) - 65248);
    });
    return str.replace(/[^!-~]/g, "");
}
// cf.check_cookie = function () {
//     var hostname = location.hostname;
//     var mycookie = document.cookie;
//     console.log(mycookie);
//     //hostnameと同じクッキーを持っていたらチェックしに行く
//     if (mycookie[hostname]) {
//         var next_action = function (json) {
//             var data = JSON.parse(json);
//             if (data["login"] === "OK") {
//                 cf.auto_login();
//             }
//         };
//         cf.send_ajax("", { "ajax_mode": "check_cookie" }, next_action);
//     }
// }
// cf.auto_login = function () {
//     alert("自動ログインしました。")
//             location.href= "/test/test.php";
// }
// cf.check_cookie();
