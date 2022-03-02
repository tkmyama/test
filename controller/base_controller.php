<?php

class BaseController
{
    function __construct()
    {
        require_once 'model/catch_ajax.php';
        //ログインしていなければログインページを表示、ログインしていれば各ページを表示
        if (isset($_SESSION[SESSION_KEY]) && $_SESSION[SESSION_KEY]["LOGIN"]) {
            require_once 'view/base_view.php';
        } else {
            require_once 'login.php';
            exit;
        }
    }
}
?>
