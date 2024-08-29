import React, { useEffect, useState } from "react";
import { useGame } from "../../../context/GameContext";
import axios from "axios";
import Chart from "chart.js/auto";

const AdminRevenue = () => {
    const [data, setData] = useState([]);
    const { games, fetchGames } = useGame();
    const [selectedDayStart, setSelectedDayStart] = useState('');
    const [selectedDayEnd, setSelectedDayEnd] = useState('');
    const [chartInstance, setChartInstance] = useState(null);

    const handledayStartChange = (event) => {
        setSelectedDayStart(event.target.value);
    };

    const handledayEndChange = (event) => {
        setSelectedDayEnd(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            // fetch game
            await fetchGames();
            // fetch order
            const result = await axios('order/');
            setData(result.data);
        };
        fetchData();
    }, [fetchGames]);

    const calculateTotalOrder = () => {
        return data.reduce((total, item) => total + item.total, 0);
    };

    const calculateTotalGameSold = () => {
        return games.reduce((total, item) => total + item.sold_quantity, 0);
    };

    useEffect(() => {
        if (selectedDayStart && selectedDayEnd && data.length > 0) {
            const startDate = new Date(selectedDayStart);
            const endDate = new Date(selectedDayEnd);
            const orderCounts = {};

            for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
                orderCounts[date.toLocaleDateString()] = 0;
            }

            data.forEach(order => {
                const orderDate = new Date(order.created_at).toLocaleDateString();
                if (orderDate in orderCounts) {
                    orderCounts[orderDate]++;
                }
            });

            const chartLabels = Object.keys(orderCounts);
            const chartData = {
                labels: chartLabels,
                datasets: [{
                    label: 'Order Quantity',
                    data: chartLabels.map(date => orderCounts[date]),
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgb(75, 192, 192)',
                    borderWidth: 1
                }]
            };

            if (chartInstance) {
                chartInstance.destroy();
            }

            const ctx = document.getElementById('orderQuantityChart');
            const newChartInstance = new Chart(ctx, {
                type: 'bar',
                data: chartData,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Order Quantity'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Date'
                            }
                        }
                    }
                }
            });
            setChartInstance(newChartInstance);
        }
    }, [selectedDayStart, selectedDayEnd, chartInstance, data]);

    return (
        <div className="">
            <h2 className="admin-revenue-title">Information</h2>
            <div className="admin-revenue-box">
                <span className="admin-revenue-info">Revenue: </span>
                <span className="admin-revenue-info">${calculateTotalOrder()}</span>
            </div>
            <div className="admin-revenue-box">
                <span className="admin-revenue-info">Game sold quantity: </span>
                <span className="admin-revenue-info">{calculateTotalGameSold()}</span>
            </div>
            <div className="admin-revenue-chart">
                <div className=""><span className="admin-revenue-info">Order quantity chart:</span></div>
                <div className="admin-revenue-chart-box">
                    <div className="admin-revenue-chart-select">
                        <div className="admin-revenue-chart-element" htmlFor="dayStartInput">Start Date:</div>
                        <div className="admin-revenue-chart-element" htmlFor="dayEndInput">End Date:</div>
                    </div>
                    <div className="admin-revenue-chart-select">
                        <div className="admin-revenue-chart-element">
                            <input type="date" id="dayStartInput" value={selectedDayStart} onChange={handledayStartChange} />
                        </div>
                        <div className="admin-revenue-chart-element">
                            <input type="date" id="dayEndInput" value={selectedDayEnd} onChange={handledayEndChange} />
                        </div>
                    </div>
                </div>
                <canvas id="orderQuantityChart"></canvas>
            </div>
        </div>
    );
}

export default AdminRevenue;
