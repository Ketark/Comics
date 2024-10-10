import React, { Suspense, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import ComicPage from "./pages/ComicPage/ComicPage";
import Modal from "./components/Modal/Modal";
import { Context } from "./context/context";
import { ProtectedRoute } from "./middlewares/protectedRoute";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { ErrorBoundary } from "react-error-boundary";
const FavoritePage = React.lazy(
  () => import("./pages/FavoritePage/FavoritePage")
);

function App() {
  const { user, setActive } = useContext(Context);

  return (
    <>
      <Navbar />
      <Modal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<ProtectedRoute user={user} setActive={setActive} />}>
          <Route
            path="/favorites"
            element={
              <Suspense>
                <FavoritePage />
              </Suspense>
            }
          />
          <Route
            path="/comics/:id"
            element={
              <ErrorBoundary fallback={<ErrorPage />}>
                <ComicPage />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
