<script>
import { HorizontalBar } from "vue-chartjs";

export default {
  extends: HorizontalBar,
  data() {
    return {
      chartData: {
        labels: ["A", "AA", "Japan", "USA"],
        datasets: [
          {
            borderWidth: 1,
            lineWidth: 10,
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
          display: true
        },
        responsive: true,
        maintainAspectRatio: true
      }
    };
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>