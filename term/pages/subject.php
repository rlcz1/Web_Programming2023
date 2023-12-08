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
            </div>
        </div>
    </header>

    <div id="subject" class="listContainer container">
        <h1>과목 리스트</h1>
        <div id="search">
            <input type="text" placeholder="과목명을 입력하세요">
            <span class="material-symbols-outlined">search</span>
            <p>총 3건의 검색결과가 있습니다.</p>
        </div>

        <div class="row list">
            <div class="listItem">
                <div class="row">
                    <p>시스템프로그래밍</p>
                </div>
                <div class="row">
                    <p>
                        <span>00분반 | 김형신 |&nbsp;</span>
                        <span class="material-symbols-outlined">group</span>
                        <span>&nbsp;2명</span>
                    </p>
                </div>
                <div class="row">
                    <button>
                        <span>
                            <span class="material-symbols-outlined">add</span>
                            <span>추가하기</span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="listItem">
                <div class="row">
                    <p>웹프로그래밍</p>
                </div>
                <div class="row">
                    <p>
                        <span>00분반 | 유정연 |&nbsp;</span>
                        <span class="material-symbols-outlined">group</span>
                        <span>&nbsp;2명</span>
                    </p>
                </div>
                <div class="row">
                    <button>
                        <span>
                            <span class="material-symbols-outlined">add</span>
                            <span>추가하기</span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="listItem">
                <div class="row">
                    <p>객체지향설계</p>
                </div>
                <div class="row">
                    <p>
                        <span>01분반 | 이성호 |&nbsp;</span>
                        <span class="material-symbols-outlined">group</span>
                        <span>&nbsp;6명</span>
                    </p>
                </div>
                <div class="row">
                    <button>
                        <span>
                            <span class="material-symbols-outlined">add</span>
                            <span>추가하기</span>
                        </span>
                    </button>
                </div>
            </div>
            <div class="listItem">
                <div class="row">
                    <p>운영체제및실습</p>
                </div>
                <div class="row">
                    <p>
                        <span>00분반 | 최훈 |&nbsp;</span>
                        <span class="material-symbols-outlined">group</span>
                        <span>&nbsp;5명</span>
                    </p>
                </div>
                <div class="row">
                    <button>
                        <span>
                            <span class="material-symbols-outlined">add</span>
                            <span>추가하기</span>
                        </span>
                    </button>
                </div>
            </div>

        </div>

    </div>
</body>
</html>