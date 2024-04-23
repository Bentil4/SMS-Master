import React, { useEffect, useRef, useState, useContext } from 'react';
import AddStudent from './AddStudent';
import Sidebar from './Sidebar';
import { UserContext } from '../UserContext';
import { Link } from 'react-router-dom';

function Student() {
  const targetref = useRef();
  const targetref1 = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudentData, setFilteredStudentData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const { user } = useContext(UserContext);

  const fetchdata = async () => {
    const res = await fetch('http://localhost:8080/api/v1/student/allStudent');
    const data = await res.json();
    setStudentData(data);
    setFilteredStudentData(data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  useEffect(() => {
    const filteredData = studentData.filter((student) => {
      const fullName = `${student.firstName} ${student.middleName} ${student.lastName}`;
      return fullName.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setFilteredStudentData(filteredData);
  }, [searchQuery, studentData]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="student">
      <Sidebar />
      <div className="student12">
        <div className="student-first" ref={targetref}>
          <div className="student-header">
            <div className="student-search">
              <input
                type="text"
                placeholder="Search by name..."
                onChange={handleSearch}
                className="input-black"
              />
              <button> Search</button>
            </div>
            {user.role !== 'teacher' && (
              <div className="student-add">
                <span>
                  <Link to={'/AddStudent'}>+</Link>
                </span>
              </div>
            )}
          </div>
          <div className="student-table">
            {filteredStudentData.map((student) => (
              <div key={student.studentId}>
                <p className="name">{`${student.firstName} ${student.middleName} ${student.lastName}`}</p>
                <p className="email">{student.email}</p>
                <p className="phone">{student.phone}</p>
                <p className="dob">{student.dob}</p>
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

export default Student;
