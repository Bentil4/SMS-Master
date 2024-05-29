import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function DeleteStudent() {
  const [students, setStudents] = useState([]);

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

  const handleDelete = async (studentId) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/student/${studentId}`,
        {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (res.ok) {
        console.log('Student deleted successfully');
        // Update the list of students after deletion
        setStudents(
          students.filter((student) => student.studentId !== studentId)
        );
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="up-stud">
      <Sidebar />
      <div className="update-student">
        <h1>Delete Students</h1>
        {students.map((student) => (
          <div key={student.studentId}>
            <p>{`${student.firstName} ${student.middleName} ${student.lastName}`}</p>
            <button onClick={() => handleDelete(student.studentId)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DeleteStudent;
