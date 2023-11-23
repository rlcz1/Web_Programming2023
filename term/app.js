class App {
    constructor() {
        this.addEvent();
        this.startModal();
        this.village();
        this.rank();
        this.stats();
    }

    addEvent() {

    }

    // 통게보기 모달창
    stats() {
        $(".statsBtn").click((e) => {
            e.preventDefault();

            // 클릭한 과목명 가져오기
            const target = $(e.target).parents(".listItem");
            const targetSubject = target.find(".subjectName").text().trim();

            // 모달창에 과목명 넣기
            $("#StatsModal").find(".subjectName p").text(targetSubject);

            //모달창 띄우기
            $("#modalBackground").show();
            $("#StatsModal").show(200);
        });

        $(".rankModalClose").click((e) => {
            $("#modalBackground").hide();
            $("#StatsModal").hide(200);
        });
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

            // 서버에서 데이터 가져오기
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
            alert("당근을 주었습니다.");

            // 서버로 넘김
        });

        // 상태 보기 클릭 이벤트
        $(document).on('click', '.viewStatusBtn', (e) => {
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

        // 캐릭터들 위치 지정. x값은 캐릭터 생성시기에 랜덤하게 지정
        const characterData = [
            { x: 0, y: 250 },
            { x: 0, y: 250 }
        ];

        // 애니메이션
        const animateCharacter = ($character, index) => {
            const randomDistance = Math.floor(Math.random() * 200) + 0; // 겹치지 않기 위해 0~150사이로 움직임
          
            // 좌우로 움직이는 애니메이션 적용
            $character.animate(
                { left: `+=${randomDistance}px` }, // 오른쪽으로 이동
                3000, () => {
                    // 이미지 flip
                    $($character).find("img").css('transform', 'scaleX(1)');
                    // 애니메이션 끝나면 왼쪽으로 다시 이동
                    $character.animate(
                        { left: `-=${randomDistance}px` }, // 왼쪽
                        3000, () => {
                            // 이미지 flip 복구
                            $($character).find("img").css('transform', 'scaleX(-1)');
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
                    <p class="chachaName">생활일본어 차차</p>
                    <img src="../images/chacha/인문대학.png" alt="chacha">
                    <div class="context">
                        <button class="giveCarrotBtn">당근 주기</button>
                        <button class="viewStatusBtn">상태 보기</button>
                    </div>
                </div>
            `);
        
            // 초기 위치 설정
            $character.css({
                left: character.x + 'px',
                top: character.y + 'px',
            });
        
            // 페이지에 캐릭터 추가
            $("#village").append($character);
            
            // 좌우로 움직이는 애니메이션 적용
            animateCharacter($character, index);
        }

        
        // 각 캐릭터에 대해 애니메이션을 적용
        characterData.forEach((character, index) => {
            // 캐릭터가 겹치지 않게 하기 위해x는 랜덤 값
            character.x = Math.floor(Math.random() * (window.innerWidth-700)) + 0; // 캐릭터의 넓이 500 + 움직일 거리 200 = 700
        
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

