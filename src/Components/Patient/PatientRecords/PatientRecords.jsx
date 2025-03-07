import React, { useContext, useEffect, useState } from 'react'
import Nav from '../../Doctor/DoctorNav/nav'
import { AuthContext } from '../../AuthContext/Context'
import axios from 'axios'
import moment from 'moment'
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';

import '../PatientRecords/record.css'


function PatientRecords() {
    const {user} = useContext(AuthContext)
    const medical_records_list = `http://127.0.0.1:8000/specLink/patient_records/${user?.user_id}`

    const [records, setRecords] = useState([])
    const [loader, setLoader] = useState(false)

    const fetchRecords = async()=>{
        setLoader(true)
        try{
            const response = await axios.get(medical_records_list)
            const {medical_records} = response.data
            setRecords(medical_records)
            setLoader(false)
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
    fetchRecords()
    }, [])

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
    <Nav/>
    <div className="row table_wrapper ">
        <div className="col-lg-10 bg-white p-2 mt-3 table-responsive">
            {records.length === 0 ? (<h6>No records available</h6>) : (<>
             {loader ? (<div className='loader'></div>) : (<>
                <table id='myTable' className='table-striped table-hover table-bordered'>
        <thead>
        <tr>
            <th>Diagnosis</th>
            <th>Treatment</th>
            <th>medication</th>
            <th>Dosage</th>
            <th>created_at</th>
          </tr>
        </thead>
        <tbody>
        {records.map(record =>{
                const {diagnosis, treatment, created_at, dosage, medication} = record
                return (
                    <>
                     <tr>
            <td>{diagnosis}</td>
            <td>{treatment}</td>
            <td>{medication}</td>
            <td>{dosage}</td>
            <td>{moment(created_at).fromNow()}</td>
          </tr>
                    </>
                )
            })}
        </tbody>
      </table>
             </>)}
            </>)}
       
        </div>
    </div>
    </>
  )
}

export default PatientRecords
