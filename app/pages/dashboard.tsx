import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from '../components/LineChart';
import { TimeSeriesPoint } from '../types';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<TimeSeriesPoint[]>([]);

  useEffect(() => {
    axios.get('/api/data')
      .then(response => setData(response.data.data))
      .catch(error => console.error("Failed to fetch data:", error));
  }, []);

  return (
    <div>
      <h1>Employment Trend Dashboard</h1>
      <LineChart data={data} />
    </div>
  );
};

export default Dashboard;
