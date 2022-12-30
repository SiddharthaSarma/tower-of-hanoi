import { useState } from 'react';
import { Disc, updateDiscPosition } from 'core';
import { getInitialDisc } from 'core';
import './App.css';

const discColors = [
  '#ed7e1d',
  '#3498db',
  '#e6bd19',
  '#333333',
  '#2ecc71',
  '#e74c3c',
];

const NUMBER_OF_DISCS = 3;
const INITIAL_DISC_POSITION = getInitialDisc(NUMBER_OF_DISCS);

function App() {
  const [discs, updateDiscState] = useState<Disc[][]>([
    [...getInitialDisc(3)],
    [],
    [],
  ]);
  const handleDragStart = (
    event: DragEvent,
    index: number,
    fromRod: number
  ) => {
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'move';
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('itemId', index.toString());
      event.dataTransfer.setData('rodId', fromRod.toString());
    }
  };
  const handleDrop = (event: DragEvent, index: number) => {
    const itemId = Number(event.dataTransfer?.getData('itemId'));
    const fromRod = Number(event.dataTransfer?.getData('rodId'));
    updateDiscState(updateDiscPosition(discs, fromRod, index, itemId));
    setTimeout(checkWin, 500);
  };

  const resetGame = () => {
    updateDiscState([[...INITIAL_DISC_POSITION], [], []]);
  };

  const checkWin = () => {
    const isWin = discs
      .slice(1)
      .some(
        (list) =>
          list.map((disc) => disc.value).join('') ===
          INITIAL_DISC_POSITION.map((disc) => disc.value).join('')
      );
    if (isWin) {
      window.alert('Congratulations!!, You won :)');
      resetGame();
    }
  };

  const handleDragOver = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };
  return (
    <div>
      <h1>Tower of Hanoi</h1>
      <div className="horizontal-base">
        {discs.map((rod, rodIndex) => (
          <div
            className="base"
            onDrop={(e) => handleDrop(e as any, rodIndex + 1)}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            key={rodIndex}
          >
            <div className="discs">
              {rod.map((disc, index) => (
                <div
                  className="disc"
                  draggable={index === 0 ? true : false}
                  style={{
                    width: 45 * disc.value + 'px',
                    backgroundColor: discColors[disc.value - 1],
                  }}
                  onDragStart={(e) =>
                    handleDragStart(e as any, disc.id, rodIndex + 1)
                  }
                  key={index}
                >
                  {disc.value}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
