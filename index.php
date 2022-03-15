<?php
$request = $_REQUEST;
if (!isset($request["page"]) || $request["page"] == "index") {
    define("PAGE_NAME", "test");
} else {
    define("PAGE_NAME", $request["page"]);
}
require_once "common/const.php";
switch (PAGE_NAME) {
    case "login":
        require_once 'controller/login_controller.php';
        $con = new LoginController();
        break;
    case "test":
        require_once 'controller/test_controller.php';
        $con = new TestController();
        var_dump($_REQUEST);
        break;
    case "mypage":
        require_once 'controller/mypage_controller.php';
        $con = new MypageController();
        break;
}
