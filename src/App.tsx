import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { DeckFormPage, DecksPage, StudyPage } from './pages';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<DecksPage />} />
      <Route path="/decks/new" element={<DeckFormPage />} />
      <Route path="/decks/:id/edit" element={<DeckFormPage />} />
      <Route path="/decks/:id/study" element={<StudyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
