import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar';
import Student from './components/Student';
import HomePage from './components/HomePage';
import UpdateStudent from './components/UpdateStudent';
import ViewResults from './components/ViewResults';
import DeleteStudent from './components/DeleteStudent';
import Parent from './components/Parent';
// import LoginPage from './components/LoginPage';
import Results from './components/Results';
// import RegisterPage from './components/RegisterPage';
import LoginForm from './components/LoginPage';
import AddPlayerForm from './components/RegisterPage';
import AddTeacher from './components/AddTeacher';
import AddStudent from './components/AddStudent';
import Teacher from './components/Teacher';
import AddResults from './components/AddResults';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/LoginPage" element={<LoginForm />} />
        <Route path="/RegisterPage" element={<AddPlayerForm />} />

        <Route exact path="/" element={<HomePage />} />
        <Route path="/student" element={<Student />} />
        <Route path="/UpdateStudent" element={<UpdateStudent />} />
        <Route path="/ViewResults" element={<ViewResults />} />
        <Route path="/deletestudent" element={<DeleteStudent />} />
        <Route path="/Parent" element={<Parent />} />
        <Route path="/AddTecher" element={<AddTeacher />} />
        <Route path="/Teacher" element={<Teacher />} />
        <Route path="/AddStudent" element={<AddStudent />} />
        <Route path="/AddResults" element={<AddResults />} />
        {/* <Route path="/LoginPage" element={<LoginPage />} /> */}
        <Route path="/Results" element={<Results />} />
        {/* <Route path="/RegisterPage" element={<RegisterPage />} /> */}
        <Route path="/Sidebar" element={<Sidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
