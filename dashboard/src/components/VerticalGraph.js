import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const VerticalGraph = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: false,
          boxWidth: 20,
          boxHeight: 10,
          font: {
            family: 'Inter, sans-serif',
            size: 12,
          }
        }
      },
      title: {
        display: true,
        text: 'Holdings',
        color: '#444',
        font: {
          size: 16,
          family: 'Inter, sans-serif',
          weight: 500
        },
        padding: { bottom: 20 }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        titleColor: '#333',
        bodyColor: '#555',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        padding: 12,
        titleFont: { size: 14, family: 'Inter, sans-serif', weight: '600' },
        bodyFont: { size: 13, family: 'Inter, sans-serif' },
        displayColors: true,
        boxPadding: 4,
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#f0f0f0',
          drawBorder: false,
        },
        ticks: {
          font: { family: 'Inter, sans-serif', size: 11 },
          color: '#888',
          stepSize: 500
        }
      },
      x: {
        grid: {
          display: true,
          color: '#f0f0f0',
          drawBorder: false,
        },
        ticks: {
          display: false, // Hidden in the screenshot
        }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutQuart'
    }
  };

  const chartData = {
    labels: data.map((stock) => stock.name),
    datasets: [
      {
        label: 'Stock Price',
        data: data.map((stock) => stock.price),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
        barPercentage: 0.7,
        categoryPercentage: 0.9
      }
    ],
  };

  return (
    <div style={{ 
      marginTop: '50px', 
      padding: '30px', 
      background: 'white', 
      height: '450px'
    }}>
      {data.length > 0 ? (
        <Bar options={options} data={chartData} />
      ) : (
        <div style={{ color: '#aaa', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>No data available for chart</div>
      )}
    </div>
  );
};

export default VerticalGraph;
