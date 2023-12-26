import "./loginpage.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    fetch("https://localhost:44363/api/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("Email"),
        password: data.get("Password"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("statusCode:", data);
        if (data.status !== 401) {
          sessionStorage.setItem("token", data.token);
          toast.success("Başarıyla giriş yapıldı!"); // Opsiyonel: Başarılı giriş mesajı
          setTimeout(() => {
            navigate("/home");
          }, 3000);
        } else {
          toast.error("Giriş başarısız!"); // Opsiyonel: Başarısız giriş mesajı
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Hata:", error);
        toast.error("Bir hata oluştu!"); // Opsiyonel: Genel hata mesajı
      });
  };

  return (
    <div className="engeneladmin">
      <ToastContainer />
      <div className="backgroundadmin">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="formadmin" onSubmit={handleSubmit}>
        <h3>ORİONPOS</h3>
        <h3>TELEFON REHBERİ</h3>
        <label className="labeladmin" htmlFor="username">
          Email
        </label>
        <input
          className="inputadmin"
          type="text"
          placeholder="Email"
          id="email"
          name="Email"
        />

        <label className="labeladmin" htmlFor="password">
          Şifre
        </label>
        <input
          className="inputadmin"
          type="password"
          placeholder="Password"
          id="Password"
          name="Password"
        />

        <button className="buttonadmin">Giriş Yap</button>
      </form>
    </div>
  );
};
export default LoginPage;
