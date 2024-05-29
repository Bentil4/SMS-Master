import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function UpdateStudent() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    residence: '',
    location: '',
    name: '',
    relationship: '',
    contact: '',
  });

  // Fetch all students from the database
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch(
          'http://localhost:8080/api/v1/student/allStudent'
        );
        if (res.ok) {
          const data = await res.json();
          setStudents(data);
        } else {
          console.error('Failed to fetch students');
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  const handleUpdateClick = (student) => {
    setSelectedStudent(student);
    // Set formData to the details of the selected student
    setFormData({ ...student });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/student/${selectedStudent.studentId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: formData.firstName,
            middleName: formData.middleName,
            lastName: formData.lastName,
            dob: formData.dob,
            email: formData.email,
            phone: formData.phone,
            residence: formData.residence,
            location: formData.location,
            name: formData.name,
            relationship: formData.relationship,
            contact: formData.contact,
          }),
        }
      );
      if (res.ok) {
        console.log('Student updated successfully');
        // Clear selected student and form data after successful update
        setSelectedStudent(null);
        setFormData({
          firstName: '',
          middleName: '',
          lastName: '',
          dob: '',
          email: '',
          phone: '',
          residence: '',
          location: '',
          name: '',
          relationship: '',
          contact: '',
        });
      } else {
        console.error('Failed to update student');
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div className="up-stud">
      <Sidebar />
      <div className="update-student">
        <h1>Update Students</h1>
        {students.map((student) => (
          <div key={student.studentId}>
            <p>{`${student.firstName} ${student.middleName} ${student.lastName}`}</p>
            <button onClick={() => handleUpdateClick(student)}>
              Update/Edit
            </button>
          </div>
        ))}
        {selectedStudent && (
          <div className="student-details">
            <h2>Edit Student Details</h2>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
            {/* Other input fields */}
            <button onClick={handleSave}>Update</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateStudent;
