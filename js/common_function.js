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
        "success": function (mydata) {
            next_action(JSON.stringify(mydata));
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