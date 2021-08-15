import { useState, useEffect } from "react";
import { API_BASE_URL } from "../App";
import axios from "axios";

const createPatient = async (firstName, lastName) => {
  try {
    const result = await axios.post(API_BASE_URL + "/patients/", {
      first_name: firstName.target.value,
      last_name: lastName.target.value,
    });
    return result.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const CreatePatient = ( ) => {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    setSubmitMessage("");
    setFirstName = (event) => this.setState({firstName : event.target[0].value});
    setLastName = (event) => this.setState({lastName : event.target[1].value});

    const result = await createPatient(firstName, lastName);
    if (!result) {
      setIsLoading(false);
      setSubmitMessage("Unable to create patient");
      return;
    }

    setSubmitMessage("Created Patient: " + JSON.stringify(result));
    setIsLoading(false);
  };


  return (
    <>
      <h2>Create a new Patient</h2>
      <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First name:</label>
          <input
              type="text"
              id="firstName"
              value={CreatePatient.firstName}
              onChange={setFirstName}
          /><br/><br/>
            <label htmlFor="lastName">Last name:</label>
          <input
              type="text"
              id="lastName"
              value={CreatePatient.lastName}
              onChange={setLastName}
          /><br/><br/>
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
      {submitMessage && (
        <p>
          <i>{submitMessage}</i>
        </p>
      )}
    </>
  );
};

export default CreatePatient;
