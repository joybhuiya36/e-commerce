import { useEffect, useState } from "react";
import "./App.scss";
import { decodeToken, isExpired } from "react-jwt";
import Header1 from "./components/header/header1";
import Header2 from "./components/header/header2";
import Footer from "./components/footer/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Profile from "./pages/profile/profile";
import NotFound from "./pages/notFound/notFound";
import { userLoginInfo } from "./redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Home from "./pages/homePage/home";
import IsUser from "./utils/isUserAuth";
import Book from "./components/book/book";
import Header3 from "./components/header/header3";
import IsAdminAuth from "./utils/isAdminAuth";
import AddBook from "./pages/book/addBook";
import EditBook from "./pages/book/editBook";
import BookDetails from "./pages/book/bookDetails";
import CartPage from "./pages/cart/cartPage";
import AboutPage from "./pages/about/aboutPage";
import AllUsers from "./pages/users/allUsers";
import AllTransactions from "./pages/Transactions/allTransactions";
import IsNormalUser from "./utils/isNormalUser";
import UserTransaction from "./pages/Transactions/userTransaction";
import ForgetPassword from "./pages/form/forgetPass";
import ResetPassword from "./pages/form/resetPass";
import InvalidToken from "./pages/form/invalidToken";

function App() {
  // const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.user.role);
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token && !isExpired(token)) {
  //     const userData = decodeToken(token);
  //     const userInfo = {
  //       role: userData.role,
  //       id: userData.user._id,
  //       name: userData.user.name,
  //       email: userData.email,
  //       address: userData.user.address,
  //       phone: userData.user.phone,
  //     };

  //     dispatch(userLoginInfo(userInfo));
  //   }
  // }, []);
  return (
    <>
      <Header1 />
      <Header2 />
      {isAdmin == 1 && <Header3 />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<IsAdminAuth />}>
          <Route path="/add-book" element={<AddBook />} />
          <Route path="/edit-book" element={<EditBook />} />
          <Route path="/all-user" element={<AllUsers />} />
          <Route path="/all-trans" element={<AllTransactions />} />
        </Route>
        <Route element={<IsUser />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/book" element={<Book />} />
        <Route path="/book/details/:id" element={<BookDetails />} />
        <Route path="/about" element={<AboutPage />} />
        <Route element={<IsNormalUser />}>
          <Route path="/trans" element={<UserTransaction />} />
          <Route path="/cart" element={<CartPage />} />
        </Route>
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/invalid-token" element={<InvalidToken />} />
        <Route
          path="/reset-password/:token/:userId"
          element={<ResetPassword />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
