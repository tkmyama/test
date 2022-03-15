var login = {}

login.init = function () {
    login.binds();
}

//初期バインドイベント
login.binds = function () {
    $("#to_regist").unbind().on("click", function () {
        $("#login_forms").hide();
        $("#regist_forms").show();
    });
    $("#to_login").unbind().on("click", function () {
        $("#login_forms").show();
        $("#regist_forms").hide();
    });

    //ログイン入力
    $("#login_id").on("keyup blur", function () {
        var str = $(this).val()
        if (str.length < 3) {
            $("#login_id_notice").removeClass("text-danger text-success").addClass("text-muted").text("4文字以上で入力してください。")
        } else {
            $("#login_id_notice").removeClass("text-danger text-success").addClass("text-muted").empty();
        }
    });
    $("#login_button").on("click", function () {

        var user_id = $("#login_id").val();
        var password = $("#login_password").val();
        if (user_id == "" || password == "") {
            $("#login_error").text("ユーザーIDとパスワードの入力は必須です。");
        } else {
            $("#login_error").empty();
            login.submit_login(user_id, password);
        }
    });

    /*新規ユーザー登録*/
    //ID登録可能かチェックも入れる
    $("#regist_id").on("keyup blur", function () {
        var str = $(this).val()
        if (str.length < 4) {
            $("#regist_id_notice").removeClass("text-danger text-success").addClass("text-muted").text("4文字以上で入力してください。")
        } else {
            login.check_id_registable(str);
        }
    });
    //パスワードの強さチェックも入れる
    $("#regist_password").on("keyup blur", function () {
        var str = $(this).val()
        if (str.length < 4) {
            $("#regist_password_notice").removeClass("text-danger text-success").addClass("text-muted").text("4文字以上で入力してください。")
        } else {
            $("#regist_password_notice").removeClass("text-muted");
            login.check_pass_strength(str);
        }
    });
    //パスワード再入力確認
    $("#regist_password, #regist_password_confirm").on("keyup", function () {
        var confirm_pass = $("#regist_password_confirm").val();
        var input_pass = $("#regist_password").val();
        if (confirm_pass != "" && input_pass != "") {
            login.check_pass_confirm(input_pass, confirm_pass);
        }
    });
    //ID入力全角があったら半角に
    $("#login_id,#regist_id").on("change", function () {
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
    $("#regist_button").unbind().on("click", function () {
        if (!$(this).hasClass("disabled")) {
            var user_id = $("#regist_id").val();
            var password = $("#regist_password").val();
            login.regist(user_id, password);
        }
    });
}


//ユーザーID使用可能チェック
login.check_id_registable = function (check_id) {
    var params = {};
    params["ajax_mode"] = "check_registable";
    params["user_id"] = check_id;
    var next_action = function (json) {
        var data = JSON.parse(json);
        if (data["count"] > 0) {
            $("#regist_id_notice").removeClass("text-muted text-success").addClass("text-danger").html('<i class="fas fa-times-circle mr-2">使用不可</i>');
            $("#regist_id").data("okng", "NG");
        } else {
            $("#regist_id_notice").removeClass("text-muted text-danger").addClass("text-success").html('<i class="fas fa-check-circle mr-2">使用可</i>');
            $("#regist_id").data("okng", "OK");
        }
        login.check_registable();
    };
    cf.send_ajax("", params, next_action);
}
//パスワードの強さを出す
login.check_pass_strength = function (check_pass) {
    var check_id = $("#regist_id").val();
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
        $("#regist_password_notice").css("color", "#dc3545").empty();
        for (var key in error) {
            $("#regist_password_notice").append(error[key]);
            if (key == (error.length - 1)) {
                $("#regist_password_notice").append("<br>");
            }
        }
        $("#regist_password").data("okng", "NG");
    } else {
        $("#regist_password_notice").empty();
        if (point < 0) {
            $("#regist_password_notice").css("color", color[0]).html(p_total[0]);

        } else if (point > 6) {
            $("#regist_password_notice").css("color", color[6]).html(p_total[6]);

        } else {
            $("#regist_password_notice").css("color", color[point]).html(p_total[point]);
        }
        $("#regist_password").data("okng", "OK");
    }
    login.check_registable();
}
login.check_pass_confirm = function (input_pass, confirm_pass) {
    if (input_pass != "" && confirm_pass != "" && input_pass === confirm_pass) {
        $("#regist_password_confirm_notice").removeClass("text-muted text-danger").addClass("text-success").html('<i class="fas fa-check-circle mr-2">OK</i>');
        $("#regist_password_confirm").data("okng", "OK");
    } else {
        $("#regist_password_confirm_notice").removeClass("text-muted text-success").addClass("text-danger").html('<i class="fas fa-times-circle mr-2">NG</i>');
        $("#regist_password_confirm").data("okng", "NG");
    }
    login.check_registable();
}

login.check_registable = function () {
    var flg_id = $("#regist_id").data("okng");
    var flg_pass = $("#regist_password").data("okng");
    var flg_pass_confirm = $("#regist_password_confirm").data("okng");

    if (flg_id === "OK" && flg_pass === "OK" && flg_pass_confirm === "OK") {
        $("#regist_button").removeClass("disabled").prop("disabled", false);
    } else {
        if (!$("#regist_button").hasClass("disabled")) {
            $("#regist_button").addClass("disabled").prop("disabled", true);
        }
    }
}

//ユーザー登録処理
login.regist = function (user_id, password) {
    var params = {};
    params["ajax_mode"] = "user_regist";
    params["user_id"] = user_id;
    params["password"] = password;
    var next_action = function (json) {
        var data = JSON.parse(json);
        if (!data["error"]) {
            $("#regist_id_notice").empty();
            $("#regist_password_notice").empty();
            $("#regist_password_confirm_notice").empty();
            $("#regist_id").val("");
            $("#regist_password").val("");
            $("#regist_password_confirm").val("");
            $("#regist_error").empty();
            $("#to_login").click();

            //成功
            $("#confirm_modal").find(".modal-title").text("ユーザー登録完了しました");
            $("#confirm_modal").find(".modal-body").html('<p>' + user_id + 'さんのユーザー登録が完了いたしました<br>ログインフォームからログイン可能です。</p>');
            $("#confirm_modal").modal("show");
        } else {
            //失敗
            $("#regist_id_notice").empty();
            $("#regist_password_notice").empty();
            $("#regist_password_confirm_notice").empty();
            $("#regist_id").val("");
            $("#regist_password").val("");
            $("#regist_password_confirm").val("");
            $("#regist_error").html("ユーザー登録に失敗しました。<br>フォームに再入力をしてください。");
            login.check_registable();
        }
    };
    cf.show_loading(function () {
        cf.send_ajax("", params, next_action);
    });

}

login.submit_login = function (user_id, password) {
    var params = {
        "ajax_mode": "submit_login",
        "user_id": user_id,
        "password": password
    }
    var next_action = function (json) {
        var data = JSON.parse(json);
        if (data["login"] === "OK") {
            location.href = "/test/index.php";
        } else if (data["login"] === "NG") {
            if (data["locked"]) {
                $("#login_error").text("ユーザーアカウントがロックされています。30分以上立ってからログインしてください");

            } else {
                $("#login_error").text("ユーザーIDまたはパスワードが間違っています。");

            }
        }
    }
    cf.show_loading(function () {
        cf.send_ajax("", params, next_action);
    });

}
login.init();