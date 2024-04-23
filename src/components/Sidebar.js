import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../UserContext';

function Sidebar() {
  const { user } = useUser();
  // console.log(user.role);

  return (
    <div className="sidebar">
      <h2>NBYC JHS</h2>
      <ul>
        <li>
          <Link to="/">Dashbord</Link>
        </li>
        <li>
          <Link to="/student">Student</Link>
        </li>
        <li>
          <Link to="/results">Student Result</Link>
        </li>
        <li>
          <Link to="/ViewResults">View Results</Link>
        </li>

        {user.role !== 'teacher' && (
          <>
            <li>
              <Link to="/updatestudent">Update Student</Link>
            </li>
            <li>
              <Link to="/deletestudent">Delete Student</Link>
            </li>
            <li>
              <Link to="/Teacher">Teacher</Link>
            </li>
            <li>
              <Link to="/parent">Parent</Link>
            </li>
            <li>
              <Link to="/RegisterPage">Add Teacher</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
