import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RequestToSpeakList from "./components/RequestToSpeakList";
import AddRequestToSpeak from "./components/AddRequestToSpeak";
import EditRequestToSpeak from "./components/EditRequestToSpeak";

function App() {
  return (
    <Router>
      <div className="container">
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <Routes>
              <Route exact path="/" element={<RequestToSpeakList />} />
              <Route path="/add" element={<AddRequestToSpeak />} />
              <Route path="/edit/:id" element={<EditRequestToSpeak />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
