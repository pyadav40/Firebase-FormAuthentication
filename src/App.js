import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Component/Main";

// use Code Splitting using lazy and suspense
const Home = lazy(() => import("./Component/Home"));

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route
          path="/home"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
