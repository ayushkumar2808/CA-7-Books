import React, { useEffect, useState } from "react";
import "./components.css";
function Main() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [ab, setAb] = useState("romance");
  const [filterdata, setfilterData] = useState("");
  const [Items, setItems] = useState(true);

  const url = `https://www.googleapis.com/books/v1/volumes?q=${
    ab === "" ? "adventure" : ab
  }&key=AIzaSyCfKfKPivIukAlthPpy1LkgIlG6FWa7we8`;
  const fetchApi = () => {
    fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((bookData) => {
        setItems(bookData.totalItems);

        setData(bookData.items);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchApi();
  }, [url]);

  const abcd = () => {
    setAb(value);
  };

  return (
    <>
      <div id="search-bar">
        <input
          type="search"
          placeholder="Search for any book"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{
            height: "5vh",
            borderTopLeftRadius: "15px",
            borderBottomLeftRadius: "15px",
            marginRight: "0.5vh",
            
          }}
        />
        <button id="search-button1" onClick={abcd}>
          Search
        </button>
      </div>
      <hr />

      <div style={{ height: "5vh", display: "flex", justifyContent: "center" }}>
        <input
          style={{ width: "40vh",borderRadius:'5px' }}
          type="search"
          placeholder="Search among below books"
          onChange={(e) => setfilterData(e.target.value)}
          
        />
      </div>

      {Items > 10 ? (
        <div style={{ backgroundColor: "yellows" }} id="main-div">
          {data
            .filter((filter) => {
              if (
                filterdata === "" ||
                filterdata === " " ||
                filterdata === "  " ||
                filterdata === "   "
              ) {
                return filter;
              } else if (
                filter.volumeInfo.title
                  .toLowerCase()
                  .includes(filterdata.toLowerCase())
              ) {
                return filter;
              }
              
              
            })

            .map((book) => (
              <>
                <div id="card">
                  <img
                    className="book-img"
                    src={
                      book.volumeInfo.imageLinks &&
                      book.volumeInfo.imageLinks.thumbnail
                    }
                    alt="book"
                  />
                  <h3 className="name">{book.volumeInfo.title}</h3>
                  <h4 className="author">{book.volumeInfo.authors}</h4>
                  <h6 style={{ margin: "0" }}>
                    {book.volumeInfo.pageCount} Pages
                  </h6>
                  <a
                    href={book.volumeInfo.previewLink}
                    target="_blank"
                    rel="noreferrer"
                    className="preview"
                  >
                    Preview
                  </a>
                </div>
              </>
            ))}
           
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <h1>Your search "{ab}" did not match for any books</h1>
        </div>
      )}
    </>
  );
}

export default Main;
