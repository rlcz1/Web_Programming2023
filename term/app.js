class App {
    constructor() {
        this.mainList();
        this.search();
        this.startModal();
        this.village();
        this.rank();
        this.stats();
        this.friend();
    }

    friend() {
        $.ajax({
            url: "../get/friend.php",
            type: "GET",
            success: (res) => {
                const result = JSON.parse(res);
                this.friendResult(result);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    friendResult = (result) => {
        $("#friend_list").empty();
        result.forEach((item) => {
            console.log(item);
            $("#friend_list").append(`
                <div class="listItem">
                    <div class="row">
                        <p>
                            <span class="material-symbols-outlined">face_3</span>
                            <span>&nbsp;${item.userName}</span>
                        </p>
                        <span>${item.userId}</span>
                    </div>
                    <div class="row">
                        <p>총 공부시간</p>
                        <p>${this.formatTime(item.time)}</p>
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
            `);
        });
    }

    mainList() {
        let arr = [];
        $.ajax({
            url: "../datas/userSubject.json",
            type: "GET",
            dataType : "text",
            success: (res) => {
                let result = [];
                result = res.trim().split("\n");
                result.forEach((row) => {
                    let obj = JSON.parse(row);
                    arr.push(obj);
                });
                this.mainListResult(arr);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    mainListResult = (result) => {
        $("#main_list").empty();
        result.forEach((item) => {
            $("#main_list").append(`
                <div class="listItem">
                    <div class="row">
                        <p>
                            <span class="subjectName">${item.subject}</span>
                            <span class="subject_no">${item.subject_no}</span>
                        </p>
                    </div>
                    <div class="row">
                        <p>
                            <span class="dclass">${item.dclass}</span>
                            <span>&nbsp;|&nbsp;</span>
                            <span class="prof">${item.prof}</span>
                            <span>&nbsp;|&nbsp;</span>
                            <span class="college">${item.college}</span>
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
            `);
        });
    }

    search() {
        let result = [];
        $.ajax({
            url: "../datas/subject.json",
            type: "GET",
            success: (res) => {
                result = res.RESULT;
                this.searchResult(result);
            },
            error: (err) => {
                console.log(err);
            }
        });
        $("#search_input").on("keyup", (e) => {
            const search_val = $(e.target).val();
            const filter = result.filter((item) => {
                return item.OPEN_SBJT_NM.includes(search_val);
            });
            this.searchResult(filter);
        });
        $(document).on("click", ".subjectAddBtn", (e) => {
            const target = $(e.target).parents(".listItem");
            const subject = target.find(".subjectName").text().trim();
            const dclass = target.find(".dclass").text().trim();
            const prof = target.find(".prof").text().trim();
            const subject_no = target.find(".subject_no").text().trim();
            const college = target.find(".college").text().trim();
            $.ajax({
                url: "../post/addSubject.php",
                type: "POST",
                data: {
                    subject: subject,
                    dclass: dclass,
                    prof: prof,
                    subject_no: subject_no,
                    college: college
                },
                success: (res) => {
                    console.log(res);
                    alert(res);
                },
                error: (err) => {
                    console.log(err);
                }
            });
        });
    }

    searchResult = (filter) => {
        $("#search_len").text(filter.length);
        $("#search_list").empty();
        filter.forEach((item) => {
            let college = (item.COLG == "대학") ? "교양" : item.COLG;
            $("#search_list").append(`
                <div class="listItem">
                    <div class="row">
                        <p>
                            <span class="subjectName">${item.OPEN_SBJT_NM}</span>
                            <span class="subject_no">${item.OPEN_SBJT_NO}</span>
                        </p>
                    </div>
                    <div class="row">
                        <p>
                            <span class="dclass">${item.OPEN_DCLSS}분반</span>
                            <span>&nbsp;|&nbsp;</span>
                            <span class="prof">${item.PROF_INFO}</span>
                            <span>&nbsp;|&nbsp;</span>
                            <span class="college">${college}</span>
                        </p>
                    </div>
                    <div class="row">
                        <button class="subjectAddBtn">
                            <span>
                                <span class="material-symbols-outlined">add</span>
                                <span>추가하기</span>
                            </span>
                        </button>
                    </div>
                </div>
            `);
        });
    }

    // 통계보기 모달창
    stats() {
        $(document).on("click", ".statsBtn", (e) => {
            e.preventDefault();
            const target = $(e.target).parents(".listItem");
            const subject = target.find(".subjectName").text().trim();
            const subject_no = target.find(".subject_no").text().trim();
            // 클릭한 과목명 가져오기
            $.ajax({
                url: "get/statsTime.php",
                type: "get",
                data: {
                    subject: subject,
                    subject_no: subject_no
                },
                success: (res) => {
                    const result = JSON.parse(res);
                    this.statsResult(result);
                },
                error: (err) => {
                    console.log(err);
                }
            });

            // 모달창에 과목명 넣기
            $("#StatsModal").find(".subjectName p").text(subject);

            //모달창 띄우기
            $("#modalBackground").show();
            $("#StatsModal").show(200);
        });

        $(".rankModalClose").click((e) => {
            $("#modalBackground").hide();
            $("#StatsModal").hide(200);
        });
    }

    statsResult = (result) => {
        $("#statsModalList").empty();
        let time = 0;
        result.forEach((item) => {
            time += parseInt(item.time);
            $("#statsModalList").append(`
                <div class="listItem">
                    <p class="statsDate">
                        <span class="material-symbols-outlined">event_available</span>
                        <b>${item.date}</b>
                    </p>
                    <p class="statsTime">
                        <span class="material-symbols-outlined">schedule</span>
                        ${this.formatTime(item.time)}
                    </p>
                </div>
            `);
        });
        $("#statsTotalTime").text(this.formatTime(time));
    }

    // 순위보기 모달창
    rank() {
        $(document).on("click", ".rankBtn", (e) => {
            e.preventDefault();

            // 모달창 띄우기
            $("#modalBackground").show();
            $("#RankModal").show(200);

            // 클릭한 과목명 가져오기
            const target = $(e.target).parents(".listItem");
            const targetSubject = target.find(".subjectName").text().trim();

            // 모달창에 과목명 넣기
            $("#RankModal").find(".subjectName p").text(targetSubject);
        });

        $(".rankModalClose").click((e) => {
            // 모달창 닫기
            e.preventDefault();
            $("#modalBackground").hide();
            $("#RankModal").hide(200);
        });
    }

    // 마을 페이지
    village() {
        let arr = [];
        $.ajax({
            url: "../datas/userSubject.json",
            type: "GET",
            dataType : "text",
            success: (res) => {
                let result = [];
                result = res.trim().split("\n");
                result.forEach((row) => {
                    let obj = JSON.parse(row);
                    obj.x = 0;
                    obj.y = 0;
                    arr.push(obj);
                });
                this.loadCharacter(arr);
            },
            error: (err) => {
                console.log(err);
            }
        });


        $(document).on("click", ".chacha", (e) => {
            // 컨텍스트 메뉴 숨기기
            $('.context').hide();

            // 컨텍스트 메뉴 선택
            const contextMenu = $(e.currentTarget).find('.context');
            // 컨텍스트 메뉴 표시
            contextMenu.show(200);
        })

        // 당근 주기 클릭 이벤트
        $(document).on("click", ".giveCarrotBtn", (e) => {
            // 컨텍스트 메뉴 숨기기
            e.stopPropagation();
            $('.context').hide();
            alert("차차가 기뻐합니다.");

            // 서버로 넘김
        });

        // 상태 보기 클릭 이벤트
        $(document).on('click', '.viewStatusBtn', (e) => {
            e.stopPropagation();
            $('.context').hide();

            const target = $(e.target).parents(".chacha").find(".chachaName").text().trim();

            let arr = [];
            $.ajax({
                url: "../datas/study.json",
                type: "GET",
                dataType : "text",
                success: (res) => {
                    let result = [];
                    result = res.trim().split("\n");
                    result.forEach((row) => {
                        let obj = JSON.parse(row);
                        arr.push(obj);
                    });
                    let subject = arr.filter((item) => {
                        return item.subject == target.slice(0, -2);
                    });
                    // 한시간에 1 level이 상승한다.
                    $("#level").text(Math.floor(subject[0].time/3600));
                },
                error: (err) => {
                    console.log(err);
                }
            });
        

            // 모달창에 차차이름 넣기
            $("#statusModal").find(".chachaName").find("p").text(target);

            // 모달창 띄우기
            $("#modalBackground").show();
            $("#statusModal").show(200);
        });

        // 상태 모달창 닫기 버튼 클릭 이벤트
        $(".statusModalCloseBtn").click((e) => {
            // 모달창 닫기
            $("#modalBackground").hide();
            $("#statusModal").hide(200);
        });
    }

    loadCharacter = (characterData) => {
        // 애니메이션
        const animateCharacter = ($character, index) => {
            const randomDistance = Math.floor(Math.random() * 300) + 0; // 겹치지 않기 위해 0~150사이로 움직임
          
            // 좌우로 움직이는 애니메이션 적용
            $character.animate(
                { left: `+=${randomDistance}px` }, // 오른쪽으로 이동
                4000, () => {
                    // 애니메이션 끝나면 왼쪽으로 다시 이동
                    $character.animate(
                        { left: `-=${randomDistance}px` }, // 왼쪽
                        3000, () => {
                            // 애니메이션 반복
                            animateCharacter($character, index);
                        }
                    );
                }
            );
        }

        // 캐릭터 생성
        const createCharacter = (character, index) => {
            // 각 캐릭터를 나타내는 div element 생성. 내용은 서버에서 데이터를 가져와서 변경한다.
            const $character = $(`
                <div class="chacha">
                    <p class="chachaName">${character.subject}차차</p>
                    <img src="../images/chacha/${character.college}.png" alt="chacha">
                    <div class="context">
                        <button class="giveCarrotBtn">당근 주기</button>
                        <button class="viewStatusBtn">상태 보기</button>
                    </div>
                </div>
            `);
        
            // 초기 위치 설정
            $character.css({
                left: character.x + 'px',
                bottom: character.y + 'px',
            });
        
            // 페이지에 캐릭터 추가
            $("#village").append($character);
            
            // 좌우로 움직이는 애니메이션 적용
            animateCharacter($character, index);
        }

        console.log(characterData)
        // 각 캐릭터에 대해 애니메이션을 적용
        characterData.forEach((character, index) => {
            // 캐릭터가 겹치지 않게 하기 위해x는 랜덤 값
            character.x = Math.floor(Math.random() * (window.innerWidth-500)) + 0; // 캐릭터의 넓이 약 300 + 움직일 거리 200 = 500
            character.y = Math.floor(Math.random() * (250 - 100 + 1)) + 70; // 최소값 70, 최대값 250의 위치에 생김
        
            // 캐릭터 생성
            createCharacter(character, index);
        });
    }

    
    // 공부시작 모달창
    startModal() {
        // 타이머 관련 변수
        let timerRunning = false;
        let timerInterval;
        let seconds = 0;

        let subject_no;
        let subject;
        let dclass;
        let college;

        // 시작 버튼 클릭 이벤트
        $(document).on("click", ".timerStartBtn", (e) => {
            // 클릭한 과목 아이템 가져오기
            const target = $(e.target).parents(".listItem");
            // 클릭한 과목 정보 가져오기
            subject = target.find(".subjectName").text().trim();
            subject_no = target.find(".subject_no").text().trim();
            dclass = target.find(".dclass").text().trim();
            college = target.find(".college").text().trim();

            // 모달창에 과목명 넣기
            $("#startModal").find(".subjectName").text(subject);
            // 모달창에 타이머 시간 변경하기
            $("#startModal").find("#startModalTime").text();

            // 타이머 시작
            if (!timerRunning) {
                timerRunning = true;
                timerInterval = setInterval(() => {
                    seconds++;
                    // 모달창에 실시간으로 타이머 시간 변경하기
                    $("#startModal").find("#startModalTime").text(this.formatTime(seconds));
                }, 1000);
            }

            // 모달창 띄우기
            $("#modalBackground").show();
            $("#startModal").show(200);
        });

        // 멈추기 버튼 클릭 이벤트
        $(".startModalCloseBtn").click((e) => {
            // 타이머 멈추기
            clearInterval(timerInterval);
            timerRunning = false;

            console.log(this.formatTime(seconds));

            $.ajax({
                url: "post/doneStudy.php",
                type: "POST",
                data: {
                    time : seconds,
                    subject : subject,
                    subject_no : subject_no,
                    dclass : dclass,
                    college : college
                },
                success: (res) => {
                    alert(this.formatTime(seconds)+" 만큼 공부하였습니다!");

                    // 모달창 닫기
                    $("#modalBackground").hide();
                    $("#startModal").hide(200);

                    // 모달창에 타이머 시간 초기화
                    seconds = 0;
                    $("#startModal").find("#startModalTime").text(this.formatTime(seconds));
                },
                error: (err) => {
                    console.log(err);
                }
            });
        });
    }

    // 초 포맷팅 해주는 함수
    formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
}

// 실행
$(document).ready(() => {
    new App();
});

