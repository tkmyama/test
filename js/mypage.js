var mp = {}

mp.init = function () {
    mp.binds();
    mp.get_user_info();
}

mp.binds = function () {

    $("#hide_change_pass_box").unbind().on("click", function () {
        $(this).hide();
        $("#show_change_pass_box").show();
        $("#change_pass_box").hide();
        console.log("aaa");
    });
    $("#show_change_pass_box").unbind().on("click", function () {
        $(this).hide();
        $("#hide_change_pass_box").show();
        $("#change_pass_box").show();
    });
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
    //パスワードの強さチェックも入れる
    $("#change_password").on("keyup blur", function () {
        var str = $(this).val()
        if (str.length < 4) {
            $("#change_password_notice").removeClass("text-danger text-success").addClass("text-muted").text("半角英数4文字以上で入力してください。")
        } else {
            $("#change_password_notice").removeClass("text-muted");
            mp.check_pass_strength(str);
        }
    });
    //パスワード再入力確認
    $("#change_password, #change_password_confirm").on("keyup", function () {
        var confirm_pass = $("#change_password_confirm").val();
        var input_pass = $("#change_password").val();
        if (confirm_pass != "" && input_pass != "") {
            mp.check_pass_confirm(input_pass, confirm_pass);
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
        mp.check_id_changable();
    };
    cf.send_ajax("", params, next_action);
}
mp.check_id_changable = function () {
    var flg_id = $("#change_user_id").data("okng");

    if (flg_id === "OK") {
        $("#submit_change_user_id").removeClass("disabled").prop("disabled", false);
    } else {
        if (!$("#submit_change_user_id").hasClass("disabled")) {
            $("#submit_change_user_id").addClass("disabled").prop("disabled", true);
        }
    }
}
mp.check_pass_changable = function () {
    var flg_pass = $("#change_password").data("okng");
    var flg_pass_confirm = $("#change_password_confirm").data("okng");

    if (flg_pass === "OK" && flg_pass_confirm === "OK" ) {
        $("#submit_change_password").removeClass("disabled").prop("disabled", false);
    } else {
        if (!$("#submit_change_password").hasClass("disabled")) {
            $("#submit_change_password").addClass("disabled").prop("disabled", true);
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
            $("#confirm_modal").find(".modal-title").empty().text("ユーザーIDの変更が完了しました");
            $("#confirm_modal").find(".modal-body").empty().html('<p>ユーザーIDの変更が完了いたしました。</p>');
            $("#confirm_modal").modal("show");
        } else {
            //失敗
            $("#confirm_modal").find(".modal-title").empty().text("ユーザーIDの変更に失敗しました。");
            $("#confirm_modal").find(".modal-body").empty().html('<p>ユーザーID変更に失敗しました<br>お手数ですがもう一度お願いします。</p>');
            $("#confirm_modal").modal("show");
            $("#change_user_id_notice").empty();
            $("#change_user_id").val("");
        }
        $('#confirm_modal').on('hidden.bs.modal', function (e) {
            //モーダル閉じられたらリロード
            location.reload();
        })
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
        params["password"] = $("#password").val();
        var next_action = function (json) {
            var data = JSON.parse(json);
            $("#confirm_pass").modal("hide");
            if (data["pass_check"] === "OK") {
                mp.mod_user_id(change_user_id);

            } else if (data["pass_check"] === "LOGOUT") {
                //パスワードミス既定値超え
                location.reload();
            } else {
                //失敗
                $("#confirm_modal").find(".modal-title").empty().text("パスワードが不正です。");
                $("#confirm_modal").find(".modal-body").empty().html('<p>パスワードが間違っています。<br>お手数ですがもう一度やり直してください。</p>');
                $("#confirm_modal").modal("show");
            }
        }
        cf.show_loading(function () {
            cf.send_ajax("", params, next_action);
        });
    });

};

//パスワードの強さを出す
mp.check_pass_strength = function (check_pass) {
    var check_id = $("#user_id").val();
    //パスワードの強さはポイント制にする。
    var p_point = {
        "char_length": 1,//８文字以上
        "upper_lower": 2,//大文字と小文字の混在
        "only_upper": -2,//大文字しかない
        "only_lower": -2,//小文字しかない
        "number": 1,//数値が存在
        "only_number": -2,//数値しかない
        "sp_char": 2,//記号が存在
        "same_char": -1
    };
    var p_error = {
        "same_id_char": "idと同じ文字をなるべく使わないでください。",//IDと同じ文字が4文字以上含まれる
        "deny_char": "入力された特殊文字は使わないでください。",//特殊文字は使えないように
        "space": "スペースは使わないでください。"//スペースが存在
    }
    var p_total = {
        0: 'パスワードの強さ:<i class="fas fa-times-circle mr-2">とても脆弱</i>',
        1: 'パスワードの強さ:<i class="fas fa-times-circle mr-2">やや脆弱</i>',
        2: 'パスワードの強さ:<i class="fas fa-times-circle mr-2">弱い</i>',
        3: 'パスワードの強さ:<i class="fas fa-check-circle mr-2">普通</i>',
        4: 'パスワードの強さ:<i class="fas fa-check-circle mr-2">強い</i>',
        5: 'パスワードの強さ:<i class="fas fa-check-circle mr-2">やや強固</i>',
        6: 'パスワードの強さ:<i class="fas fa-check-circle mr-2">とても強固</i>'
    }
    var point = 0;
    for (var key in p_point) {
        switch (key) {
            case "char_length"://8文字以上
                if (check_pass.length > 7) {
                    point += p_point.char_length;
                }
                break;
            case "upper_lower"://大文字と小文字の混在
                var upper = (check_pass.match(/[A-Z]/g) || []).length;
                var lower = (check_pass.match(/[a-z]/g) || []).length;
                if (upper > 0 && lower > 0) {
                    point += p_point.upper_lower;
                }
                break;
            case "only_upper"://大文字
                var upper = (check_pass.match(/[A-Z]/g) || []).length;
                if (upper == check_pass.length) {
                    point += p_point.only_upper;
                }
                break;
            case "only_lower"://小文字
                var lower = (check_pass.match(/[a-z]/g) || []).length;
                if (lower == check_pass.length) {
                    point += p_point.only_lower;
                }
                break;
            case "number": 2//数値が存在
                var number = (check_pass.match(/[0-9]/g) || []).length;
                if (number > 0) {
                    point += p_point.number;
                }
                break;
            case "only_number"://小文字
                var number = (check_pass.match(/[0-9]/g) || []).length;
                if (number == check_pass.length) {
                    point += p_point.only_number;
                }
                break;
            case "sp_char"://記号（特殊文字は省く）
                var sp1 = (check_pass.match(/[^.*+\-?^${}()|[\]\\]/g) || []).length;
                var sp2 = (check_pass.match(/[^0-9a-zA-Z]/g) || []).length;
                if (sp1 > 0 && sp2 > 0) {
                    point += p_point.sp_char;
                }
                break;
            case "same_char"://同じ文字が連続している
                var len = check_pass.length;
                for (var i = 0; i < (len - 1); i++) {
                    var char = check_pass.substr(i, 1);
                    var next_char = check_pass.substr((i + 1), 1);
                    if (char == next_char) {
                        point += p_point.same_char;
                    }
                }
                break;
        }
    }
    var error = [];
    for (var key in p_error) {
        switch (key) {
            case "same_id_char":
                var same_char_num = 0
                for (var i in check_pass) {
                    var same = (check_id.match(check_pass[i]) || []).length;
                    
                    same_char_num += same;
                }
                if (same_char_num > 3) {
                    error.push(p_error[key])
                }
                break;
            case "deny_char":
                var deny_char = (check_pass.match(/[.*+\-?^${}()|[\]\\]/g) || []).length;
                if (deny_char > 0) {
                    error.push(p_error[key])
                }
                break;
            case "space":
                var space = (check_pass.match(/\s+/g) || []).length;
                if (space > 0) {
                    error.push(p_error[key])
                }
                break;
        }
    }
    var color = {
        0: "#cc0000",
        1: "#880000",
        2: "#555500",
        3: "#000000",
        4: "#225500",
        5: "#228822",
        6: "#00cc22"
    }
    if (error.length > 0) {
        $("#change_password_notice").css("color", "#dc3545").empty();
        for (var key in error) {
            $("#change_password_notice").append(error[key]);
            if (key == (error.length - 1)) {
                $("#change_password_notice").append("<br>");
            }
        }
        $("#change_password").data("okng", "NG");
    } else {
        $("#change_password_notice").empty();
        if (point < 0) {
            $("#change_password_notice").css("color", color[0]).html(p_total[0]);

        } else if (point > 6) {
            $("#change_password_notice").css("color", color[6]).html(p_total[6]);

        } else {
            $("#change_password_notice").css("color", color[point]).html(p_total[point]);
        }
        $("#change_password").data("okng", "OK");
    }
    mp.check_pass_changable();
}
mp.init();