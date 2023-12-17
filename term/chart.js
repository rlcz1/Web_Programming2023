$(document).ready(() => {
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
            makeChart(arr);
        },
        error: (err) => {
            console.log(err);
        }
    });

    formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    makeChart = (arr) => {
        arr.sort((a, b) => {
            return b.time - a.time;
        });

        let labels = [];
        let data = [];
        let max_time = 0;
        let max_subject = "";
        let max_subject_time = "";
        let total_time = 0;
        arr.forEach((obj) => {
            obj.times.forEach((time) => {
                total_time += time['time'];
                if(max_time < time['time']) max_time = time['time'];
            });
            if (max_subject_time < obj.time) {
                max_subject_time = obj.time;
                max_subject = obj.subject;
            }
            labels.push(obj.subject);
            data.push(obj.time/60);
        });

        $("#statTotalTime").text(this.formatTime(total_time));
        $("#statMaxTime").text(this.formatTime(max_time));
        $("#statMaxSubject").text(max_subject);

        $("#subjectStatsList").empty();
        arr.forEach((obj, idx) => {
            console.log(obj)
            $("#subjectStatsList").append(`
                <div class="subjectStatsItem">
                    <p>
                        <b>${idx+1}. ${obj.subject}</b> 
                        <span>${obj.dclass}</span>
                    </p>
                    <p> 
                        <span class="material-symbols-outlined">schedule</span>
                        <span id="statMaxTime">${this.formatTime(obj.time)}</span>
                    </p>
                </div>
            `);
        });

        /*chart.js 라이브러리의 샘플 코드 참고
        https://www.chartjs.org/docs/latest/samples/bar/floating.php */
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '통계',
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                },
                plugins:{
                    legend: {
                        display: false
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
