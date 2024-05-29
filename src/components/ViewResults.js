import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { Link } from 'react-router-dom';

function ViewResults() {
  const [students, setStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

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

  const handleClassClick = (className) => {
    setSelectedClass(className);
  };

  const filteredStudents = selectedClass
    ? students.filter((student) => student.studentClass === selectedClass)
    : [];

  return (
    <div className="table-container">
      <Sidebar />
      <div className="my-table">
        <div
          className="button-group"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            // flexDirection: 'column',
          }}
        >
          <button onClick={() => handleClassClick('1')}>Form 1</button>
          <button onClick={() => handleClassClick('2')}>Form 2</button>
          <button onClick={() => handleClassClick('3')}>Form 3</button>
          <div className="student-add">
            <span>
              <Link to={'/AddResults'}>+</Link>
            </span>
          </div>
        </div>
        {selectedClass && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Subjects</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
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
        )}
      </div>
    </div>
  );
}

export default ViewResults;
