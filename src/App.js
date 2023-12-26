import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/adminhome">
          <Route index element={<AdminHome />} />
          <Route path="/adminhome/studentadd" element={<StudentAddPage />} />
          <Route path="/adminhome/studentlist" element={<StudentListPage />} />
          <Route path="/adminhome/courselist" element={<CourseListPage />} />
        </Route>
        <Route path="/studentlogin" element={<StudentLoginPage />} />
        <Route path="/studenthome">
          <Route index element={<CourseListHomePageStudent />} />
          <Route path="/studenthome/profile" element={<StudentProfilePage />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
