
import { Routes, Route } from 'react-router-dom';

import { AddNote, EditNote, Home, Notes, SingleNote, ArchivedNotes } from './views/index'

import './App.scss'

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/home" element={<Notes />} />
          <Route path="/add" element={<AddNote />} />
          <Route path="/archived" element={<ArchivedNotes />} />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="/note/:id" element={<SingleNote />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
