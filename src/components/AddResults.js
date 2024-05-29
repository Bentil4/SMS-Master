import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
// import Sidebar from './Sidebar';

function AddResults() {
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [formData, setFormData] = useState({
    subjects: [
      { subjectName: '', classScore: '', examScore: '', totalScore: '' },
    ],
  });

  useEffect(() => {
    // Fetch students from the database
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          'http://localhost:8080/api/v1/student/allStudent'
        ); // Adjust the URL as necessary
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log('Fetched students:', data); // Log the fetched data
        setStudents(data);
      } catch (error) {
        console.error('Error fetching students:', error);
        setStudents([]); // Ensure students is set to an array even on error
      }
    };

    fetchStudents();
  }, []);

  const handleInput = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = formData.subjects.map((subject, i) =>
      i === index ? { ...subject, [name]: value } : subject
    );
    setFormData({ ...formData, subjects: updatedSubjects });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that a student is selected
    if (!selectedStudentId) {
      Swal.fire({
        title: 'Error!',
        text: 'Please select a student',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
      return;
    }

    // Validate that all fields are filled
    for (let subject of formData.subjects) {
      if (
        !subject.subjectName ||
        !subject.classScore ||
        !subject.examScore ||
        !subject.totalScore
      ) {
        Swal.fire({
          title: 'Error!',
          text: 'Please fill in all fields',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
        return;
      }
    }

    try {
      const res = await fetch('http://localhost:8080/api/v1/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: selectedStudentId, ...formData }),
      });

      const resData = await res.json();
      console.log('Server response:', resData); // Log server response for debugging

      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Form submitted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: resData.message || 'Failed to submit',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      console.error('Form not sent', error); // Log the error for debugging
      Swal.fire({
        title: 'Error!',
        text: 'Form not sent',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  console.log(formData);

  return (
    <div className="add-student">
      {/* <Sidebar /> */}
      <div className="student-save">
        <h1>Add Student Result</h1>
      </div>
      <div className="student-inputs">
        <div className="student-column">
          <select
            name="student"
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
          >
            <option key="" value="">
              Select a student
            </option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.firstName} {student.lastName}
              </option>
            ))}
          </select>
        </div>
        {formData.subjects.map((subject, index) => (
          <div className="student-column" key={index}>
            <input
              type="text"
              name="subjectName"
              value={subject.subjectName}
              onChange={(e) => handleInput(e, index)}
              placeholder="Subject"
            />
            <input
              type="text"
              name="classScore"
              value={subject.classScore}
              onChange={(e) => handleInput(e, index)}
              placeholder="Class Score"
            />
            <input
              type="text"
              name="examScore"
              value={subject.examScore}
              onChange={(e) => handleInput(e, index)}
              placeholder="Exam Score"
            />
            <input
              type="text"
              name="totalScore"
              value={subject.totalScore}
              onChange={(e) => handleInput(e, index)}
              placeholder="Total Score"
            />
          </div>
        ))}
        <div className="student-column">
          <button onClick={handleSubmit} style={{ cursor: 'pointer' }}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddResults;
