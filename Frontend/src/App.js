import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './Pages/StartPage/StartPage';
import Repository from './Pages/Repository/Repository';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/repository/" element={<Repository />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
