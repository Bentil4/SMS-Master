import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import { useUser } from '../UserContext';
import tUsers from '../asset/users-solid.svg';

function Dashboard() {
  const [studentData, SetStudentData] = useState('');
  const { user } = useUser();
  console.log(user, 'k');

  const fetchdata = async () => {
    const res = await fetch('http://localhost:8080/api/v1/student/allStudent');
    const data = await res.json();

    SetStudentData(data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <div className="dash">
        <div className="dash-total">
          <div className="dash-right">
            <img src={tUsers} alt="" />{' '}
          </div>
          <div className="dash-left">
            <p className="nstudent">No. of Students</p>
            <p className="studentl">{studentData.length}</p>
          </div>
        </div>
        <div className="dash-total">
          <div className="dash-right"></div>
          <div className="dash-left">
            {/* <p className="nstudent">No. of Students</p>
            <p className="studentl">{studentData.firstName}</p> */}
          </div>
        </div>
        <div className="dash-total">
          <div className="dash-right"></div>
          <div className="dash-left"></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
