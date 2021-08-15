const AppointmentsList = ({ appointments }) => {
  return (
    <>
      <h2>Appointments</h2>
      <p>{appointments.length} appointment(s)</p>
      <p>
        <ul>
          {appointments.map((appointment) => {
            return <li><b>Start Time:</b> {appointment.start_time} <b>End Time:</b> {appointment.end_time}</li>;
          })}
        </ul>
      </p>
    </>
  );
};

export default AppointmentsList;
