import "./home.scss";
import Navbar from "../../component/navbar/Navbar";
import Sidebar from "../../component/sidebar/Sidebar";
import Phonebook from "../../component/pagination/Phonebook";
const Home = () => {
  return (
    <div className="homeadmin">
      <Sidebar />
      <div className="homeContaineradmin">
        <Navbar />
        <Phonebook />

        <div className="chartsadmin"></div>
        <div className="chartsadmin"></div>
      </div>
    </div>
  );
};

export default Home;
