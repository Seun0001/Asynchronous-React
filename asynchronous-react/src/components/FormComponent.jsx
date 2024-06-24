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

  // Handle form submission
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
    // Form Data: Resetting the form inputs after submission
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
 * Promises are not explicitly used in this project, but they are commonly used in web development for operations like data fetching.
 * For example, fetching data from an API might return a promise that resolves with the data or rejects with an error.
 */

/*
 * Async/Await:
 * Async/Await are syntactic sugars in JavaScript to work with Promises more comfortably.
 * They make asynchronous code look and behave more like synchronous code, making it easier to read and write.
 * Although not used in this project, async/await is commonly used in React applications for handling asynchronous operations such as data fetching.
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
