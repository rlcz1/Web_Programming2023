/*
    chart.js 라이브러리의 샘플 코드 참고
    https://www.chartjs.org/docs/latest/samples/bar/floating.html
*/
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['시스템프로그래밍', '웹프로그래밍', '객체지향설계', '운영체제및실습'],
        datasets: [{
            label: '통계',
            data: [160, 120, 45, 22],
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