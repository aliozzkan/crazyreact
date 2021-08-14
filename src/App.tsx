import React, { useLayoutEffect, useEffect } from "react";
import { useAuth } from "hooks/redux-hooks";
import Freeze from "pages/Freeze";
import { BrowserRouter } from "react-router-dom";
import Router, { AuthRouter } from "router";
import { Authenticator } from "helper/authenticator";
import Moment from "moment";
import "moment/locale/tr";

function App() {
  const { isLoggedIn, user } = useAuth();

  useLayoutEffect(() => {
    Moment.locale("tr");
    Authenticator.Compose();
  }, []);

  useEffect(() => {
    if(!!user && !!user.companyName) {
      document.title = `${user.companyName} | Tesis Yönetim`;
    }
  }, [user]);

  return (
    <BrowserRouter>
      {isLoggedIn === "freeze" && <Freeze />}
      {isLoggedIn === "loginIn" && <Router />}
      {isLoggedIn === "unLoginIn" && <AuthRouter />}
    </BrowserRouter>
  );
}

export default App;
