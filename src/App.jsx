import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayoutBasic from './Components/Admin/AdminDashboard/Dashboard';
import Profile from './Components/Admin/Profile/Profile';
import Content from './Components/Admin/AdminDashboard/DashboardContet/Content';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import { AuthProvider } from './Components/AuthContext/Context';
import DoctorRegistser from './Components/Admin/UserManagement/DoctorRegistser';
import ManageDoctor from './Components/Admin/UserManagement/ManageDoctor';
import ManagePatients from './Components/Admin/UserManagement/ManagePatients';
import Logout from './Components/Auth/Logout';
import Home from './Components/HomePage/home';
import Dashboard from './Components/Doctor/DoctorDashboard/Dashboard';
import Records from './Components/Doctor/PatientRecords/Records';

import PrivateRoute from './Components/PrivateRoutes/PrivateRoutes';
import './App.css'
import DoctorAppointments from './Components/Doctor/DoctorAppointments/DoctorAppointments';
import PatientDashboard from './Components/Patient/Dashboard/PatientDashboard';
import PatientAppointments from './Components/Patient/Appointments/PatientAppointments';
import DoctorProfile from './Components/Doctor/DoctorProfile/DoctorProfile';
import PatientProfile from './Components/Patient/PatientProfile/PatientProfile';
import PatientRecords from './Components/Patient/PatientRecords/PatientRecords';
import Reports from './Components/Doctor/DoctorReports/Reports';
import ServicesPage from './Components/HomePage/services';
import ContactPage from './Components/contact/ContactForm';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/ContactForm" element={<ContactPage />} />
          {/* Parent route for the admin dashboard */}
          <Route path="/dashboard" element={<DashboardLayoutBasic />}>
            <Route index element={<Content />} />
            <Route path="profile" element={<Profile />} />
            <Route path="doctor" element={<DoctorRegistser />} />
            <Route path="manage_doctors" element={<ManageDoctor />} />
            <Route path="manage_patients" element={<ManagePatients />} />
            <Route path="logout" element={<Logout />} />
          </Route>

          {/* Parent route for the doctor dashboard */}
          <Route path="/doctor/*" element={
            <PrivateRoute>
              <div className="doctor-content">
            <Routes>
            <Route path="dashboard" element={<Dashboard />} /> 
            <Route path="patient_records" element={<Records />} /> 
            <Route path='appointments' element={<DoctorAppointments/>}/>
            <Route path='profile' element={<DoctorProfile/>}/>
            <Route path='reports' element={<Reports/>}/>
            <Route path="logout" element={<Logout />} />
            </Routes>
              </div>
            </PrivateRoute>
          }/>

          {/* Parent route for the patient dashboard */}
          <Route path="/patient/*" element={
            <PrivateRoute>
              <div className="patient-content">
            <Routes>
            <Route path="dashboard" element={<PatientDashboard/>} /> 
            <Route path="patient_appointments" element={<PatientAppointments/>} /> 
            <Route path='records' element={<PatientRecords/>}/> 
            <Route path='profile' element={<PatientProfile/>}/>
            <Route path="logout" element={<Logout />} />
            </Routes>
              </div>
            </PrivateRoute>
          }/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;