import { useRef, useEffect } from 'react';
import Paper from 'paper';
import './Canvas.css';
import { shuffle, getCard, flipCards, fanCards, orbitCards } from './utils';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    Paper.setup(canvasRef.current);

    Paper.view.viewSize = new Paper.Size(window.innerWidth, window.innerHeight);
    const point = Paper.view.bounds.topLeft.add([300, 100]);

    // const shuffledCards = shuffle();
    // const cards = Array.from(shuffledCards, (name, _) => getCard(name, point));
    // const someCards = cards.slice(0, 5);

    const card1 = getCard('SPADE-1', point);
    const card2 = getCard('SPADE-2', point);
    const card3 = getCard('SPADE-3', point);
    const cards = [card1, card2, card3];
    const positions = Array.from(cards, (card, _) => card.position);
    Paper.view.onFrame = (event) => {
      orbitCards(event, positions, cards);
    };
    // cards[0].onClick = () => {
    //   fanCards(cards);
    // }
    // flipCards(cards);

    return () => {
      Paper.project.clear();
    }
  }, []);

  return <canvas ref={canvasRef} id="canvas" />
}

export default Canvas;