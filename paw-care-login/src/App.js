import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import PetOwnerForm from './PetOwnerForm';
import WelcomePage from './WelcomePage';
import CreateCaregiverProfile from './CreateCaregiverProfile';
import SettingsPage from './SettingsPage';
import PetOwnerDashboard from './PetOwnerDashboard';
import CalendarPage from './CalendarPage';
import CaregiverDashboard from './caregiver_dashboard';
import PetProfileForm from './PetProfileForm';
import PetProfilePage from './PetProfilePage';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('#f8f8f8');
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/welcome');
  };

  const handleCancel = () => {
    navigate('/welcome');
  };

  const handleConfirmColorChange = (newColor) => {
    setBackgroundColor(newColor);
    navigate('/welcome');
  };

  return (
    <div
      className='app-container'
      style={{
        backgroundColor: backgroundColor,
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Routes>
        <Route path='/' element={<LoginPage onLogin={handleLogin} />} />
        <Route path='/signup' element={<SignUpPage onSignUp={() => {}} />} />
        <Route path='/welcome' element={<WelcomePage />} />
        <Route path='/create-pet-owner-profile' element={<PetOwnerForm />} />
        <Route
          path='/create-caregiver-profile'
          element={<CreateCaregiverProfile />}
        />
        <Route
          path='/settings'
          element={
            <SettingsPage
              onConfirmColorChange={handleConfirmColorChange}
              currentColor={backgroundColor}
              onCancel={handleCancel}
            />
          }
        />
        <Route path='/pet-owner-dashboard' element={<PetOwnerDashboard />} />
        <Route path='/calendar' element={<CalendarPage />} />
        <Route
          path='/caregiver_dashboard'
          element={<CaregiverDashboard />}
        />{' '}
        <Route path='/create-pet-profile' element={<PetProfileForm />} />
        <Route path='/pet-profile-page' element={<PetProfilePage />} />
      </Routes>
    </div>
  );
}

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
