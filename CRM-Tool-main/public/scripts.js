
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'item price',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            borderWidth: 1
        },
        {
            label: 'selling price',
            data: [15, 21, 5, 7, 8, 6],
            borderColor: [
                'rgba(54, 162, 235, 1)'
                ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
