<?php require_once "common/const.php"; ?>

<html>

<head>
    <?php require_once "common/head.php"; ?>
</head>

<body>
    <?php //phpinfo();
        require_once 'controller/index_controller.php';
        $con = new IndexController();
    ?>
    <?php require_once "common/footer.php"; ?>
</body>

</html>