import React, { useState } from "react";
import "./details.css";
import { useEffect } from "react";
const Details = ({ selectedPerson }) => {
  const [showCard, setShowCard] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
  });

  const token = sessionStorage.getItem("token");

  const handlePlusClick = () => {
    setShowCard(true);
  };
  useEffect(() => {
    if (selectedPerson) {
      // Eğer seçili bir kişi varsa, bu kişinin detaylarını formda göster
      setFormData({
        name: selectedPerson.name,
        surname: selectedPerson.surname,
        phone: selectedPerson.phone,
      });
    }
  }, [selectedPerson]);
  const handleSaveClick = () => {
    const requestData = {
      ...formData,
      token: token,
    };

    fetch("https://localhost:44363/api/PhoneBook/Add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Veri eklendi:", data);
      })
      .catch((error) => {
        console.error("Hata:", error);
      });
  };

  const handleCancelClick = () => {
    setFormData({
      name: "",
      surname: "",
      phone: "",
    });
    setShowCard(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleDeleteItem = (itemId) => {
    fetch(`https://localhost:44363/api/PhoneBook/${itemId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        console.log("Veri silindi.");
        // Veri silindiğinde gerekli işlemleri yapabilirsiniz.
      })
      .catch((error) => {
        console.error("Veri silinirken bir hata oluştu:", error);
        // Hata durumunda gerekli işlemleri yapabilirsiniz.
      });
  };
  return (
    <div className="cont">
      <div className="rght">
        <div className="search">
          <div className="src">
            <span onClick={handlePlusClick}>🔍</span>
            <input type="text" placeholder="Ara..." />
          </div>
        </div>
        <div className="icons">
          <div className="icon" onClick={handlePlusClick}>
            ➕
          </div>
          <div className="icon">✏️</div>
          <div className="icon">❓</div>
          <div
            className="icon"
            onClick={() => handleDeleteItem(selectedPerson)}
          >
            ➖
          </div>
        </div>
      </div>
      {showCard && (
        <div className="overlay">
          <div className="card-container">
            <div className="card">
              <input
                type="text"
                placeholder="Ad"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Soyad"
                name="surname"
                value={formData.surname}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="Telefon Numarası"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <button onClick={handleSaveClick}>Kaydet</button>
              <button onClick={handleCancelClick}>Vazgeç</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
