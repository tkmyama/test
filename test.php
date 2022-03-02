<?php
session_start();
$path = pathinfo($_SERVER["REQUEST_URI"]);
define("PAGE_NAME", $path["filename"]);
require_once "common/const.php";
var_dump(PAGE_NAME);
var_dump($_SESSION);
var_dump($_COOKIE);
var_dump($path);
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