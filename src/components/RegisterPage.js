import React, { useState } from 'react';
// import school_logo from '../asset/school_logo.png';
import axios from 'axios'; // You may need to install axios using npm or yarn
import Sidebar from './Sidebar';

const AddPlayerForm = () => {
  const [formData, setFormData] = useState({
    // teacherID: '',
    firstName: '',
    middleName: '',
    lastName: '',
    contactName: '',
    email: '',
    userName: '',
    password: '',
    role: '',
    teachingSubjects: [{ subjectName: '', subjectCode: '' }],
  });

  const subjects = [
    { name: 'Mathematics', code: 'MATH' },
    { name: 'Science', code: 'SCI' },
    { name: 'English', code: 'ENG' },
    { name: 'ICT', code: 'ICT' },
    { name: 'Ghanaian Language', code: 'GHA' },
    { name: 'RME', code: 'RME' },
    { name: 'Social', code: 'SCL' },
    // Add more subjects as needed
  ];

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedSubjects = [...formData.teachingSubjects];
    updatedSubjects[index][name] = value;
    setFormData({
      ...formData,
      teachingSubjects: updatedSubjects,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      // You may need to replace the URL with your backend API endpoint
      await axios.post(
        'http://localhost:8080/api/v1/teacher/addteacher',
        formData
      );
      console.log('Player added successfully!');
    } catch (error) {
      console.error('Error adding player:', error);
    }
  };

  return (
    <div className="Registerpage">
      <Sidebar />
      {/* <div className="registerleft">
        <img src={school_logo} alt="" />
        <h3>
          WELCOME TO NBYC <br /> STUDENT MANAGEMENT SYSTEM
        </h3>
      </div> */}
      <div className="registerright">
        <form onSubmit={handleSubmit}>
          <div className="side">
            {/* <label>
              Teacher ID:
              <input
                type="text"
                name="teacherID"
                value={formData.teacherID}
                onChange={(e) =>
                  setFormData({ ...formData, teacherID: e.target.value })
                }
              />
            </label> */}
            <label>
              FirstName:
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
              />
            </label>
            <label>
              MiddleName:
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={(e) =>
                  setFormData({ ...formData, middleName: e.target.value })
                }
              />
            </label>
          </div>
          <div className="side">
            <label>
              LastName:
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </label>
          </div>
          <div className="side">
            <label>
              Contact:
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
            </label>
            <label>
              Password:
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </label>
          </div>
          <div className="side">
            {/* <label>
              UserName:
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />
            </label> */}

            {/* <label>
              Role:
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </label> */}
          </div>
          {/* Add other input fields similarly */}

          {/* Teaching Subjects */}
          {formData.teachingSubjects.map((subject, index) => (
            <div key={index}>
              <div className="side">
                <label>
                  Subject Name:
                  <select
                    name="subjectName"
                    value={subject.subjectName}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map((subj, i) => (
                      <option key={i} value={subj.name}>
                        {subj.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Subject Code:
                  <select
                    name="subjectCode"
                    value={subject.subjectCode}
                    onChange={(e) => handleChange(e, index)}
                  >
                    <option value="">Select Code</option>
                    {subjects.map((subj, i) => (
                      <option key={i} value={subj.code}>
                        {subj.code}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          ))}
          <div className="side">
            <label>
              Role:
              <select
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option>Admin</option>
                <option>Teacher</option>
              </select>
            </label>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default AddPlayerForm;
