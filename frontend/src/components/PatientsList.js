import { useState, useEffect } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";

const fetchPatients = async () => {
  try {
    const result = await axios.get(API_BASE_URL + "/patients/");
    return result.data;
  } catch (e) {
    console.error(e);
    return [];
  }
};

const PatientsList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await fetchPatients();
      setPatients(result);
    })();
  }, []);

  return (
    <>
      <h2>Patients</h2>
      <p>{patients.length} patient(s)</p>
      <p>
        <ul>
          {patients.map((patient) => {
            return (<li>{patient.first_name} {patient.last_name}</li>);
          })}
        </ul>
      </p>
    </>
  );
};

export default PatientsList;
