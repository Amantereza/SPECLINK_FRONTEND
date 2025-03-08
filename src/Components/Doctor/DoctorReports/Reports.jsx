import React, { useContext, useEffect, useState } from 'react';
import Nav from '../DoctorNav/nav';
import { AuthContext } from '../../AuthContext/Context';
import axios from 'axios';
import '../DoctorReports/reports.css';
import Chart from "react-apexcharts";
import html2pdf from 'html2pdf.js'; // Import html2pdf

const BASE_URL = 'https://speclink-backend.onrender.com/specLink/';

function Reports() {
  const { user } = useContext(AuthContext);
  const monthly_stats = `${BASE_URL}daily_monthly_stats/${user?.user_id}`;
  const daily_appointment_trend = `${BASE_URL}Daily_Appointment_trend/${user?.user_id}`;
  const DAILY_REPORTS_URL = `${BASE_URL}Daily_Reports/${user?.user_id}`;

  const [monthlyStats, setMonthlyStats] = useState([]);
  const [selectedMonthlyStats, setSelectedMonthlyStats] = useState({ patients: 0, appointments: 0 });
  const [trends, setTrends] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [reports, setReports] = useState([]);
  const [download, setDownload] = useState(false)

  // Get current month and year
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const currentYear = new Date().getFullYear();
  const currentMonthKey = `${currentMonth} ${currentYear}`;

  // Fetch daily appointment trends
  const fetchTrends = async () => {
    try {
      const response = await axios.get(daily_appointment_trend);
      const { monthly_trends } = response.data;
      setTrends(monthly_trends);

      // Set the default selected month to the current month
      const currentMonthTrend = monthly_trends.find(trend => trend.month === currentMonthKey);
      if (currentMonthTrend) {
        setSelectedMonth(currentMonthTrend);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch monthly stats
  const fetchMonthlyStats = async () => {
    try {
      const response = await axios.get(monthly_stats);
      const data = response.data;
      setMonthlyStats(data);

      // Set default stats for the current month
      const currentMonthStats = data.find(stat => stat.month === currentMonthKey);
      if (currentMonthStats) {
        setSelectedMonthlyStats({
          patients: currentMonthStats.total_patients,
          appointments: currentMonthStats.total_appointments,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch daily reports
  const fetchReports = async () => {
    try {
      const response = await axios.get(DAILY_REPORTS_URL);
      const data = response.data;
      setReports(data);
    } catch (err) {
      console.log('err', err);
    }
  };

  // Format date as "Sat 8, March"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { weekday: 'short', day: 'numeric', month: 'long' });
  };

  // Download table as PDF
  const downloadTableAsPDF = async () => {
    setDownload(true); // Set loading state to true
  
    try {
      const element = document.getElementById('daily-reports-table');
      const options = {
        margin: [10, 10],
        filename: 'daily_reports.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' },
      };
  
      // Wait for the PDF generation to complete
      await html2pdf().from(element).set(options).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setDownload(false); // Set loading state to false
    }
  };

  useEffect(() => {
    fetchMonthlyStats();
    fetchReports();
    fetchTrends();
  }, []);

  // Handle month selection change for the monthly stats
  const handleMonthChange = (event) => {
    const selectedMonthKey = event.target.value;
    const selectedStats = monthlyStats.find(stat => stat.month === selectedMonthKey);

    if (selectedStats) {
      setSelectedMonthlyStats({
        patients: selectedStats.total_patients,
        appointments: selectedStats.total_appointments,
      });
    } else {
      setSelectedMonthlyStats({ patients: 0, appointments: 0 });
    }
  };

  // Handle month selection change for the chart
  const handleTrendChange = (event) => {
    const selectedMonthKey = event.target.value;
    const selectedTrend = trends.find(trend => trend.month === selectedMonthKey);
    setSelectedMonth(selectedTrend);
  };

  // Prepare data for the chart
  const chartData = {
    options: {
      chart: {
        id: "daily-appointments",
        toolbar: { show: false },
      },
      xaxis: {
        categories: selectedMonth
          ? selectedMonth.daily_trends.map(trend => formatDate(trend.date))
          : [],
        title: { text: "Date" },
      },
      yaxis: {
        title: { text: "Appointments" },
      },
      stroke: {
        curve: "smooth",
      },
      colors: ["#1E88E5"],
      legend: {
        position: "top",
        horizontalAlign: "right",
      },
      grid: {
        borderColor: "#f1f1f1",
      },
    },
    series: [
      {
        name: "Appointments",
        data: selectedMonth
          ? selectedMonth.daily_trends.map(trend => trend.count)
          : [],
      },
    ],
  };

  return (
    <>
      <Nav />
      <div className="container-fluid report_wrapper p-4 bg-white">
        <div className="row monthly_stats">
          <div className="col-lg-10">
            <h4 className='mt-2 p-2 text-white text-center bg-primary rounded'>Monthly Stats</h4>
            <div className="stats d-flex">
              <span>
                <h5>Monthly</h5>
                <p><strong>{currentMonthKey} - Stats Updated Daily</strong></p>
              </span>
              <div className="col-lg-2 col-md-2 col-sm-12 ms-auto">
                <select
                  id="autoSizingSelect"
                  className="form-select col-sm-6"
                  onChange={handleMonthChange}
                >
                  {/* Default option for current month */}
                  <option value={currentMonthKey}>{currentMonthKey}</option>

                  {/* Other months */}
                  {monthlyStats
                    .filter(stat => stat.month !== currentMonthKey)
                    .map(stat => (
                      <option key={stat.month} value={stat.month}>
                        {stat.month}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row report_st_row mt-3">
          <div className="col-lg-4 col-md-4 col-sm-12">
            <span className='report_st_span'>{selectedMonthlyStats.patients}</span>
            <h5>Total Patients</h5>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12">
            <span className='report_st_span'>{selectedMonthlyStats.appointments}</span>
            <h5>Total Appointments</h5>
          </div>
        </div>

        <div className="row report_nd_row mt-3">
          <div className="col-lg-10 col-sm-12 table-container table-responsive">
            <div className="download d-flex">
              <h4 className='text-primary'>Daily Reports</h4>
              <button
                className='ms-auto p-2 btn btn-secondary rounded text-white'
                onClick={downloadTableAsPDF}
              >
                {download ? 'Downloading...' : 'Download pdf'}
              </button>
            </div>
            <table id="daily-reports-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Total Patients</th>
                  <th>Total Appointments</th>
                  <th>Cancelled Appointments</th>
                  <th>Approved Appointments</th>
                  <th>Pending Appointments</th>
                  <th>Date</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{report.total_patients}</td>
                    <td>{report.total_appointments}</td>
                    <td>{report.appointments_by_status.Cancelled}</td>
                    <td>{report.appointments_by_status.Approved}</td>
                    <td>{report.appointments_by_status.Pending}</td>
                    <td>{formatDate(report.date)}</td>
                    <td>{report.current_month}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="row report_rd_row mt-4">
          <div className="col-lg-10 col-sm-12 d-flex">
            <h4 className='text-center p-2 rounded text-primary'>Appointments Overview</h4>
            <div className='col-lg-2 col-md-2 col-sm-12 ms-auto'>
              <select
                id="autoSizingSelect"
                className="form-select"
                onChange={handleTrendChange}
              >
                {/* Default option for current month */}
                <option value={currentMonthKey}>{currentMonthKey}</option>

                {/* Other months */}
                {trends
                  .filter(trend => trend.month !== currentMonthKey)
                  .map(trend => (
                    <option key={trend.month} value={trend.month}>
                      {trend.month}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <div className="col-lg-10 col-sm-12 bg-white">
            <Chart
              className="sm-12"
              options={chartData.options}
              series={chartData.series}
              type="area"
              height={300}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;