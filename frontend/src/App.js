import logo from "./logo.svg";
import "./App.css";
import CreateAppointment from "./components/CreateAppointment";
import AppointmentsList from "./components/AppointmentsList";
import PatientsList from "./components/PatientsList";
import axios from "axios";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CreatePatient from "./components/CreatePatient";
import CreatePatientAppointment from "./components/CreatePatientAppointment";
import PatientAppointmentList from "./components/PatientAppointmentList";
import 'react-tabs/style/react-tabs.css';

export const API_BASE_URL = "http://localhost:8000";

const fetchAppointments = async () => {
  try {
    const result = await axios.get(API_BASE_URL + "/appointments/");
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const App = () => {
  console.log('inside home');
  const [appointments, setAppointments] = useState([]);

  const refetchAppointments = async () => {
    const appointments = await fetchAppointments();
    setAppointments(appointments);
  };

  useEffect(() => {
    refetchAppointments();
  }, []);

  return (
    <div className="App">
      <div className="App-logo">
        <img src={logo} alt="logo" />
      </div>
      <Tabs>
        <TabList>
            <Tab>Patient</Tab>
            <Tab>Appointment</Tab>
            <Tab>Book Patient Appointment</Tab>
          </TabList>
          <TabPanel>
               <CreatePatient/>
               <PatientsList />
          </TabPanel>
          <TabPanel>
            <CreateAppointment refetchAppointments={refetchAppointments} />
            <AppointmentsList appointments={appointments} />
          </TabPanel>
          <TabPanel>
             <CreatePatientAppointment appointments={appointments} />
            <PatientAppointmentList />
          </TabPanel>  
      </Tabs>
      
    </div>
  );
};

export default App;
