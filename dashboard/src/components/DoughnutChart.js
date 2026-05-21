import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
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
    <div className="doughnut-container" style={{ padding: '30px 20px', borderTop: '1px solid #eee', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '100%', height: '350px', display: 'flex', justifyContent: 'center' }}>
        {data.length > 0 ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <div style={{ color: '#aaa', fontSize: '12px', marginTop: '50%' }}>Loading chart...</div>
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;
