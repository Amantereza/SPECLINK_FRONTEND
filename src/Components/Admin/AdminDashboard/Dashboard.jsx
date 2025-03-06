import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import PersonIcon from '@mui/icons-material/Person';
import { Avatar } from '@mui/material';
import { Outlet } from 'react-router-dom';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Admin',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
    link: '/dashboard', // Link to the dashboard route
  },
  {
    segment: 'dashboard/profile',
    title: 'Profile',
    icon: <Avatar />,
    // <Avatar alt='image' src={`http://127.0.0.1:8000/${profile.profile_picture}`}/>,
    link: '/dashboard/profile', // Link to the profile route
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'User Management',
  },
  {
    segment: 'dashboard',
    title: 'Management',
    // icon: <BarChartIcon />,
    children: [
      {
        segment: 'doctor',
        title: 'Register Doctor',
        icon: <PersonIcon />,
      },
      {
        segment: 'manage_doctors',
        title: 'Manage Doctors',
        icon: <PersonIcon />,
      },
      {
        segment: 'manage_patients',
        title: 'Manage Patients',
        icon: <PersonIcon />,
      },
    ],
  },
  {
    segment: 'dashboard/logout',
    title: 'Logout',
    icon: <LayersIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutBasic(props) {
  const { window } = props;

  const demoWindow = window !== undefined ? window() : undefined;



  return (
    <AppProvider
     navigation={NAVIGATION}
    theme={demoTheme}
      window={demoWindow}
      branding={{
        title: 'SPECLINK', // Change the title to SPECLINK
        // logo: <CustomLogoComponent />, // Optionally, you can add a custom logo
        // homeUrl: '/', // Optionally, you can specify a home URL
      }}
    >
      <DashboardLayout>
        {/* Use Outlet to render nested routes */}
        <Outlet />
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutBasic.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutBasic;