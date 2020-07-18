var ctx = document.getElementById("chartBar");

var numFemale = ctx.dataset.female;
var numMale = ctx.dataset.male;
var labels = ["male", "female"];
var data = [numMale, numFemale];

var firstChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Utilisateurs par sexe",
        data: data,
        backgroundColor: ["#ff6b81", "#70a1ff"],
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
    legend: {
      display: false,
    },
  },
});

var ctx = document.getElementById("doughnut");

var messLus = ctx.dataset.lus;
var messNonLus = ctx.dataset.nonlus;
var labels = ["lus", "non lus"];
var data = [messLus, messNonLus];

var firstChart = new Chart(ctx, {
  type: "doughnut",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Messages",
        data: data,
        backgroundColor: ["#2ecc71", "#e67e22"],
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

var ctx = document.getElementById("chartpie");

var nbExp = ctx.dataset.exp;
var nbNonExp = ctx.dataset.nonexp;
var labels = ["expédiées", "non expédiées"];
var data = [nbExp, nbNonExp];

var firstChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: labels,
    datasets: [
      {
        label: "Commandes",
        data: data,
        backgroundColor: ["#16a085", "#f1c40f"],
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

var ctx = document.getElementById("linechart");

var data = JSON.parse(ctx.dataset.chartviz);

var userCountByMonthLabels = [];
var userCountByMonthDataResults = [];

for (var i = 0; i < data.length; i++) {
  var date = new Date(data[i]._id.year, data[i]._id.month - 1, 1);
  var month = date.toLocaleString("default", { month: "long" });

  userCountByMonthLabels.push(month);

  userCountByMonthDataResults.push(data[i].CA);
}

var firstChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: userCountByMonthLabels,
    datasets: [
      {
        data: userCountByMonthDataResults,
        backgroundColor: "#f8c291",
        borderColor: "#e55039",
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
    legend: {
      display: false,
    },
  },
});
