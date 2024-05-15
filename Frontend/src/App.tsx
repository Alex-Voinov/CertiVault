import { BrowserRouter, Route, Routes } from "react-router-dom";
import StartPage from "./Pages/StartPage/StartPage";
import Repository from "./Pages/Repository/Repository";
import GeneratorDCC from "./Pages/GeneratorDCC/GeneratorDCC";
import Authorization from "./Pages/Authorization/Authorization";
import { observer } from 'mobx-react-lite';
import { GlobalData } from ".";
import { useContext } from "react";
import Notification from "./Components/Notification/Notification";
import { AnimatePresence } from "framer-motion";
import SEmailConfirmation from "./Pages/SEmailConfirmation/SEmailConfirmation";
import NonExisten from "./Pages/NonExisten/NonExisten";


const App = () => {
  const { store } = useContext(GlobalData)
  return (
    <>
      <AnimatePresence>
        {store.notificationTitle && <Notification />}
      </AnimatePresence>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/authorization/" element={<Authorization />} />
          <Route path="/repository/" element={<Repository />} />
          <Route path="/repository/create/" element={<GeneratorDCC />} />
          <Route path="/successful_email_confirmation/" element={<SEmailConfirmation />} />
          <Route path="*" element={<NonExisten />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default observer(App);
