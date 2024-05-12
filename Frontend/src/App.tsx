import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./Pages/StartPage/StartPage";
import Repository from "./Pages/Repository/Repository";
import GeneratorDCC from "./Pages/GeneratorDCC/GeneratorDCC";
import Authorization from "./Pages/Authorization/Authorization";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/authorization/" element={<Authorization />} />
        <Route path="/repository/" element={<Repository />} />
        <Route path="/repository/create/" element={<GeneratorDCC />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;