class Score {
    constructor(student, score1, score2, score3) {
        this.student = student;
        this.score1 = score1;
        this.score2 = score2;
        this.score3 = score3;
    }
}

class App {
    constructor() {
        this.infoArray = [];
        this.addEvent();
    }

    addEvent() {
        $("#saveBtn").on("click", (e) => this.save(e));
        $("#searchBtn").on("click", (e) => this.search(e)); 
    }

    search = (e) => {
        const student = $("#searchInput").val();

        const data = new Score(student, subject1, subject2, subject3);

        const result = this.infoArray.find((item) => {
            return item.student === data.student;
        });

        this.createTableData(result);
    }

    save = (e) => {
        const student = $("#student").val();
        const subject1 = $("#subject1").val();
        const subject2 = $("#subject2").val();
        const subject3 = $("#subject3").val();

        const data = new Score(student, subject1, subject2, subject3);
        this.infoArray.push(data);

        alert("학생 정보가 저장되었습니다.");
    }

    createTableData = (result) => {
        $("table tbody").empty();
        $(result).each((index, item) => {
            $("table tbody").append(`
                <tr>
                    <td>${item.student}</td>
                    <td>${item.score1}</td>
                    <td>${item.score2}</td>
                    <td>${item.score3}</td>
                    <td>${Number(item.score1)+Number(item.score2)+Number(item.score3)}</td>
                </tr>`
            );
        });
    }
}


$(document).ready((e) => {
    new App();
});