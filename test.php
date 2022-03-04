<?php
$path = pathinfo($_SERVER["REQUEST_URI"]);
define("PAGE_NAME", $path["filename"]);
require_once "common/const.php";
switch (PAGE_NAME) {
    case "login":
        require_once 'controller/login_controller.php';
        $con = new LoginController();
        break;
    case "test":
        require_once 'controller/test_controller.php';
        $con = new TestController();
        break;
    default:
        require_once 'controller/login_controller.php';
        $con = new LoginController();
        break;
}
?>