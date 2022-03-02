var cf = {};

cf.send_ajax = function (url, params, next_action) {
    $.ajax({
        "url": "model/catch_ajax.php",
        "type": 'post',
        "cache": false,
        "dataType": 'json',
        "data": params,
        "always": function () {
            cf.hide_loading();
        },
        "success": function (data) {
            next_action(JSON.stringify(data));
        },
        error: function (data) {
            console.log(data.responseText);
            alert("fail");
        }
    });
}

cf.show_loading = function (next_action) {
    $(".loading").addClass("show");

    setTimeout(function () {
        if (typeof next_action === 'function') {
            next_action();
        }
    }, 800);

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
$("#logout").unbind().on("click",function(){
    var next_action = function(){
        location.href = "login.php";
    }
    cf.send_ajax("",{"ajax_mode":"logout"},next_action)
});