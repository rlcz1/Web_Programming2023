class App {
    constructor() {
        this.addEvent();
        this.startModal();
        this.village();
        this.rank();
    }

    addEvent() {

    }

    // 순위보기 모달창
    rank() {
        $(".rankBtn").click((e) => {
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
        $(".chacha").click((e) => {
            e.preventDefault();

            // 컨텍스트 메뉴 숨기기
            $(".context").hide();

            // 컨텍스트 메뉴 선택
            const contextMenu = $(e.currentTarget).find('.context');
            // 컨텍스트 메뉴 표시
            contextMenu.show(200);
        });

        // 당근 주기 클릭 이벤트
        $(".giveCarrotBtn").click((e) => {
            // 컨텍스트 메뉴 숨기기
            e.stopPropagation();
            $('.context').hide();
            alert("당근을 주었습니다.");
        });


        // 상태 보기 클릭 이벤트
        $(".viewStatusBtn").click((e) => {
            e.stopPropagation();
            $('.context').hide();

            const target = $(e.target).parents(".chacha").find(".chachaName").text().trim();

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
    
    // 공부시작 모달창
    startModal() {
        // 타이머 관련 변수
        let timerRunning = false;
        let timerInterval;
        let seconds = 0;

        // 시작 버튼 클릭 이벤트
        $(".timerStartBtn").click((e) => {
            // 클릭한 과목 아이템 가져오기
            const target = $(e.target).parents(".listItem");
            // 클릭한 과목명 가져오기
            const targetSubject = target.find(".subjectName").text().trim();

            // 모달창에 과목명 넣기
            $("#startModal").find(".subjectName").text(targetSubject);
            // 모달창에 타이머 시간 변경하기
            $("#startModal").find("#startModalTime").text();

            // 타이머 시작
            if (!timerRunning) {
                timerRunning = true;
                timerInterval = setInterval(() => {
                    seconds++;
                    // 모달창에 실시간으로 타이머 시간 변경하기
                    $("#startModal").find("#startModalTime").text(formatTime(seconds));
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

            alert(formatTime(seconds)+" 만큼 공부하였습니다!");

            // 모달창 닫기
            $("#modalBackground").hide();
            $("#startModal").hide(200);

            // 모달창에 타이머 시간 초기화
            seconds = 0;
            $("#startModal").find("#startModalTime").text(formatTime(seconds));
        });

        // 초 포맷팅 해주는 함수
        const formatTime = (seconds) => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
        }
    }
}

// 실행
$(document).ready(() => {
    new App();
});

