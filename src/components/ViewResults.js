// import React from 'react';

import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

function ViewResults() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      try {
        const res = await fetch(
          'http://localhost:8080/api/v1/student/allStudent'
        );
        const studentsData = await res.json();
        setStudents(studentsData);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    getStudents();
  }, []);

  return (
    <div className="table-container">
      <Sidebar />
      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentId}>
              <td>{`${student.firstName} ${student.middleName} ${student.lastName}`}</td>

              <td>
                {student.subjects ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                        <th>Class Score</th>
                        <th>Exam Score</th>
                        <th>Total Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.subjects.map((subject) => (
                        <tr key={subject.subjectID}>
                          <td>{subject.subjectID}</td>
                          <td>{subject.subjectName}</td>
                          <td>{subject.classScore}</td>
                          <td>{subject.examScore}</td>
                          <td>{subject.totalScore}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  'No subjects available'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewResults;
