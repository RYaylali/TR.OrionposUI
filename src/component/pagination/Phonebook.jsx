import "./styles.css";
import React, { useState, useEffect } from "react";
import Details from "../add/Details";

const itemsPerPage = 10;

const Phonebook = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Fetch isteği yapılacak API'nin URL'i
    const apiUrl = "https://localhost:44363/api/PhoneBook/List";

    // Fetch isteği yapılması
    fetch(apiUrl)
      .then((response) => response.json())
      .then((result) => {
        setData(result); // Gelen verileri state'e kaydet
        setTotalPages(Math.ceil(result.length / itemsPerPage)); // Toplam sayfa sayısını hesapla
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, data.length);
    return data.slice(startIndex, endIndex);
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button key={i} onClick={() => changePage(i)}>
          {i}
        </button>
      );
    }
    return pages;
  };
  const [selectedPerson, setSelectedPerson] = useState(null);

  const handleRadioClick = (person) => {
    setSelectedPerson(person); // Seçili kişiyi güncelle
  };

  return (
    <div className="phonebook">
      <h1>Phonebook</h1>
      <div className="content">
        <div className="left">
          <div className="table">
            <table>
              <tbody>
                {getCurrentPageData().map((person) => (
                  <tr key={person.id}>
                    <td style={{ backgroundColor: "pink" }}>
                      <input
                        type="radio"
                        name="person"
                        onChange={() => handleRadioClick(person)}
                      />
                    </td>
                    <td style={{ backgroundColor: "#ffffcc" }}>
                      {person.name}
                    </td>
                    <td style={{ backgroundColor: "#e6f2ff" }}>
                      {person.surname}
                    </td>
                    <td style={{ backgroundColor: "#ffe6f2" }}>
                      {person.phone}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">{renderPageNumbers()}</div>
        </div>
        <div className="right">
          <Details selectedPerson={selectedPerson} />
        </div>
      </div>
    </div>
  );
};

export default Phonebook;
