import React, { useState } from 'react';
import Sidebar from './Sidebar';

function AddStudent() {
  const [formData, setformData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    studentClass: '',
    class: '',
    addresses: [{ residence: '', location: '' }],
    guardian: [{ name: '', relationship: '', contact: '' }],
  });

  // const classList = [
  //   { name: 'form 1', code: 'Form 1' },
  //   { name: 'form 2', code: 'Form 2' },
  //   { name: 'form 3', code: 'Form 3' },
  // ];

  const handleInput = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ouch');
    try {
      const res = await fetch('http://localhost:8080/api/v1/student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        console.log('Form submitted Successfully');
      } else {
        console.error('Failed to submit');
      }
    } catch (error) {
      console.error('form not sent', error);
    }
  };

  return (
    <div className="adding-student">
      <Sidebar />
      <div className="add-student">
        <div className="student-save">
          <h1>Add new student</h1>
        </div>
        <div className="student-inputs">
          <div className="student-column">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInput}
              placeholder="First Name"
              required
            />
            <input
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleInput}
              placeholder="Middle Name"
              required
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInput}
              placeholder="Last Name"
              required
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInput}
              placeholder="Phone"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInput}
              placeholder="Email"
              required
            />
            <input type="date" name="dob" onChange={handleInput} />
          </div>
          {/* <div className="student-column"></div> */}
          <div className="student-column">
            {/* <input
              type="text"
              name="class"
              value={formData.studentClass}
              onChange={handleInput}
              placeholder="Class"
              required
            /> */}

            <label>
              <select
                className="student-class"
                name="studentClass"
                value={formData.studentClass.role}
                onChange={(e) =>
                  setformData({ ...formData, studentClass: e.target.value })
                }
              >
                <option>Select Class</option>
                <option>Form 1</option>
                <option>Form 2</option>
                <option>Form 3</option>
              </select>
            </label>

            <input
              type="text"
              name="residence"
              value={formData.residence}
              onChange={handleInput}
              placeholder="Residence"
              required
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInput}
              placeholder="location"
              required
            />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInput}
              placeholder="Guardian Name"
              required
            />
            <input
              type="text"
              name="relationship"
              value={formData.relationship}
              onChange={handleInput}
              placeholder="Relationship"
              required
            />
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInput}
              placeholder="Contact"
              required
            />
            <button onClick={handleSubmit}>Save </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
