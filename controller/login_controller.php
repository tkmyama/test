<?php
class LoginController {
    function __construct()
    {
        //ログインしているのにログインページを開こうとしたらリダイレクト
        if (isset($_SESSION[SESSION_KEY]) && $_SESSION[SESSION_KEY]["LOGIN"]) {
            header("Location:/test/test.php",true,301);
            exit();
        } else{
            require_once 'login.php';
        }
    }
}
?>
