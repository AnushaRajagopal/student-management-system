import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState({
    name: "",
    email: "",
    course: ""
  });

  const API = "http://localhost:8080/api/students";

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(API);
    setStudents(res.data);
  };

  const addStudent = async () => {
    if (!student.name || !student.email || !student.course) {
      alert("Please fill all fields");
      return;
    }

    await axios.post(API, student);
    setStudent({ name: "", email: "", course: "" });
    fetchStudents();
  };

  const deleteStudent = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <div className="form">
        <input
          type="text"
          placeholder="Student Name"
          value={student.name}
          onChange={(e) => setStudent({ ...student, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          value={student.email}
          onChange={(e) => setStudent({ ...student, email: e.target.value })}
        />

        <input
          type="text"
          placeholder="Course"
          value={student.course}
          onChange={(e) => setStudent({ ...student, course: e.target.value })}
        />

        <button onClick={addStudent}>Add Student</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id}>
              <td>{s.id}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.course}</td>
              <td>
                <button className="delete" onClick={() => deleteStudent(s.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;