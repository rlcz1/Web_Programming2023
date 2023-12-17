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
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js"></script>
</head>
<body>
    <header>
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

    <div id="stats" class="container">
        <h1>통계보기</h1>
        <div class="statsContainer">
            <div class="row">
                <p>
                    <span class="material-symbols-outlined">face_3</span>
                    <span>&nbsp;<b>규리</b></span>
                </p>
                <span>#0311</span>
            </div>
            <div class="row">
                <div class="statsItem">
                    <p>총 공부시간</p>
                    <p>
                        <span class="material-symbols-outlined">schedule</span>
                        <span id="statTotalTime">160시간 53분 23초</span>
                    </p>
                </div>
                <div class="statsItem">
                    <p>최대 집중시간</p>
                    <p> 
                        <span class="material-symbols-outlined">schedule</span>
                        <span id="statMaxTime">160시간 53분 23초</span>
                    </p>
                </div>
                <div class="statsItem">
                    <p>가장 많이 공부한 과목</p>
                    <p> 
                        <span class="material-symbols-outlined">subject</span>
                        <span id="statMaxSubject">시스템프로그래밍</span>
                    </p>
                </div>
            </div>
            <div id="chart" class="row">
                <span style="font-size:12px">단위 : 분</span>
                <canvas id="myChart" height="300" width="872"></canvas>
            </div>
            <div id="subjectStats" class="row">
                <p>과목별 공부시간</p>
                <div id="subjectStatsList">
                    <div class="subjectStatsItem">
                        <p>
                            <b>1. 시스템프로그래밍</b> 
                            <span>00분반 | 김형신</span>
                        </p>
                        <p> 
                            <span class="material-symbols-outlined">schedule</span>
                            <span id="statMaxTime">160시간 53분 23초</span>
                        </p>
                    </div>
                    <div class="subjectStatsItem">
                        <p>
                            <b>2. 웹프로그래밍</b> 
                            <span>01분반 | 유정연</span>
                        </p>
                        <p>120시간 11분 13초</p>
                    </div>
                    <div class="subjectStatsItem">
                        <p>
                            <b>3. 객체지향설계</b> 
                            <span>02분반 | 이성호</span>
                        </p>
                        <p>45시간 13분 45초</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script src="../chart.js"></script>
    <script src="../app.js"></script>

</body>
</html>