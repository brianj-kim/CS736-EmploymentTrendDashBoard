import React from 'react';
import Plot from 'react-plotly.js';
import { TimeSeriesPoint } from '../types';

interface LineChartProps {
  data: TimeSeriesPoint[];
}

const LineChart: React.FC<LineChartProps> = ({ data }) => {
  // const plotData = [
  //   {
  //     type: 'scatter',
  //     mode: 'lines+markers',
  //     x: data.map((point) => point.date),
  //     y: data.map((point) => point.value),
  //     marker: { color: 'blue' },
  //   },
  // ];

  const plotData: Array<{
    type: any;
    mode: any;
    x: (string)[];
    y: number[];
    marker?: {
      color: string;
    };
  }> = [{
    type: 'scatter',
    mode: 'lines+markers',
    x: data.map((point) => point.date),
    y: data.map((point) => point.value),
    marker: { color: 'blue' },
  }];

  const layout = {
    titile: 'Employment Trends'
  }

  return <Plot data={plotData} layout={{ title: 'Employment Trends' }} />;
};

export default LineChart;
