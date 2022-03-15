var mp = {}

mp.init = function () {
    mp.binds();
    mp.get_user_info();
}

mp.binds = function () {

}

mp.get_user_info = function(){
    var params = {
        "ajax_mode": "get_user_info",
    }
    var next_action = function (json) {
        var data = JSON.parse(json);
        if(data[0]){
            var user_info = data[0];
            $("#user_info").find("#regist_number").empty().html(user_info["id"]);
            $("#user_info").find("#user_id").empty().html(user_info["user_id"]);
            $("#user_info").find("#last_login_date").empty().html(user_info["last_login_date"]);
        }else{
            $("#user_info").find(".card-body").empty().html("ユーザー情報が読み込めませんでした。<br>ログインし直すか、ページを更新してください。")
        }
    }
    cf.show_loading(function () {
        cf.send_ajax("", params, next_action);
    });

}

mp.init();