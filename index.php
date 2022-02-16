<?php

session_start();
define("SESSION_KEY",session_regenerate_id());
$path = pathinfo($_SERVER["REQUEST_URI"]);
define("PAGE_NAME", $path["filename"]);
require_once "common/const.php";
var_dump(PAGE_NAME);
switch (PAGE_NAME) {
    case "login":
        require_once 'controller/login_controller.php';
        $con = new LoginController();
        break;
    case "test":
        require_once 'controller/index_controller.php';
        $con = new IndexController();
        break;
    default:
        require_once 'controller/login_controller.php';
        $con = new LoginController();
        break;
}