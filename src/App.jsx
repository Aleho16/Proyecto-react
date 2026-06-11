import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { useState } from 'react';

import App from './App';
function Square() {
  const [value, setValue] = useState(null);
  function handleClick() {
    setValue('X');
    console.log('¡hiciste clic!');
  }
  return <button className="square" onClick={handleClick}>{value}</button>;
}
export default function Board() {
  return (
    <>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
      <div className="board-row">
        <Square />
        <Square />
        <Square />
      </div>
    </>
  );
}