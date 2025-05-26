import { useRef, useEffect } from 'react';
import Paper from 'paper';
import './Canvas.css';

const Canvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    Paper.setup(canvasRef.current);

    Paper.view.viewSize = new Paper.Size(window.innerWidth, window.innerHeight);

    // * based on standard poker card dims (mm)
    const scale = 5;
    const cardWidth = 63.5 * scale;
    const cardHeight = 88.9 * scale;
    const cardRadius = 3.5 * scale;

    const point = Paper.view.bounds.topLeft;
    const size = new Paper.Size(cardWidth, cardHeight);

    const cardClip = new Paper.Shape.Rectangle({
      point: point,
      size: size,
      radius: cardRadius,
    });
    const cardBackground = new Paper.Shape.Rectangle({
      point: point,
      size: size,
      radius: cardRadius,
      fillColor: 'white',
      strokeColor: 'black'
    });
    const cardRaster = new Paper.Raster({
      source: 'SPADE-1.svg',
      position: cardClip.bounds.center,
    });
    cardRaster.onLoad = () => {
      cardRaster.scaling = 0.99 * cardWidth / cardRaster.width;
    };
    const card = new Paper.Group({
      children: [cardClip, cardBackground, cardRaster],
      clipped: true
    })

    return () => {
      Paper.project.clear();
    }
  }, []);

  return <canvas ref={canvasRef} id="canvas" />
}

export default Canvas;