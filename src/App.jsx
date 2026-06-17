import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTimes, FaRegCircle, FaHistory } from 'react-icons/fa';

function Square({ value, onSquareClick }) {

  let icon = null;
  if (value === 'X') {
    icon = <FaTimes className="text-danger" />;
  } else if (value === 'O') {
    icon = <FaRegCircle className="text-primary" />;
  }

  return (
    <button
      className="btn btn-outline-dark d-flex align-items-center justify-content-center m-1 shadow-sm"
      style={{ width: '80px', height: '80px', fontSize: '2.5rem' }}
      onClick={onSquareClick}
    >
      {icon}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  let statusClass = "alert alert-secondary text-center fw-bold";
  
  if (winner) {
    status = '¡Ganador: ' + winner + '!';
    statusClass = "alert alert-success text-center fw-bold";
  } else {
    status = 'Siguiente Jugador: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div className={statusClass} style={{ width: '260px' }}>
        {status}
      </div>
      <div className="d-flex">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="d-flex">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="d-flex">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    setXIsNext(nextMove % 2 === 0);
  }

  const moves = history.map((squares, move) => {
    let description;
    let btnClass = "btn btn-sm mb-2 w-100 ";
    
    if (move > 0) {
      description = 'Ir hacia la jugada #' + move;
      btnClass += "btn-outline-secondary";
    } else {
      description = 'Reiniciar juego';
      btnClass += "btn-primary";
    }
    
    return (
      <li key={move} className="list-unstyled">
        <button className={btnClass} onClick={() => jumpTo(move)}>
          {move === 0 && <FaHistory className="me-2" />}
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 text-uppercase fw-bold">Tres en Raya</h1>
      <div className="row justify-content-center gap-4">
        <div className="col-auto">
          <div className="card shadow-sm p-4 border-0 bg-light">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
          </div>
        </div>
        <div className="col-auto" style={{ minWidth: '250px' }}>
          <div className="card shadow-sm p-4 border-0 h-100">
            <h5 className="card-title text-center mb-3">Historial</h5>
            <div className="card-body p-0">
              <ul className="p-0 m-0">{moves}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}