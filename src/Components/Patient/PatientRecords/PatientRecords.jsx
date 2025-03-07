import React, { useEffect } from 'react';
import Nav from '../../Doctor/DoctorNav/nav';
import moment from 'moment';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import '../PatientRecords/record.css';
import useHook from '../../CustomHook/useHook';

function PatientRecords() {
  const { records, recordloader } = useHook();

  useEffect(() => {
    if (records.length > 0) {
      const tableId = '#myTable';

      // Destroy existing DataTable if it exists
      if ($.fn.DataTable.isDataTable(tableId)) {
        $(tableId).DataTable().destroy();
      }

      // Initialize DataTable
      $(tableId).DataTable({
        destroy: true,
      });
    }

    // Cleanup DataTable on component unmount
    return () => {
      if ($.fn.DataTable.isDataTable('#myTable')) {
        $('#myTable').DataTable().destroy();
      }
    };
  }, [records]);

  return (
    <>
      <Nav />
      <div className="row table_wrapper">
        <div className="row record_row mt-3">
          <div className="col-lg-10 col-sm-12">
            <h4>
              <strong>Patient Medical Records</strong>
            </h4>
          </div>
        </div>
        <div className="col-lg-10 bg-white p-2 mt-3 table-responsive">
          {recordloader ? (
            <div>
              <div className="loader"></div>
              <p className='text-center'>Loading records...</p>
            </div>
          ) : records.length === 0 ? (
            <h6>No records available</h6>
          ) : (
            <table id="myTable" className="table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th>Diagnosis</th>
                  <th>Treatment</th>
                  <th>Medication</th>
                  <th>Dosage</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {records.map((record) => {
                  const { diagnosis, treatment, created_at, dosage, medication } = record;
                  return (
                    <tr key={record.id}>
                      <td>{diagnosis}</td>
                      <td>{treatment}</td>
                      <td>{medication}</td>
                      <td>{dosage}</td>
                      <td>{moment(created_at).fromNow()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default PatientRecords;