import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";


const getPatientAppointment = async () => {
  try {
    const result = await axios.get(API_BASE_URL + "/patientappointments/");
    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const CreatePatientAppointment = () => {
  const [patientAppointment, setPatientAppointment] = useState([]);

  useEffect(() => {
    (async () => {
      const result = await getPatientAppointment();
      console.log(result);
      setPatientAppointment(result);
    })();
  }, []);

  return (
    <>
      <h2>List of patient appointments</h2>
      <p>{patientAppointment.length} patientAppointment(s)</p>
      <p>
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Start Time</th>
            <th>End Time</th>

          </tr>
          {patientAppointment.map((patientAppointment) => {
              return (<tr>
                      <td>{patientAppointment.patient.first_name}</td>
                      <td>{patientAppointment.patient.last_name}</td>
                      <td>{patientAppointment.appointment.start_time}</td>
                      <td>{patientAppointment.appointment.end_time}</td>
                    </tr>);
          })}
        </table>

      </p>
    </>
  );
}

export default CreatePatientAppointment;