import React, { useContext, useEffect, useState } from 'react';
import Nav from '../DoctorNav/nav';
import { AuthContext } from '../../AuthContext/Context';
import axios from 'axios';
import '../DoctorReports/reports.css';

const BASE_URL = 'http://127.0.0.1:8000/specLink/';

function Reports() {
  const { user } = useContext(AuthContext);
  const monthly_stats = `${BASE_URL}daily_monthly_stats/${user?.user_id}`;

  const [monthlyStats, setMonthlyStats] = useState([]);
  const [selectedMonthlyStats, setSelectedMonthlyStats] = useState({ patients: 0, appointments: 0 });

  // Months array
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Get current month and year
  const currentMonth = new Date().toLocaleString("en-US", { month: "long" });
  const currentYear = new Date().getFullYear();
  const currentMonthKey = `${currentMonth} ${currentYear}`;

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

  useEffect(() => {
    fetchMonthlyStats();
  }, []);

  // Handle month selection change
  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    const selectedStats = monthlyStats.find(stat => stat.month === selectedMonth);

    if (selectedStats) {
      setSelectedMonthlyStats({
        patients: selectedStats.total_patients,
        appointments: selectedStats.total_appointments,
      });
    } else {
      setSelectedMonthlyStats({ patients: 0, appointments: 0 });
    }
  };

  return (
    <>
      <Nav />
      <div className="container-fluid report_wrapper p-2 bg-white">
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
                  className="form-select"
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
              <h4>Daily Reports</h4>
              <button className='ms-auto p-2 btn btn-secondary rounded text-white'>Download</button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Total Patients</th>
                  <th>Total Appointments</th>
                  <th>Cancelled Appointments</th>
                  <th>Completed Appointments</th>
                  <th>Pending Appointments</th>
                  <th>Date</th>
                  <th>Month</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>34</td>
                  <td>23</td>
                  <td>34</td>
                  <td>2</td>
                  <td>4</td>
                  <td>Sat 8, 2025</td>
                  <td>March</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="row report_rd_row mt-3">
          <div className="col-lg-10">
            <h4 className='bg-primary text-center text-white p-2 rounded'>Appointments Overview</h4>
          </div>
          <div className="col-lg-10 col-sm-12">
            {/* Chart component can be added here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Reports;