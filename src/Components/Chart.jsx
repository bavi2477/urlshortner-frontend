import React, { useState, useEffect } from 'react';
import axios from 'axios';
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

// Register the components needed for a Bar chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/url/stats');
        const data = response.data;

        // Transform the data as needed for the chart
        const transformedChartData = {
          labels: data.map(entry => entry.date),
          datasets: [
            {
              label: 'URL Clicks',
              data: data.map(entry => entry.count),
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1,
            },
          ],
        };

        setChartData(transformedChartData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chart-container" style={{ width: '400px', height: '250px', margin: 'auto' }}>
      <h2>URL Counts</h2>
      <div className="chart">
        {chartData.labels && chartData.datasets ? <Bar data={chartData} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Chart;