<template>
    <div>
        
        <h3 class="flex justify-center items-center text-lg">Bài đăng trong 14 ngày qua</h3>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
  
<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';

const chartCanvas = ref(null);

onMounted(async () => {
    const { data: getPostData } = await useFetch('http://localhost:3001/api/admin/getChartData', {
        method: "GET"
    });

    const ChartData = getPostData.value;
    const labels = Object.keys(ChartData);
    const dataValues = Object.values(ChartData);

    const ctx = chartCanvas.value.getContext('2d');

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Số bài đăng',
                data: dataValues,
                // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                // borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
                borderRadius: 2
            },
        ],
    };

    new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.max(...dataValues) + 1,
                },
            },
        },
    });
});

</script>
  