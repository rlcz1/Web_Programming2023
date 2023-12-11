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
        $(document).on("click", "li.todo_item", this.viewTodo);
        $(document).on("dragstart", "li.todo_item", this.dragStart);
        $(document).on("dragover", "td", this.dragOver);
        $(document).on("dragenter", "li.todo_item", this.dragEnterItem);
        $(document).on("dragleave", "li.todo_item", this.dragLeaveItem);
        $(document).on("drop", "td", this.drop);
        $(document).on("drop", "li.todo_item", this.dropItem);
        $(document).on("click", "#list .todo_list .todo_item", this.deleteTodo);
        $(document).on("click", "#list .delete_list .todo_item", this.deleteCancel);
        $(".modalCloseBtn").click(() => $(".modal").hide());
        $("#writeFrmBtn").click(this.writeTodo);
        $(".modifyBtn").click(this.viewModifyFrm);
        $("#modifyModalSaveBtn").click(this.modifyTodo);
    }

    deleteCancel = (e) => {
        e.stopPropagation();
        const id = $(e.currentTarget).data("id");

        console.log(id, e.currentTarget);

        $.ajax({
            url: "deleteCancel.php",
            type: "POST",
            data: {
                id: id
            },
            success: (data) => {
                console.log(data);
                alert("미완료로 표시됩니다.");
                this.makeCalender();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    deleteList = () => {
        $("#list .delete_list").empty();

        $.ajax({
            url: "getDeleteList.php",
            type: "GET",
            success: (datas) => {
                const todo = JSON.parse(datas);
                if (todo[0] == null) return;

                $(todo).each((idx, data) => {
                    $("#list .delete_list").append(`
                        <div class="todo_item" data-id="${data.id}">${data.title}</div>
                    `);
                });
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    deleteTodo = (e) => {
        e.stopPropagation();
        const id = $(e.currentTarget).data("id");

        $.ajax({
            url: "delete.php",
            type: "POST",
            data: {
                id: id
            },
            success: (data) => {
                console.log(data);
                alert("삭제되었습니다.");
                this.makeCalender();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    dropItem = (e) => {
        e.stopPropagation();

        $(e.target).removeClass("dragOverItem");

        const data = e.originalEvent.dataTransfer.getData("text");
        const prevDate = e.originalEvent.dataTransfer.getData("prevDate");
        const id = $("#"+data).data("id");
        const targetId = $(e.target).data("id");

        $(e.target).parent().append($("#"+data));

        let day = $(e.target).parent().parent().find(".date").text();
        let month = $("#monthSelect").val();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        const targetDate = `2023-${month}-${day}`;

        // 같은 요일일때
        if (Number(prevDate) == Number(day)) {
            $.ajax({
                url: "dropItemSame.php",
                type: "POST",
                data: {
                    id: id,
                    targetId: targetId,
                },
                success: (data) => {
                    console.log(data);
                    this.makeCalender();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        } else {
            $.ajax({
                url: "dropItem.php",
                type: "POST",
                data: {
                    id: id,
                    targetId: targetId,
                },
                success: (data) => {
                    console.log(data);
                    this.makeCalender();
                },
                error: (err) => {
                    console.log(err);
                }
            });
        }


        console.log(day, prevDate)
        return;
    }

    dragLeaveItem = (e) => {    
        e.stopPropagation();
        $(e.target).removeClass("dragOverItem");
    }

    dragEnterItem = (e) => {
        e.stopPropagation();
        $(e.target).addClass("dragOverItem");
    }

    drop = (e) => {
        e.stopPropagation();
        console.log("drop")

        const data = e.originalEvent.dataTransfer.getData("text");
        const prevDate = e.originalEvent.dataTransfer.getData("prevDate");

        $(e.target).find(".todoContainer").append($("#"+data));

        const id = $("#"+data).data("id");

        let day = $(e.target).find(".date").text();
        let month = $("#monthSelect").val();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        let dateFlag = false;

        // 같은 요일일때
        if (Number(prevDate) == Number(day)) {
            dateFlag = true;
        } 

        const targetDate = `2023-${month}-${day}`;

        $.ajax({
            url: "drop.php",
            type: "POST",
            data: {
                id: id,
                targetDate: targetDate,
                dateFlag: dateFlag,
            },
            success: (data) => {
                console.log(data);
                this.makeCalender();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    dragOver = (e) => {
        e.preventDefault();
        $(e.target).removeClass("dragging");
    }

    dragStart = (e) => {
        $(e.target).addClass("dragging");
        e.originalEvent.dataTransfer.setData("text", $(e.target).attr("id"));

        const prevDate = $(e.target).parent().parent().find(".date").text();
        e.originalEvent.dataTransfer.setData("prevDate", prevDate);
    }

    modifyTodo = (e) => {
        console.log("modifyTodo");
        e.preventDefault();

        const formData = new FormData($("#modifyModal")[0]);

        $.ajax({
            url: "modify.php",
            type: "POST",
            data: formData,
            dataType : 'html',
            processData : false,
            contentType : false,
            enctype : 'multipart/form-data',
            success: (data) => {
                $("#modifyModal").hide();
                console.log(data);
                alert("수정되었습니다.");
                this.makeCalender();
            },
            error: (err) => {
                console.log(err);
            }
        });
    }


    viewModifyFrm = () => {
        $("#modifyModal .modifyFileName").hide();
        $("#modifyModal #viewModalBtns").hide();
        $("#modifyModal #modifyModalBtns").show();
        $("#modifyModal input[type=file]").show();
        $("#modifyModal input").removeAttr("disabled");
        $("#modifyModal textarea").removeAttr("disabled");
        $("#modifyModal select").removeAttr("disabled");
    }

    viewTodo = (e) => {
        e.stopPropagation();

        $("#modifyModal .modifyFileName").show();
        $("#modifyModal #viewModalBtns").show();
        $("#modifyModal #modifyModalBtns").hide();
        $("#modifyModal input[type=file]").hide();
        $("#modifyModal input").attr("disabled", "disabled");
        $("#modifyModal textarea").attr("disabled", "disabled");
        $("#modifyModal select").attr("disabled", "disabled");

        const id = $(e.currentTarget).data("id");

        $.ajax({
            url: "view.php",
            type: "GET",
            data: {
                id: id
            },
            success: (data) => {
                console.log(JSON.parse(data));
                const todo = JSON.parse(data);

                $("#modifyModal").show();
                $("#modifyModal input[name=title]").val(todo.title);
                $("#modifyModal textarea").val(todo.description);
                $("#modifyModal select").val(todo.category);
                $("#modifyModal a.modifyFileName").attr("href", `images/${todo.file_name}`);
                $("#modifyModal a.modifyFileName").text(todo.file_name);

                $("#modifyModal input[name=id]").val(todo.id);
            },
            error: (err) => {
                console.log(err);
            }
        });
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
                $("#writeFrm").hide();
                alert("저장되었습니다.");
                this.makeCalender();
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
    }

    makeCalender = (e) => {
        const date = new Date();

        let month = $("#monthSelect").val();
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
        $("#list div").empty();

        let dateNum = 1;
        for (let i = 0; i < 6; i++) {
            const tr = $("<tr>");
            for (let j = 0; j < 7; j++) {
                if (i == 0 && j < firstDay || dateNum > lastDay) {
                    tr.append(`
                        <td class="no-date">
                            <div class="date"></div>
                            <ol class="todoContainer"></ol>
                        </td>
                    `);
                } else {
                    tr.append(`
                        <td>
                            <div class="date">${dateNum++}</div>
                            <ol class="todoContainer"></ol>
                        </td>
                    `);
                }
            }
            $(calender).append(tr);
            $(calender).append("</tr>");
        }

        this.getTodoItem();
        this.deleteList();
    }

    getTodoList = () => {
        $.ajax({
            url: "getTodoList.php",
            type: "GET",
            success: (datas) => {
                const todo = JSON.parse(datas);
                if (todo[0] == null) return;

                $(todo).each((idx, data) => {
                    $("#list .todo_list").append(`
                        <div class="todo_item" data-id="${data.id}">${data.title}</div>
                    `);
                });
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    getTodoItem = () => {
        this.getTodoList();

        $("#calendar tbody td").each((index, item) => {
            const month = $("#monthSelect").val();
            const date = $(item).find(".date").text();

            $.ajax({
                url: "calendar.php",
                type: "GET",
                data: {
                    month: month,
                    date: date
                },
                success: (datas) => {
                    if (datas == "") return;
                    const todo = JSON.parse(datas);
                    if (todo[0] == null) return;

                    $(todo).each((idx, data) => {
                        $(item).find(".todoContainer").append(`
                            <li id="${month+'-'+date+'-'+data.id}" class="todo_item ${data.category}" data-id="${data.id}" draggable="true">${data.title}</li>
                        `);
                    });
                },
                error: (err) => {
                    console.log(err);
                }
            });
        });
    }
}

$(document).ready(() => {
    new App();
});