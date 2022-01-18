<?php require_once "common/const.php"; ?>

<html>

<head>
    <?php require_once "common/head.php"; ?>
</head>

<body>
    <p>gittestaaa</p>
    <?php //phpinfo();
        require_once 'controller/index_controller.php';
        $con = new IndexController();
    ?>
    <?php require_once "common/footer.php"; ?>
</body>

</html>