import React from "react";
import { ClockContainer } from "./components/ClockContainer";
import "./App.css";
import "react-notifications-component/dist/theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import { ReactNotifications } from "react-notifications-component";

const App: React.FC = () => {
  return (
    <div className="app">
      <ReactNotifications />
      <h1 className="app-header">Время в Российской Федерации</h1>
      <ClockContainer />
    </div>
  );
};

export default App;
