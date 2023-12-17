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
                <a href="">친구목록</a>
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

    <div id="friend" class="listContainer container">
        <h1>친구 리스트</h1>
        <div class="addFriend">
            <form action="../post/addFriend.php" method="post">
                <input type="text" name="friendId" id="friendId" placeholder="친구 아이디를 입력해주세요.">
                <button>친구 추가</button>
            </form>
        </div>
        <div id="friend_list" class="row list">
            <div class="listItem">
                <div class="row">
                    <p>
                        <span class="material-symbols-outlined">face_3</span>
                        <span>&nbsp;규리</span>
                    </p>
                    <span>#0311</span>
                </div>
                <div class="row">
                    <p>총 공부시간</p>
                    <p>160시간 53분 23초</p>
                </div>
                <div class="row">
                    <p>오늘 공부시간</p>
                    <p>1시간 22분 23초</p>
                </div>
                <div class="row">
                    <button>
                        <span>
                            <span class="material-symbols-outlined">other_houses</span>
                            <span>&nbsp;마을 방문하기</span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="listItem">
                <div class="row">
                    <p>
                        <span class="material-symbols-outlined">face_3</span>
                        <span>&nbsp;민지</span>
                    </p>
                    <span>#0327</span>
                </div>
                <div class="row">
                    <p>총 공부시간</p>
                    <p>43시간 11분 33초</p>
                </div>
                <div class="row">
                    <p>오늘 공부시간</p>
                    <p>0시간 52분 02초</p>
                </div>
                <div class="row">
                    <button>
                        <span>
                            <span class="material-symbols-outlined">other_houses</span>
                            <span>&nbsp;마을 방문하기</span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="listItem">
                <div class="row">
                    <p>
                        <span class="material-symbols-outlined">face_3</span>
                        <span>&nbsp;예림</span>
                    </p>
                    <span>#0830</span>
                </div>
                <div class="row">
                    <p>총 공부시간</p>
                    <p>32시간 11분 00초</p>
                </div>
                <div class="row">
                    <p>오늘 공부시간</p>
                    <p>2시간 1분 34초</p>
                </div>
                <div class="row">
                    <button>
                        <span>
                            <span class="material-symbols-outlined">other_houses</span>
                            <span>&nbsp;마을 방문하기</span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="listItem">
                <div class="row">
                    <p>
                        <span class="material-symbols-outlined">face_3</span>
                        <span>&nbsp;진영</span>
                    </p>
                    <span>#1111</span>
                </div>
                <div class="row">
                    <p>총 공부시간</p>
                    <p>111시간 11분 11초</p>
                </div>
                <div class="row">
                    <p>총 공부시간</p>
                    <p>1시간 11분 11초</p>
                </div>
                <div class="row">
                    <button>
                        <span>
                            <span class="material-symbols-outlined">other_houses</span>
                            <span>&nbsp;마을 방문하기</span>
                        </span>
                    </button>
                </div>
            </div>

        </div>
    </div>
</body>
</html>