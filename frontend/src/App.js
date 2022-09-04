import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useCookies } from "react-cookie";
import RequestToSpeakList from "./components/RequestToSpeakList";
import LoginPage from "./components/LoginPage";
import MenuBar from "./components/MenuBar";

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  
  return (
    <Router>
      <div className="wrapper">
        <MenuBar />
          {cookies.user && <Routes>
              <Route exact path="/" element={<RequestToSpeakList />} />
              <Route path="/moderator" element={<RequestToSpeakList moderator="true" />} />
            </Routes>
          }
          {!cookies.user && <LoginPage />}
      </div>
    </Router>
  );
}

export default App;
