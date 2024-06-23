import React, { useState } from "react";
import "./FormComponent.css";


const FormComponent = () => {
  const [inputs, setInputs] = useState({ name: "", email: "" });
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleString();
    const errorMarker = validateInputs(inputs) ? "0%" : "100%";
    if (errorMarker === "100%") {
      setError("Invalid input. Please ensure all fields are filled correctly.");
      return;
    }
      // Check if the name and email combination already exists
    const exists = submissions.some(
      (submission) =>
        submission.name === inputs.name && submission.email === inputs.email
    );
    if (exists) {
      setError("This name and email combination already exists in the submissions.");
      return;
    }
    setError("");
    setSubmissions([
      ...submissions,
      { ...inputs, time: currentTime, error: errorMarker },
    ]);
    setInputs({ name: "", email: "" });
  };

  const validateInputs = (inputs) => {
    // Simple validation: check if name and email are not empty
    if (inputs.name.trim() === "" || inputs.email.trim() === "") {
      return false;
    }
    // Check if the email is a Gmail address
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!gmailPattern.test(inputs.email)) {
      return false;
    }
    return true;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="userID">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </div>
        <div className="userMail">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Gmail"
            name="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="userSubmission">
          Submit
        </button>
      </form>
      <div>
        <h2>Submissions:</h2>
        <table className="submissions-table">
          <caption>Submissions</caption>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Time</th>
              <th>Error Marker</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((submission, index) => (
              <tr key={index}>
                <td>{submission.name}</td>
                <td>{submission.email}</td>
                <td>{submission.time}</td>
                <td
                  className={
                    submission.error === "0%" ? "blink-green" : "blink-red"
                  }
                >
                  {submission.error}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormComponent;
