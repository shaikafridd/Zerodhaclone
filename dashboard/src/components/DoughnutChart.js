import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, isDrawerOpen }) => {
  const chartData = {
    labels: data.map((stock) => stock.name),
    datasets: [
      {
        label: 'Price',
        data: data.map((stock) => stock.price),
        backgroundColor: [
          '#f48fb1', // Pink
          '#81d4fa', // Light Blue
          '#b39ddb', // Purple
          '#ffeb3b', // Yellow
          '#ffab91', // Peach
          '#c5e1a5', // Green
          '#80cbc4', // Teal
          '#ce93d8', // Light Purple
          '#ffe082', // Light Orange
          '#90caf9', // Blue
        ],
        borderWidth: 0,
        hoverOffset: 4
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          boxWidth: 30,
          font: {
            size: 10,
            family: 'Inter, sans-serif'
          },
          padding: 15
        }
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#eee',
        borderWidth: 1,
        padding: 10,
        displayColors: true,
      }
    },
    cutout: '50%', // Slightly thicker doughnut matching the screenshot
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  return (
    <div className="doughnut-chart-container">
      <div className="doughnut-chart-wrapper">
        {data.length > 0 ? (
          <Doughnut key={isDrawerOpen ? "open" : "closed"} data={chartData} options={options} />
        ) : (
          <div style={{ color: '#aaa', fontSize: '12px', marginTop: '50%' }}>Loading chart...</div>
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
