<?php
class LoginController {
    function __construct()
    {
        //ログインしているのにログインページを開こうとしたらリダイレクト
        if (isset($_SESSION[SESSION_KEY]) && $_SESSION[SESSION_KEY]["LOGIN"]) {
            header("Location: test.php",true,301);
        } else{
            require_once 'login.php';
        }
    }
}
?>
