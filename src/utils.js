import Paper from 'paper';

const suits = ['SPADE', 'CLUB', 'HEART', 'DIAMOND'];
const cardNames = Array.from({ length: 52 }, (_, i) => `${suits[Math.floor(i / 13)]}-${i % 13 + 1}`);

export const shuffle = () => {
  let rand = Array.from(cardNames, (name, _) => [Math.random() * 100, name]);
  rand.sort((a, b) => a[0] - b[0]);
  const shuffled = Array.from(rand, (pair, _) => pair[1]);
  return shuffled;
};

export const getCard = (cardName, point) => {
  // * based on standard poker card dims (mm)
  const scale = 2;
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
    position: cardClip.bounds.center
  });
  cardRaster.onLoad = () => {
    cardRaster.scaling = 0.99 * cardWidth / cardRaster.width;
  }
  const card = new Paper.Group({
    children: [cardClip, cardBackground, cardRaster],
    clipped: true,
    applyMatrix: false,
    pivot: cardClip.bounds.bottomLeft.add([cardRadius, -cardRadius])
  });
  card.sendToBack();
  return card;
};

export const fanCards = (cardList) => {
  // * perform a card fan
  Array.from(cardList, (card, index) => {
    card.tween(
      { rotation: 0 },
      { rotation: -(index / cardList.length) * 360 },
      {
        duration: 1000,
        easing: 'easeInOutQuad'
      }
    );
  });
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