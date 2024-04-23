import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

function Results() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState(-1);
  const [classScore, setClassScore] = useState('');
  const [examScore, setExamScore] = useState('');
  const [totalScore, setTotalScore] = useState('');

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
    // Clear previous subject selection and input values
    setSelectedSubjectIndex(-1);
    setClassScore('');
    setExamScore('');
    setTotalScore('');
  };

  const handleSubjectSelect = (index) => {
    setSelectedSubjectIndex(index);
    // Set input values to the values of the selected subject
    const selectedSubject = selectedStudent.subjects[index];
    setClassScore(selectedSubject.classScore);
    setExamScore(selectedSubject.examScore);
    setTotalScore(selectedSubject.totalScore);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'classScore':
        setClassScore(value);
        break;
      case 'examScore':
        setExamScore(value);
        break;
      case 'totalScore':
        setTotalScore(value);
        break;
      default:
        break;
    }
  };

  const handleSave = async () => {
    try {
      const updatedStudent = {
        ...selectedStudent,
        subjects: selectedStudent.subjects.map((subject, index) => {
          if (index === selectedSubjectIndex) {
            return {
              ...subject,
              classScore,
              examScore,
              totalScore,
            };
          }
          return subject;
        }),
      };

      const res = await fetch(
        `http://localhost:8080/api/v1/student/${selectedStudent.studentId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedStudent),
        }
      );
      if (res.ok) {
        console.log('Student updated successfully');
        setSelectedStudent(updatedStudent);
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
        <h1>Edit Result</h1>
        {students.map((student) => (
          <div key={student.studentId}>
            <p>{`${student.firstName} ${student.lastName}`}</p>
            <button onClick={() => handleUpdateClick(student)}>Edit</button>
          </div>
        ))}
        {selectedStudent && (
          <div className="student-details">
            <h2>Edit Subject Details</h2>
            <select
              value={selectedSubjectIndex}
              onChange={(e) => handleSubjectSelect(parseInt(e.target.value))}
            >
              <option value={-1}>Select a Subject</option>
              {selectedStudent.subjects.map((subject, index) => (
                <option key={index} value={index}>
                  {subject.subjectName}
                </option>
              ))}
            </select>
            {selectedSubjectIndex !== -1 && (
              <div>
                <input
                  type="text"
                  name="classScore"
                  value={classScore}
                  onChange={handleInputChange}
                  placeholder="Class Score"
                />
                <input
                  type="text"
                  name="examScore"
                  value={examScore}
                  onChange={handleInputChange}
                  placeholder="Exam Score"
                />
                <input
                  type="text"
                  name="totalScore"
                  value={totalScore}
                  onChange={handleInputChange}
                  placeholder="Total Score"
                />
                <button onClick={handleSave}>Update</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Results;
