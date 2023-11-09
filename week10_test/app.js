$(document).ready(() => {
    $("#search").keyup(() => {
        $.ajax({
            url: "data.json",
            type: "GET",
            dataType: "json",
            success: (data) => {
                search(data);
            }
        });
    });

    $("input[name='radio']").change(() => {
        $.ajax({
            url: "data.json",
            type: "GET",
            dataType: "json",
            success: (data) => {
                search(data);
            }
        });
    });

    const search = (data) => {
        $("#result").empty();

        const option = $("input[name='radio']:checked").val();
        const search_val = $("#search").val();
        let result = [];

        $(data).each((index, value) => {
            if (search_val == "") return;
            if (option === "name") {
                if (value.name.toLowerCase().startsWith(search_val.toLowerCase()) == true) {
                    result.push(value);
                }
            } else if (option === "dept") {
                if (value.dept.toLowerCase().startsWith(search_val.toLowerCase()) == true) {
                    result.push(value);
                }
            }
        });

        $(result).each((index, value) => {
            if (option == "name") {
                $("#result").append(`
                    <p>${index+1}. ${value.dept}, <span style="color:blue">${value.name}</span></p>
                `);
            } else if (option == "dept") {
                $("#result").append(`
                    <p>${index+1}. <span style="color:blue">${value.dept}</span>, ${value.name}</p>
                `);
            }
        });
    }
});

