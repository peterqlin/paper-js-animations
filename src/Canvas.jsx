import { useRef, useEffect } from 'react';
import Paper from 'paper';
import './Canvas.css';
import { shuffle, getCard, flipCards } from './utils';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    Paper.setup(canvasRef.current);

    Paper.view.viewSize = new Paper.Size(window.innerWidth, window.innerHeight);

    const shuffledCards = shuffle();
    console.log(shuffledCards);

    const point = Paper.view.bounds.topLeft;
    const aceOfSpades = getCard('SPADE-1', point);
    const aceOfDiamonds = getCard('DIAMOND-1', point.add([50, 0]));
    const aceOfClubs = getCard('CLUB-1', point.add([100, 0]));
    const aceOfHearts = getCard('HEART-1', point.add([150, 0]));

    const cards = [aceOfSpades, aceOfDiamonds, aceOfClubs, aceOfHearts];
    flipCards(cards);

    return () => {
      Paper.project.clear();
    }
  }, []);

  return <canvas ref={canvasRef} id="canvas" />
}

export default Canvas;