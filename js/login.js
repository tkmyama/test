var login = {}

login.init = function () {
    login.binds();
}

login.binds = function () {
    $("#to_regist").unbind().on("click", function () {
        $("#login_forms").hide();
        $("#regist_forms").show();
    });
    $("#to_login").unbind().on("click", function () {
        $("#login_forms").show();
        $("#regist_forms").hide();
    });
    $("#login_id").on("keypress change", function () {
        var str = $(this).val()
        if (str.length < 3) {
            $("#login_id_caution").empty().append("4文字以上で入力してください。")
        } else {
            $("#login_id_caution").empty();
        }
    });
    $("#login_id,#login_password,#regist_id,#regist_password").on("change", function () {
        var str = $(this).val();
        str = str.replace(/[Ａ-Ｚａ-ｚ０-９－！”＃＄％＆’（）＝＜＞，．？＿［］｛｝＠＾～￥]/g, function (s) {
            return String.fromCharCode(s.charCodeAt(0) - 65248);
        });
        str = str.replace(/[^!-~]/g, "");
        $(this).val(str);
    });
}

login.init();