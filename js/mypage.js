var mp = {}

mp.init = function () {
    mp.binds();
    mp.get_user_info();
}

mp.binds = function () {

    $("#hide_change_id_box").unbind().on("click", function () {
        $(this).hide();
        $("#show_change_id_box").show();
        $("#change_id_box").hide();
    });
    $("#show_change_id_box").unbind().on("click", function () {
        $(this).hide();
        $("#hide_change_id_box").show();
        $("#change_id_box").show();
    });
    $("#change_user_id").on("keyup blur", function () {
        var str = $(this).val()
        if (str.length < 4) {
            $("#change_user_id_notice").removeClass("text-danger text-success").addClass("text-muted").text("半角英数4文字以上で入力してください。")
        } else {
            mp.check_id_registable(str);
        }
    });
    //ID入力全角があったら半角に
    $("#change_user_id").on("change", function () {
        var str = $(this).val();
        var ret_str = cf.check_fw(str)
        $(this).val(ret_str);
    });
    //インプットフォームが殻になったら注意書きは消す
    $("form input").each(function (i) {
        var id = $(this).attr("id");
        if (id != undefined && id != "") {
            if ($("#" + id).val() == "") {
                $("#" + id + "_notice").empty();
            }
        }
    });
    $("#submit_change_user_id").unbind().on("click", function () {
        if (!$(this).hasClass("disabled")) {
            var change_user_id = $("#change_user_id").val();
            mp.confirm_pass(change_user_id);
        }
    });
}

mp.get_user_info = function () {
    var params = {
        "ajax_mode": "get_user_info",
    }
    var next_action = function (json) {
        var data = JSON.parse(json);
        if (data[0]) {
            var user_info = data[0];
            $("#user_info").find("#regist_number").empty().html(user_info["id"]);
            $("#user_info").find("#regist_date").empty().html(user_info["ins_date"]);
            $("#user_info").find("#user_id").empty().html(user_info["user_id"]);
            $("#user_info").find("#last_login_date").empty().html(user_info["last_login_date"]);
        } else {
            $("#user_info").find(".card-body").empty().html("ユーザー情報が読み込めませんでした。<br>ログインし直すか、ページを更新してください。")
        }
    }
    cf.show_loading(function () {
        cf.send_ajax("", params, next_action);
    });

}
//ユーザーID使用可能チェック
mp.check_id_registable = function (check_id) {
    var params = {};
    params["ajax_mode"] = "check_registable";
    params["user_id"] = check_id;
    var next_action = function (json) {
        var data = JSON.parse(json);
        var row = data[0];
        if (row["count"] > 0) {
            $("#change_user_id_notice").removeClass("text-muted text-success").addClass("text-danger").html('<i class="fas fa-times-circle mr-2">変更不可</i>');
            $("#change_user_id").data("okng", "NG");
        } else {
            $("#change_user_id_notice").removeClass("text-muted text-danger").addClass("text-success").html('<i class="fas fa-check-circle mr-2">変更可</i>');
            $("#change_user_id").data("okng", "OK");
        }
        mp.check_registable();
    };
    cf.send_ajax("", params, next_action);
}
mp.check_registable = function () {
    var flg_id = $("#change_user_id").data("okng");

    if (flg_id === "OK") {
        $("#submit_change_user_id").removeClass("disabled").prop("disabled", false);
    } else {
        if (!$("#submit_change_user_id").hasClass("disabled")) {
            $("#submit_change_user_id").addClass("disabled").prop("disabled", true);
        }
    }
}

mp.mod_user_id = function (change_user_id) {
    //ユーザーID変更処理
    var params = {};
    params["ajax_mode"] = "mod_user_id";
    params["change_user_id"] = change_user_id;
    var next_action = function (json) {
        var data = JSON.parse(json);
        if (!data["error"]) {
            $("#change_user_id_notice").empty();
            $("#change_user_id").val("");
            //成功
            $("#confirm_modal").find(".modal-title").text("ユーザーIDの変更が完了しました");
            $("#confirm_modal").find(".modal-body").html('<p>' + user_id + 'さんのユーザー登録が完了いたしました<br>ログインフォームからログイン可能です。</p>');
            $("#confirm_modal").modal("show");
        } else {
            //失敗
            $("#change_user_id_notice").empty();
            $("#change_user_id").val("");
        }
    };
    cf.show_loading(function () {
        cf.send_ajax("", params, next_action);
    });

}
mp.confirm_pass = function (change_user_id) {
    $("#confirm_pass").modal("show");
    $("#confirm_pass").find("#check_pass").unbind().on("click", function () {
        var params = {};
        params["ajax_mode"] = "check_pass";
        params["password"] = $("#");
        var next_action = function (json) {
            var data = JSON.parse(json);
            $("#confirm_pass").modal("hide");
            if (!data["error"]) {
                mp.mod_user_id(change_user_id);

            } else {
                //失敗
                $("#change_user_id_notice").empty();
                $("#change_user_id").val("");
                $("#change_id_box").hide();
                $("#show_change_id_box").show();
                $("#hide_change_id_box").hide();
            }
        }
        cf.show_loading(function () {
            cf.send_ajax("", params, next_action);
        });
    });

};


mp.init();