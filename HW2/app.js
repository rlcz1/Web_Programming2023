class App {
    constructor() {
        this.init();
        this.addEvent();
    }

    init() {
        this.makeCalender();
    }

    addEvent() {
        $("#monthSelect").on("change", this.makeCalender);
        $(document).on("click", "#calendar tbody td", this.selectDate);
        $(".modalCloseBtn").click(() => $(".modal").hide());
        $("#writeFrmBtn").click(this.writeTodo);
    }

    writeTodo = (e) => {
        e.preventDefault();

        const formData = new FormData($("#writeFrm")[0]);

        $.ajax({
            url: "write.php",
            type: "POST",
            data: formData,
            dataType : 'html',
            processData : false,
			contentType : false,
            enctype : 'multipart/form-data',
            success: (data) => {
                console.log(data);
                // $("#writeFrm").hide();
                // $("#modalBackground").show();
                // $("#calendarModal").show(200);
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    selectDate = (e) => {
        if ($(e.currentTarget).attr("class") == "no-date") return;

        const month = $("#monthSelect").val();
        const date = $(e.currentTarget).find(".date").text();

        $("#writeFrm").find("input[name=month]").val(month);
        $("#writeFrm").find("input[name=date]").val(date);

        $("#writeFrm").show();

        // let formData = new FormData($("#writeFrm")[0]);
        // formData.append("month", month);
        // formData.append("date", date);

        // $.ajax({
        //     url: "write.php",
        //     type: "POST",
        //     data: formData,
        //     dataType : 'html',
        //     processData : false,
		// 	contentType : false,
        //     enctype : 'multipart/form-data',
        //     success: (data) => {
        //         console.log(data);
        //         // $("#writeFrm").hide();
        //         // $("#modalBackground").show();
        //         // $("#calendarModal").show(200);
        //     },
        //     error: (err) => {
        //         console.log(err);
        //     }
        // });

        // const date = $(e.target).text();
        // const month = $("#monthSelect").val();
        // const year = new Date().getFullYear();

        // const selectedDate = new Date(year, month - 1, date);
        // const today = new Date();

        // if (selectedDate < today) {
        //     alert("오늘 이전의 날짜를 선택해주세요.");
        //     return;
        // }

        // const selectedDateStr = `${year}-${month}-${date}`;
        // $("#dateInput").val(selectedDateStr);
        // $("#calendarModal").hide(200);
        // $("#modalBackground").hide();
    }

    makeCalender = (e) => {
        const date = new Date();

        let month = 1;
        if (e != undefined) {
            month = e.target.value;
        }

        const year = date.getFullYear();

        const firstDate = new Date(year, month - 1, 1);
        const lastDate = new Date(year, month, 0);

        const firstDay = firstDate.getDay();
        const lastDay = lastDate.getDate();

        const calender = $("#calendar tbody");
        calender.empty();

        let dateNum = 1;
        for (let i = 0; i < 6; i++) {
            const tr = $("<tr>");
            for (let j = 0; j < 7; j++) {
                if (i == 0 && j < firstDay) {
                    tr.append(`
                        <td class="no-date">
                            <div class="date"></div>
                            <div></div>
                        </td>
                    `);
                } else if (dateNum > lastDay) {
                    tr.append(`
                        <td class="no-date">
                            <div class="date"></div>
                            <div></div>
                        </td>
                    `);
                } else {
                    tr.append(`
                        <td>
                            <div class="date">${dateNum++}</div>
                            <div></div>
                        </td>
                    `);
                }
            }
            $(calender).append(tr);
            $(calender).append("</tr>");
        }
    }
}

$(document).ready(() => {
    new App();
});