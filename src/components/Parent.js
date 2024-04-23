import React, { useEffect, useRef, useState } from 'react';
import AddStudent from './AddStudent';
import Sidebar from './Sidebar';

function Parent() {
  const targetref = useRef();
  const targetref1 = useRef();

  const [studentData, setStudentData] = useState([]);

  const fetchdata = async () => {
    try {
      const res = await fetch(
        'http://localhost:8080/api/v1/student/allStudent'
      );
      if (res.ok) {
        const data = await res.json();
        setStudentData(data);
      } else {
        console.error('Failed to fetch student data');
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="student">
      <Sidebar />
      <div className="student12">
        <div className="student-first" ref={targetref}>
          <div className="desc">
            <p className="ID">Student Name</p>
            <div className="sep">
              <p className="gname">Guardian Name</p>
              <p className="rela">Relationship</p>
              <p className="cont">Contact</p>
            </div>
          </div>
          <div className="student-table">
            {studentData.map((student) => (
              <div key={student.studentId}>
                <p className="studentId">{`${student.firstName} ${student.middleName} ${student.lastName} `}</p>
                {student.guardian &&
                  student.guardian.map((guardian, index) => (
                    <div key={index}>
                      <p className="name">{guardian.name}</p>
                      <p className="relationship">{guardian.relationship}</p>
                      <p className="contact">{guardian.contact}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div className="student-second" ref={targetref1}>
          <AddStudent />
        </div>
      </div>
    </div>
  );
}

export default Parent;
