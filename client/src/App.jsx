import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "./components/Main";

const MyComponent = () => {
  return (
    <div>
      <Main />
    </div>
  );
};

const App = () => {
  const st = (+new Date()).toString(16);
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Navigate to={`/f${st}`} />} />
          <Route path={`/f:id`} element={<Main />} />
          <Route path="/:id" element={<MyComponent />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
