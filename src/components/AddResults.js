import React, { useState } from 'react';

function AddStudent() {
  const [formData, setformData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    addresses: [{ residence: '', location: '' }],
    guardian: [{ name: '', relationship: '', contact: '' }],
  });

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

  console.log(formData);

  return (
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
          />
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleInput}
            placeholder="Middle Name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInput}
            placeholder="Last Name"
          />
        </div>
        <div className="student-column">
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInput}
            placeholder="Phone"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInput}
            placeholder="Email"
          />
          <input type="date" name="dob" onChange={handleInput} />
          <input
            type="text"
            name="residence"
            value={formData.residence}
            onChange={handleInput}
            placeholder="Residence"
          />
        </div>
        <div className="student-column">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInput}
            placeholder="location"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInput}
            placeholder="Guardian Name"
          />
          <input
            type="text"
            name="relationship"
            value={formData.relationship}
            onChange={handleInput}
            placeholder="Relationship"
          />
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleInput}
            placeholder="Contact"
          />
          <button onClick={handleSubmit}>Save </button>
        </div>
      </div>
    </div>
  );
}

export default AddStudent;
