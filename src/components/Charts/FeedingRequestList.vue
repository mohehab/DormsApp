<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  data() {
    return {
      chartData: {
        labels: ["A", "AA", "Japan", "USA"],
        datasets: [
          {
            borderWidth: 1,
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)"
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)"
            ],
            data: [1000, 500, 1500, 1000]
          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: "bottom",
          boxWidth: 10
        },
        responsive: true,
        maintainAspectRatio: true,
        title: {
          display: true,
          text: "القائمه",
          fontFamily: "Tajawal",
          fontColor: "#747e87"
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>
