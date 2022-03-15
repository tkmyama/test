var nav = {}

nav.init = function () {
    nav.binds();
}

nav.binds = function () {

    $("#mypage").unbind().on("click", function () {
        location.href = "/test/mypage";
    });
    $("#logout").unbind().on("click", function () {
        var next_action = function () {
            location.href = "login.php";
        }
        cf.send_ajax("", { "ajax_mode": "logout" }, next_action)
    });
}

nav.init();