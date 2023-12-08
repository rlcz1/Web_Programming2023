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
    <link rel="stylesheet" href="style.css">
    <link rel="icon" href="images/chacha/study.png">
    <script src="app.js"></script>
</head>
<body>
    <header>
        <div class="container">
            <div class="logo">
                <a href="index.php">
                    <img src="images/chacha/study.png" alt="logo">
                    <p>스터디 with 차차</p>
                </a>
            </div>
            <div class="nav">
                <a href="">과목 리스트</a>
                <a href="pages/subject.php">과목 검색</a>
                <a href="pages/village.php">캐릭터 마을</a>
                <a href="pages/friend.php">친구목록</a>
                <a href="pages/statistics.php">통계보기</a>
            </div>
        </div>
    </header>

    <div id="main" class="listContainer container">
        <h1>과목 리스트</h1>
        <div class="row list">

            <div class="listItem">
                <div class="row subjectName">
                    <p>시스템프로그래밍</p>
                </div>
                <div class="row">
                    <p>
                        <span>00분반 | 김형신 |&nbsp;</span>
                        <span class="material-symbols-outlined">group</span>
                        <span>&nbsp;2명</span>
                    </p>
                    <button class="rankBtn">순위 보기</button>
                    <button class="statsBtn">통계 보기</button>
                </div>
                <div class="row">
                    <button class="timerStartBtn">
                        <span>
                            <span class="material-symbols-outlined">timer</span>
                            <span>시작</span>
                        </span>
                    </button class="timerStartBtn">
                </div>
            </div>
            <div class="listItem">
                <div class="row subjectName">
                    <p>웹프로그래밍</p>
                </div>
                <div class="row">
                    <p>
                        <span>00분반 | 유정연 |&nbsp;</span>
                        <span class="material-symbols-outlined">group</span>
                        <span>&nbsp;2명</span>
                    </p>
                    <button class="rankBtn">순위 보기</button>
                    <button class="statsBtn">통계 보기</button>
                </div>
                <div class="row">
                    <button class="timerStartBtn">
                        <span>
                            <span class="material-symbols-outlined">timer</span>
                            <span>시작</span>
                        </span>
                    </button class="timerStartBtn">
                </div>
            </div>
            <div class="listItem">
                <div class="row subjectName">
                    <p>객체지향설계</p>
                </div>
                <div class="row">
                    <p>
                        <span>01분반 | 이성호 |&nbsp;</span>
                        <span class="material-symbols-outlined">group</span>
                        <span>&nbsp;6명</span>
                    </p>
                    <button class="rankBtn">순위 보기</button>
                    <button class="statsBtn">통계 보기</button>
                </div>
                <div class="row">
                    <button class="timerStartBtn">
                        <span>
                            <span class="material-symbols-outlined">timer</span>
                            <span>시작</span>
                        </span>
                    </button class="timerStartBtn">
                </div>
            </div>
            <div class="listItem">
                <div class="row subjectName">
                    <p>운영체제및실습</p>
                </div>
                <div class="row">
                    <p>
                        <span>00분반 | 최훈 |&nbsp;</span>
                        <span class="material-symbols-outlined">group</span>
                        <span>&nbsp;5명</span>
                    </p>
                    <button class="rankBtn">순위 보기</button>
                    <button class="statsBtn">통계 보기</button>
                </div>
                <div class="row">
                    <button class="timerStartBtn">
                        <span>
                            <span class="material-symbols-outlined">timer</span>
                            <span>시작</span>
                        </span>
                    </button class="timerStartBtn">
                </div>
            </div>

        </div>
    </div>

    <!-- 시작버튼 눌렀을때 나오는 모달 -->
    <div id="startModal" class="modal">
        <div class="row subjectName">
            <p>시스템프로그래밍 시작</p>
        </div>
        <div class="row">
            <div class="fire">
                <div class="fire-left">
                    <div class="main-fire"></div>
                    <div class="particle-fire"></div>
                </div>
                <div class="fire-center">
                    <div class="main-fire"></div>
                    <div class="particle-fire"></div>
                </div>
                <div class="fire-right">
                    <div class="main-fire"></div>
                    <div class="particle-fire"></div>
                </div>
                <div class="fire-bottom">
                    <div class="main-fire"></div>
                </div>
            </div>
            <img src="images/chacha/study.png" alt="img">
        </div>
        <div class="row" id="startModalTime">
            <p>00:00:00</p>
        </div>
        <div class="row">
            <button class="startModalCloseBtn">멈추기</button>
        </div>
    </div>

    <!-- 순위 모달 -->
    <div id="RankModal" class="modal">
        <div class="row subjectName">
            <p>시스템프로그래밍 순위</p>
        </div>
        <div class="listContainer row">
            <div class="listItem">
                <p><b>1</b></p>
                <p>
                    <span class="material-symbols-outlined">face_3</span>
                    <b>&nbsp;규리</b>
                </p>
                <span>#0311</span>
                <p>160시간 53분 23초</p>
            </div>
            <div class="listItem">
                <p><b>2</b></p>
                <p>
                    <span class="material-symbols-outlined">face_3</span>
                    <b>&nbsp;민지</b>
                </p>
                <span>#0311</span>
                <p>160시간 53분 23초</p>
            </div>
            <div class="listItem">
                <p><b>3</b></p>
                <p>
                    <span class="material-symbols-outlined">face_3</span>
                    <b>&nbsp;예림</b>
                </p>
                <span>#0311</span>
                <p>160시간 53분 23초</p>
            </div>
        </div>
        <div class="row">
            <button class="rankModalClose">닫기</button>
        </div>
    </div>

    <!-- 통계 모달 -->
    <div id="StatsModal" class="modal">
        <div class="row subjectName">
            <p>시스템프로그래밍 공부 기록</p>
        </div>
        <div class="row">
            <p>총 공부시간 <b>5시간</b></p>
        </div>
        <div class="listContainer row">
            <div class="listItem">
                <p><b>11월 23일</b></p>
                <p>1시간 53분 23초</p>
            </div>
            <div class="listItem">
                <p><b>11월 25일</b></p>
                <p>3시간 22분 21초</p>
            </div>
            <div class="listItem">
                <p><b>11월 28일</b></p>
                <p>1시간 13분 5초</p>
            </div>
        </div>
        <div class="row">
            <button class="rankModalClose">닫기</button>
        </div>
    </div>

    <div id="modalBackground"></div>
</body>
</html>