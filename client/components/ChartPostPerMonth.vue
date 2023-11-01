<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
  
<script setup>
import Chart from 'chart.js/auto';
import { onMounted, ref } from 'vue';

const chartCanvas = ref(null);

onMounted(async () => {
    const { data: postData } = await useFetch('http://localhost:3001/api/admin/countPostPerMonth', {
        method: "GET"
    });
    const monthData = postData.value.data
    console.log(monthData);
    const data = {
        labels: Object.keys(monthData),
        datasets: [
            {
                label: 'Bài đăng trong tháng',
                data: Object.values(monthData),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(0, 162, 220, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',

                    'rgba(212, 90, 130, 0.6)',
                    'rgba(77, 157, 255, 0.6)',
                    'rgba(245, 169, 86, 0.6)',
                    'rgba(82, 112, 192, 0.6)',
                    'rgba(145, 99, 240, 0.6)',
                    'rgba(235, 140, 67, 0.6)',
                ]
            },
        ],
    };

    const ctx = chartCanvas.value.getContext('2d');

    // new Chart(ctx, {
    //   type: 'pie',
    //   data: data,
    // });
    new Chart(ctx, {
        type: 'pie',
        data: data,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Bài đăng trong tháng',
                    font: {
                        size: 16
                    }
                }
            },
            legend: {
                position: 'bottom', // Đặt vị trí của legend
                align: 'center', // Căn giữa legend
                labels: {
                    font: {
                        size: 12
                    }
                }
            }
        }
    });
});
</script>