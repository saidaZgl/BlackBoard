var ctx = document.getElementById("chartBar");

var chartBar = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Test",
        data: [10, 20, 30],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});
