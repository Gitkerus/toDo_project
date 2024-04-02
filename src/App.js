import { Routes, Route } from "react-router-dom";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

import Login from "./pages/Login";
import SingleTask from "./pages/SingleTask";
import Tasks from "./pages/Tasks";
import Error from "./pages/Error";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        {/* Tasks home page route */}
        <Route
          path="/tasks"
          element={
            <RequireAuth fallbackPath="/login">
              <Tasks />
            </RequireAuth>
          }
        />
        {/* SingleTask page route */}
        <Route
          path="/task/:id"
          element={
            <RequireAuth loginPath="/login">
              <SingleTask />
            </RequireAuth>
          }
        />
        {/* Login page route */}
        <Route path="/login" element={<Login />} />
        {/* 404 page route  */}
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
