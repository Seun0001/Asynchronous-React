import React, { useState } from "react";
import "./FormComponent.css";

const FormComponent = () => {
  const [inputs, setInputs] = useState({ name: "", email: "" });
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState("");

  // Handle input change and update state
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Form Data: Updating the state with the new value from the form input
    setInputs({ ...inputs, [name]: value });
  };

  // Simulated async function to save data
  const saveData = async (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          resolve("Data saved successfully");
        } else {
          reject("Failed to save data");
        }
      }, 1000);
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
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

    // Async/Await: Call the async function to save data
    try {
      const message = await saveData(inputs);
      console.log(message);
      setError("");
      setSubmissions([
        ...submissions,
        { ...inputs, time: currentTime, error: errorMarker },
      ]);
      // Form Data: Resetting the form inputs after submission
      setInputs({ name: "", email: "" });
    } catch (error) {
      setError("Failed to save data. Please try again.");
      console.error(error);
    }
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
      <div className="SubmissionOverflow">
        <h2>Submissions:</h2>
        <div className="Table">
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
                  <td className="PX-2">{submission.name}</td>
                  <td className="PX-2">{submission.email}</td>
                  <td className="PX-2">{submission.time}</td>
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
    </div>
  );
};

export default FormComponent;

/*
 * JSON (JavaScript Object Notation):
 * JSON is a lightweight data interchange format that's easy for humans to read and write and easy for machines to parse and generate.
 * In this project, JSON is used implicitly when working with local storage (not shown in this snippet).
 * JSON allows us to work with data in a structured way, similar to objects in JavaScript.
 */

/*
 * Form Data:
 * Form data refers to the information that users enter into a form.
 * In this project, we collect the user's name and email from input fields and handle it using state (inputs, submissions).
 * The handleChange function updates the state with the form data, while handleSubmit processes and validates this data.
 */

/*
 * Promises:
 * Promises are objects representing the eventual completion or failure of asynchronous operations.
 * In this project, the saveData function returns a Promise that simulates saving data asynchronously.
 * The Promise either resolves (indicating success) or rejects (indicating failure).
 */

/*
 * Async/Await:
 * Async/Await are syntactic sugars in JavaScript to work with Promises more comfortably.
 * They make asynchronous code look and behave more like synchronous code, making it easier to read and write.
 * In this project, the handleSubmit function uses async/await to handle the asynchronous saveData function.
 * Example:
 * async function fetchData() {
 *   try {
 *     const response = await fetch('https://api.example.com/data');
 *     const data = await response.json();
 *     console.log(data);
 *   } catch (error) {
 *     console.error('Error fetching data:', error);
 *   }
 * }
 */
