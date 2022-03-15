<html>

<head>
    <?php require_once ROOTPATH . "common/head.php"; ?>
</head>

<body>
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
    <?php
    require_once ROOTPATH . 'view/nav_view.php';
    require_once ROOTPATH . 'view/' . PAGE_NAME . '_view.php';
    ?>
    <?php require_once ROOTPATH . "common/footer.php"; ?>
</body>

</html>