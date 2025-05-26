import Paper from 'paper';

const cardFiles = Array.from({ length: 52 }, (_, i) => {
  if (i + 1 <= 13) {
    return `SPADE-${i % 13 + 1}`;
  }
  if (i + 1 <= 26) {
    return `CLUB-${i % 13 + 1}`;
  }
  if (i + 1 <= 39) {
    return `HEART-${i % 13 + 1}`;
  }
  return `DIAMOND-${i % 13 + 1}`;
});

export const shuffle = () => {
  let rand = Array.from(cardFiles, (cardFile, _) => [cardFile, Math.random() * 100]);
  rand.sort((a, b) => a[1] - b[1]);
  const shuffled = Array.from(rand, (pair, _) => pair[0]);
  return shuffled;
};

export const getCard = (cardName, point) => {
  // * based on standard poker card dims (mm)
  const scale = 5;
  const cardWidth = 63.5 * scale;
  const cardHeight = 88.9 * scale;
  const cardRadius = 3.5 * scale;
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
    source: `${cardName}.svg`,
    position: cardClip.bounds.center,
  });
  cardRaster.onLoad = () => {
    cardRaster.scaling = 0.99 * cardWidth / cardRaster.width;
  };
  const card = new Paper.Group({
    children: [cardClip, cardBackground, cardRaster],
    clipped: true
  });
  card.sendToBack();
  return card;
};

export const flipCards = (cardList) => {
  // * flip cards from left to right
  const interval = 500;
  Array.from(cardList, (card, index) => {
    setTimeout(() => {
      card.tween(
        { opacity: 1 },
        { opacity: 0 },
        {
          duration: 1000,
          easing: 'easeInOutQuad'
        }
      );
    }, interval * index);
  });
};