import { useRef, useEffect } from 'react';
import Paper from 'paper';
import './Canvas.css';
import { shuffle, getCard, flipCards, fanCards, orbitCards, inspectCard } from './utils';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    Paper.setup(canvasRef.current);

    Paper.view.viewSize = new Paper.Size(window.innerWidth, window.innerHeight);
    const point = Paper.view.bounds.topLeft.add([300, 100]);

    // const shuffledCards = shuffle();
    // const cards = Array.from(shuffledCards, (name, index) => getCard(name, point));
    // const someCards = cards.slice(0, 5);

    const card1 = getCard('SPADE-1', point);
    const card2 = getCard('SPADE-2', point.add(1));

    Paper.view.onMouseMove = (event) => inspectCard(event, card1, card1.position);

    /*
    const matrix = new Paper.Matrix();
    const pos = card1.position;
    let showBack = true;
    let prevDistVec = new Paper.Point(0, 0);

    Paper.view.onMouseMove = (event) => {
      const mousePos = event.point;
      const distVec = mousePos.subtract(pos).normalize();
      matrix.set(1, distVec.x, distVec.x, 1, 0, 0);
      if (prevDistVec.y * distVec.y < 0) {
        if (showBack) {
          card1.children[card1.children.length - 2].opacity = 1;
          showBack = false;
        } else {
          card1.children[card1.children.length - 2].opacity = 0;
          showBack = true;
        }
      }
      if (distVec.y > 0) {
        card1.children[card1.children.length - 1].opacity = Math.abs(distVec.x);
      } else {
        card1.children[card1.children.length - 1].opacity = 0;
      }
      card1.matrix = matrix;
      card1.scale(1 - 0.5 * Math.abs(distVec.x));
      card1.position = pos;
      prevDistVec = distVec;
    }
     */

    // Paper.view.onFrame = (event) => {
    //   const timeStep = event.time;
    //   switch (Math.floor(timeStep % 4)) {
    //     case 0:
    //       card1.skew(1, 1);
    //       card1.scale(0.985);
    //       break;
    //     case 1:
    //       card1.skew(-1, -1);
    //       card1.scale(1.015);
    //       break;
    //     case 2:
    //       card1.skew(-1, -1);
    //       card1.scale(0.985);
    //       break;
    //     case 3:
    //       card1.skew(1, 1);
    //       card1.scale(1.015);
    //       break;
    //   }
    // }

    // const card3 = getCard('SPADE-3', point.add(2));
    // const cards = [card1, card2, card3];
    // const positions = Array.from(cards, (card, _) => card.position);
    // Paper.view.onFrame = (event) => {
    //   orbitCards(event, positions, cards);
    // };
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