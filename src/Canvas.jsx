import { useRef, useEffect } from 'react';
import Paper from 'paper';
import './Canvas.css';
import { shuffle, getCard, flipCards, fanCards } from './utils';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    Paper.setup(canvasRef.current);

    Paper.view.viewSize = new Paper.Size(window.innerWidth, window.innerHeight);

    const shuffledCards = shuffle();
    console.log(shuffledCards);

    const point = Paper.view.bounds.topLeft.add([300, 100]);
    const cards = Array.from(shuffledCards, (name, _) => getCard(name, point));

    const someCards = cards.slice(0, 20);
    console.log('some cards:', someCards);

    cards[0].onClick = () => {
      fanCards(cards);
    }
    // flipCards(cards);

    return () => {
      Paper.project.clear();
    }
  }, []);

  return <canvas ref={canvasRef} id="canvas" />
}

export default Canvas;