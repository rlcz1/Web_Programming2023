class Score {
    constructor(student) {
        for (let key in student) {
            this[key] = student[key];
        }
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
        $("#addSubjectBtn").on("click", (e) => this.addSubject(e));
        $("#subjectDeleteBtn").on("click", (e) => this.deleteSubject(e));
    }

    addSubject = (e) => {
        const val = $("#addSubjectInput").val();

        Score.prototype[val] = 0;

        this.infoArray.forEach((score) => {
            score[val] = 0;
        });

        $("#subjectList").append(`
            <span>${val}</span>
            <input id="${val}" type="text">
        `);

        $("#theadTotal").remove();
        $("table thead tr").append(`<th>${val}</th>`);
        $("table thead tr").append(`<th id="theadTotal">총점</th>`);
    }

    deleteSubject = (e) => {
        this.infoArray.forEach((info) => {
            let cnt = 0;
            for (const key in info) {
                if (cnt > 3) {
                    console.log(key, info[key]);
                    delete info[key];
                }
                cnt++;
            }
        });

        $("table").empty();
        $("#subjectList input").each((index, item) => {
            if (index > 2) $(item).remove();
        });
        $("#subjectList span").each((index, item) => {
            if (index > 2) $(item).remove();
        });

    }

    save = (e) => {
        let student = {};

        student['name'] = $("#student").val();
        $("#subjectList input").each((index, item) => {
            const val = $(item).val();
            const id = $(item).attr("id");

            student[id] = val;
        });

        const data = new Score(student);

        this.infoArray.push(data);

        console.log(this.infoArray);

        alert("학생 정보가 저장되었습니다.");
    }

    search = (e) => {
        const student = $("#searchInput").val();

        const result = this.infoArray.find((item) => {
            console.log(item.name, student);
            return item.name == student;
        });

        $("table").empty();
        if (result != undefined) this.createTableData(result);
        
    }

    createTableData = (result) => {
        $("table").empty();
        const thead = $("<thead>");
        const tbody = $("<tbody>");

        const theadTr = $("<tr>");
        const tbodyTr =  $("<tr>");

        theadTr.append('<th>이름</th>');
        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                if (key != "name") theadTr.append(`<th>${key}</th>`);
            }
        }
        theadTr.append('<th>총점</th>');

        let total = 0;
        for (const key in result) {
            if (result.hasOwnProperty(key)) {
                console.log(key, result[key], Number(result[key]));
                if (key != "name") total += Number(result[key]);
                
                tbodyTr.append(`<td>${result[key]}</td>`);
            }
        }

        tbodyTr.append(`<td>${total}</td>`);
        thead.append(theadTr);
        thead.append('</tr>');
        tbody.append(tbodyTr);
        tbody.append('</tr>');
        $("table").append(thead);
        $("table").append(tbody);
    }
}

$(document).ready((e) => {
    new App();
});