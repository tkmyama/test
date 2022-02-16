<?php

class BaseController
{
    function __construct()
    {
        //ログインしていなければログインページを表示、ログインしていれば各ページを表示
        if (!isset($_SESSION[$_SERVER[SESSION_KEY]]) || !$_SESSION[SESSION_KEY]["LOGIN"]) {
            header('Location: login.php', true, 301);
            exit;
        } else {
            require_once 'view/base_view.php';
        }
    }
}
