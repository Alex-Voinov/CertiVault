import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './Pages/StartPage/StartPage';
import Repository from './Pages/Repository/Repository';
import Generator from './Pages/Generator/Generator';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/repository/" element={<Repository />} />
        <Route path="/repository/create/" element={<Generator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
