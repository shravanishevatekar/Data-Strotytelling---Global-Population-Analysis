document.addEventListener('DOMContentLoaded', function() {

    // --- 1. DATA DEFINITION ---
    // Population data extracted from the HTML table (2018 vs 2022)
    const countries = ['USA', 'Brazil', 'China', 'Japan', 'India'];
    
    const populations2018 = [147000000, 135000000, 103000000, 97000000, 70000000];
    const populations2022 = [164850776, 140781840, 115237244, 112857416, 83387864];
    const percentageChange = [12.14, 4.28, 11.88, 16.35, 19.13];

    // Placeholder trend data for the Line Chart (approximated yearly growth)
    const trendData = {
        years: [2018, 2019, 2020, 2021, 2022],
        datasets: [
            { country: 'USA', data: [147000000, 150000000, 155000000, 160000000, 164850776], color: '#007bff' },
            { country: 'Brazil', data: [135000000, 136500000, 138000000, 139500000, 140781840], color: '#28a745' },
            { country: 'China', data: [103000000, 106000000, 109000000, 112000000, 115237244], color: '#ffc107' },
            { country: 'Japan', data: [97000000, 101000000, 105000000, 109000000, 112857416], color: '#dc3545' },
            { country: 'India', data: [70000000, 74000000, 78000000, 81000000, 83387864], color: '#6f42c1' }
        ]
    };


    // Helper function to format large population numbers for tooltips/labels
    const formatPopulation = (value) => {
        // Formats the number in millions with one decimal place
        return (value / 1000000).toFixed(1) + 'M';
    };
    
    // --- 2. LINE CHART (Figure 1: Population Trend Over Time) ---
    const lineChartCanvas = document.getElementById('lineChart');
    if (lineChartCanvas) {
        new Chart(lineChartCanvas, {
            type: 'line',
            data: {
                labels: trendData.years,
                datasets: trendData.datasets.map(dataset => ({
                    label: dataset.country,
                    data: dataset.data,
                    borderColor: dataset.color,
                    backgroundColor: dataset.color + '40', // Semi-transparent fill
                    tension: 0.4,
                    fill: false,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                }))
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Figure 1: Population Trend Over Time (2018-2022)',
                        font: { size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += formatPopulation(context.parsed.y) + ' people';
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        title: {
                            display: true,
                            text: 'Population (in Millions)'
                        },
                        ticks: {
                            callback: function(value) {
                                return formatPopulation(value);
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Year'
                        }
                    }
                }
            }
        });
    }

    // --- 3. BAR CHART (Figure 2: Percentage Growth Spike) ---
    const barChartCanvas = document.getElementById('barChart');
    if (barChartCanvas) {
        new Chart(barChartCanvas, {
            type: 'bar',
            data: {
                labels: countries,
                datasets: [{
                    label: 'Percentage Growth (2018-2022)',
                    data: percentageChange,
                    backgroundColor: [
                        '#007bff', // USA
                        '#28a745', // Brazil
                        '#ffc107', // China
                        '#dc3545', // Japan
                        '#6f42c1'  // India (Highest spike color)
                    ],
                    borderColor: '#333',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Figure 2: Population Percentage Change (2018-2022)',
                        font: { size: 16 }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Percentage Increase (%)'
                        }
                    }
                }
            }
        });
    }


    // --- 4. PIE CHART (Figure 3: Population Distribution in 2022) ---
    const pieChartCanvas = document.getElementById('pieChart');
    if (pieChartCanvas) {
        new Chart(pieChartCanvas, {
            type: 'pie',
            data: {
                labels: countries,
                datasets: [{
                    label: 'Population Share in 2022',
                    data: populations2022,
                    backgroundColor: [
                        '#007bff', // USA
                        '#28a745', // Brazil
                        '#ffc107', // China
                        '#dc3545', // Japan
                        '#6f42c1'  // India
                    ],
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Figure 3: Global Population Distribution in 2022',
                        font: { size: 16 }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                // Calculate the percentage share for the tooltip
                                const total = context.dataset.data.reduce((sum, value) => sum + value, 0);
                                const value = context.parsed;
                                const percentage = (value / total * 100).toFixed(1);
                                
                                return label + formatPopulation(value) + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }

});