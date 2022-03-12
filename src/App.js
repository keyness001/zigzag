import React, { useState } from "react";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import DrapDrop from './containers/DrapDrop';
import Input from './components/Input';

import "./App.css";

const App = () => {
  const [number, setNumber] = useState(10);

  return (
    <div className="App" >
      <DndProvider backend={HTML5Backend}>
        <Input text="Please input n of rows and columns" value={number} type='number' handleOnChange={setNumber}/>
        <DrapDrop n={number} />
      </DndProvider>
    </div>
  )
};

export default App;