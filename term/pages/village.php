<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>스터디 with 차차</title>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet" href="../style.css">
    <link rel="icon" href="../images/chacha/study.png">
    <script src="../app.js"></script>
</head>
<body>
    <header style="margin-bottom: 0;">
        <div class="container">
            <div class="logo">
                <a href="../index.php">
                    <img src="../images/chacha/study.png" alt="logo">
                    <p>스터디 with 차차</p>
                </a>
            </div>
            <div class="nav">
                <a href="../index.php">과목 리스트</a>
                <a href="subject.php">과목 검색</a>
                <a href="village.php">캐릭터 마을</a>
                <a href="friend.php">친구목록</a>
                <a href="statistics.php">통계보기</a>
                <?php 
                    session_start();
                    if (isset($_SESSION['user'])) {
                        echo "<a href='../post/logout.php'>로그아웃</a>";
                    } else {
                        echo "<a href='login.php'>로그인</a>";
                        echo "<a href='join.php'>회원가입</a>";
                    }
                ?>
            </div>
        </div>
    </header>

    <div id="village">

    </div>

    <div id="modalBackground"></div>
    <div id="statusModal" class="modal">
        <div class="row chachaName">
            <p>시스템프로그래밍 차차</p>
        </div>
        <div class="row">
            <p><b>Lv</b>&nbsp;&nbsp;<span id="level">14</span></p>
        </div>
        <!-- <div class="row">
            <b>상태</b>&nbsp;&nbsp;배고픔
        </div> -->
        <div class="row">
            <button class="statusModalCloseBtn">닫기</button>
        </div>
    </div>
</body>
</html>