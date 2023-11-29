import React, { useEffect, useState } from "react";
import axiosIntance from "../../utils/axiosInstance";
import Cart from "../cart/cart";
import "./book.style.scss";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoaderPage from "../../pages/loaderPage/LoaderPage";

const Book = () => {
  const [bookData, setBookData] = useState([]);
  const [book, setBook] = useState([]);
  const [initialLoad, setInitialLoad] = useState(0);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(true);
  const keyword = useSelector((state) => state.search.keyword);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.role);

  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);
  const handleSingleBook = (bookId) => {
    if (!user) {
    } else {
      const singleBook = bookData.filter((x) => x._id == bookId);
      navigate(`/book/details/${bookId}`, { state: { singleBook } });
    }
  };
  const handleRemove = async (bookId) => {
    try {
      // console.log(bookId);
      const response = await axiosIntance.delete(`/book/delete/${bookId}`);

      if (response.data.success) {
        const filtered = book.filter((x) => x._id !== bookId);
        handlePage(1);
        setBookData(filtered);
        console.log("Book Deleted Successfully!");
        toast("Book Deleted Successfully!");
      } else {
        toast("Failed to Delete Book!");
        console.error("Error deleting book:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  const fetchData = async () => {
    try {
      handlePage(1);
      const response = await axiosIntance.get("/book/all");
      // setBook(response.data.data);
      setBookData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterOperation = () => {
    const filtered = bookData.filter((x) =>
      x.title.toLowerCase().startsWith(keyword.toLowerCase())
    );
    setBook(filtered);
    setPage(1);
    if (keyword.length == 0) {
      handlePage(1);
    }
  };
  useEffect(() => {
    if (initialLoad < 2) {
      setInitialLoad(initialLoad + 1);
      return;
    }
    setLoader(true);
    const timeoutId = setTimeout(() => {
      filterOperation();
    }, 2000);
    setTimeout(() => {
      setLoader(false);
    }, 1500);
    return () => clearTimeout(timeoutId);
  }, [keyword, bookData]);

  const [sortBy, setSortBy] = useState("asc");
  const [sortParam, setSortParam] = useState("title");
  const [price, setPrice] = useState(0);
  const [priceFilter, setPriceFilter] = useState("high");
  const [stock, setStock] = useState(0);
  const [stockFilter, setStockFilter] = useState("high");

  const handlePage = (pageNumber) => {
    // console.log(
    //   `/book/filter?limit=8&page=${pageNumber}&sortBy=${sortBy}&sortParam=${sortParam}&price=${price}&priceFilter=${priceFilter}&stock=${stock}&stockFilter=${stockFilter}`
    // );
    axiosIntance
      .get(
        `/book/filter?limit=8&page=${pageNumber}&sortBy=${sortBy}&sortParam=${sortParam}&price=${price}&priceFilter=${priceFilter}&stock=${stock}&stockFilter=${stockFilter}`
      )
      .then((res) => {
        // console.log(res.data);
        setBook(res.data.data.books);
      })
      .catch(() => {
        setBook([]);
      });
  };

  const handleSubmit = (e) => {
    setLoader(true);
    e.preventDefault();
    handlePage(1);
    setPage(1);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  };

  return (
    <div>
      {loader && <LoaderPage />}
      <div className="allbook">
        <div className="left">
          <form onSubmit={handleSubmit}>
            <p>
              <label>
                Sort Param:
                <select
                  value={sortParam}
                  onChange={(e) => setSortParam(e.target.value)}
                >
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="year">Year</option>
                  <option value="stock">Stock</option>
                </select>
              </label>
            </p>
            <p>
              <label>
                Sort By:
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </label>
            </p>

            <p>
              <label>
                Price:
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            </p>
            <p>
              <label>
                Price Filter:
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="high">High</option>
                </select>
              </label>
            </p>
            <p>
              <label>
                Stock:
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </label>
            </p>
            <p>
              <label>
                Stock Filter:
                <select
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="high">High</option>
                </select>
              </label>
            </p>
            <button type="submit">Apply Filters</button>
          </form>
        </div>
        <div className="right">
          {book.map((x) => (
            <Cart
              key={x._id}
              id={x._id}
              title={x.title}
              author={x.author}
              price={x.price}
              rating={x.rating}
              genre={x.genre}
              year={x.year}
              pages={x.pages}
              stock={x.stock}
              image={x.image}
              onRemove={handleRemove}
              onPage={handleSingleBook}
            />
          ))}
          <ToastContainer />
        </div>
      </div>
      <div className="pageBtn">
        <button
          disabled={page == 1}
          onClick={() => {
            handlePage(page - 1);
            setPage((prePage) => prePage - 1);
          }}
        >
          Previous Page
        </button>
        <span>{page}</span>
        <button
          disabled={book.length < 8}
          onClick={() => {
            handlePage(page + 1);
            setPage((prePage) => prePage + 1);
          }}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Book;
