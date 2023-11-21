$(document).ready(() => {
    $("#search").keyup(() => {
        const option = $("input[name='radio']:checked").val();
        const search_val = $("#search").val();

        $.ajax({
            url: "result.php",
            type: "GET",
            data: {option:option, value:search_val},
            dataType: "text",
        }).done((data, status) => {
            search(JSON.parse(data), option);
        }).fail((xhr, status, error) => {
        });
    });

    $("#add_btn").click(() => {
        const name = $("#name_input").val();
        const dept = $("#dept_input").val();

        $.ajax({
            url: "add.php",
            type: "POST",
            data: {name:name, dept:dept},
            dataType: "text",
        }).done((data, status) => {
            add(JSON.parse(data));
        }).fail((xhr, status, error) => {
        });
    });
    
    const add = (data) => {
        $("#add_result").empty();
        $("#add_result").append(`
            <p>저장 : ${data.dept}, ${data.name}</p>
        `);
    }

    const search = (data, option) => {
        $("#result").empty();
        const search_val = $("#search").val();
        if (search_val == "") return;

        $(data).each((index, value) => {
            if (option == "name") {
                $("#result").append(`
                    <p>${index+1}. ${value['name']}, <span style="color:blue">${value['name']}</span></p>
                `);
            } else if (option == "dept") {
                $("#result").append(`
                    <p>${index+1}. <span style="color:blue">${value['dept']}</span>, ${value['name']}</p>
                `);
            }
        });
    }
});

