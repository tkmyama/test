<?php
require_once "common/const.php";
if(!isset($_SESSION)){
    session_start();
}
if (isset($_SESSION[SESSION_KEY]) && $_SESSION[SESSION_KEY]["LOGIN"]) {
    header("Location:/test/test.php", true, 301);
    exit();
}

?>
<html>

<head>
    <meta charset="UTF-8">
    <link rel="shortcut icon" href="favicon.ico" />
    <link rel="stylesheet" href="lib\fontawesome\css\all.min.css">
    <link rel="stylesheet" href="css\lib\bootstrap.min.css">
    <link rel="stylesheet" href="css\lib\bootstrap-grid.min.css">
    <link rel="stylesheet" href="css\lib\bootstrap-reboot.min.css">
    <link rel="stylesheet" href="css\common.css?<?= time() ?>">
    <link rel="stylesheet" href="css\deco.css?<?= time() ?>">
    <link rel="stylesheet" href="css\login.css?<?= time() ?>">
</head>

<body>
    <?php
    require_once 'view/login_view.php';
    ?>
    <div class="loading">
        <div class="sk-cube-grid">
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
            <h6>loading...</h6>
        </div>
    </div>
    <script type="text/javascript" src="js/lib/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="js/lib/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="js/lib/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/lib/bootstrap.bundle.min.js"></script>
    <script type="text/javascript" src="js/common_function.js?<?= time() ?>"></script>
    <script type="text/javascript" src="js/login.js?<?= time() ?>"></script>
</body>

</html>