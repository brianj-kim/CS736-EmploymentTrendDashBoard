import { ChartOptions } from "chart.js";
import { Industry, Province } from "../components/Provinces";
import { ChartDataPoint, CustomChartData, DataSet, GroupedData } from "../provinces/[provinceId]/page";

export const getTopIndustriesByProvince = (industries: Industry[], province: Province) => {
    return industries.filter(industry => industry.GEO.includes(province.name)).sort((a,b) => a.VALUE - b.VALUE).slice(0,5);
}

export const findProvinceById = (provinceId: string, provinces: Province[]) => {
    return provinces.find((p) => p._id === provinceId)
}

// export const prepareChartData = (groupedData: GroupedData): CustomChartData => {
//     const labels = new Set<string>();
//     const datasets: DataSet[] = [];

//     Object.entries(groupedData).forEach(([occupation, data]) => {
//         const dataset: DataSet = {
//             label: occupation,
//             data: [],
//             borderColor: getRandomColor(),
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',  // Optional: Adjust based on your preference
//             fill: false,
//         };

//         Object.entries(data).forEach(([monthYear, value]) => {
//             labels.add(monthYear);
//             dataset.data.push({ x: monthYear, y: value });
//         });

//         datasets.push(dataset);
//     });

//     return {
//         labels: Array.from(labels).sort(),
//         datasets,
//     };
// };

export const prepareChartData = (groupedData: GroupedData): CustomChartData => {
    const datasets: DataSet[] = [];

    Object.entries(groupedData).forEach(([occupation, months]) => {
        const dataPoints: ChartDataPoint[] = Object.entries(months).map(([monthYear, value]) => {
            const [month, year] = monthYear.split('-');
            const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
            return { x: date, y: value };
        });

        datasets.push({
            label: occupation,
            data: dataPoints,
            borderColor: getRandomColor(),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            fill: false
        });
    });

    return { datasets };
};


export const getRandomColor = (): string => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export const chartOptions: ChartOptions<'line'> = {
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'month',
                displayFormats: {
                    month: 'MMM yyyy'
                }
            },
            title: {
                display: true,
                text: 'Month'
            }
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Value'
            }
        }
    },
    plugins: {
        legend: {
            position: 'top',
        }
    },
    responsive: true
};
  