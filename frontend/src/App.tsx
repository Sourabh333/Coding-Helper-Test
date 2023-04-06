import { Route, Routes } from "react-router";
import "./App.css";
import DisplayCoderSuggestion from "./main/components/DisplayCoderSuggestion";
import ModeSelector from "./main/components/ModeSelector";
import SpeechRecContainer from "./main/components/SpeechRecContainer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ModeSelector />} />
      <Route path="/helper" element={<SpeechRecContainer />}></Route>
      <Route path="/needy/:subId" element={<DisplayCoderSuggestion />}></Route>
    </Routes>
  );
}

export default App;
