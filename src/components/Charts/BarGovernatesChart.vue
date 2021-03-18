<script>
import { HorizontalBar } from "vue-chartjs";

export default {
  extends: HorizontalBar,
  data() {
    return {
      chartData: {
        labels: [
          "القاهرة",
          "الاسكندرية",
          "أسيوط",
          "شمال سيناء",
          "أسوان",
          "المنيا",
          "جنوب سيناء"
        ],
        datasets: [
          {
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(54, 162, 235, 1)"
            ],
            data: [1000, 500, 1500, 800, 2000, 100]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: "المحافظات",
          fontFamily: "Tajawal",
          fontColor: "#747e87"
        },
        scales: {
          xAxes: [
            {
              categoryPercentage: 0.8,
              barPercentage: 0.8,
              gridLines: {
                display: false
              },
              ticks: {
                display: false,
                beginAtZero: true
              }
            }
          ],
          yAxes: [
            {
              categoryPercentage: 0.8,
              barPercentage: 0.8,
              gridLines: {
                display: false
              },
              ticks: {
                display: false,
                beginAtZero: true
              }
            }
          ]
        },
        responsive: true,
        maintainAspectRatio: true,
        modalFooter: false
      }
    };
  },

  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
