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
    strokeColor: 'black',
    strokeWidth: 2
  });
  const cardRaster = new Paper.Raster({
    source: `${cardName}.svg`,
    position: cardClip.bounds.center
  });
  cardRaster.onLoad = () => {
    cardRaster.scaling = 0.99 * cardWidth / cardRaster.width;
  }
  const cardShading = new Paper.Shape.Rectangle({
    point: point,
    size: size,
    radius: cardRadius,
    fillColor: new Paper.Color(0, 0, 0, 0.8),
    opacity: 0
  });
  const cardBack = new Paper.Shape.Rectangle({
    point: point,
    size: size,
    radius: cardRadius,
    fillColor: new Paper.Color(1, 0, 0, 1),
    opacity: 0
  });
  const card = new Paper.Group({
    children: [cardClip, cardBackground, cardRaster, cardBack, cardShading],
    clipped: true,
    applyMatrix: false,
    pivot: cardClip.bounds.center
  });
  card.sendToBack();
  return card;
};

export const fanCards = (cardList) => {
  // * perform a card fan
  Array.from(cardList, (card, index) => {
    // TODO: fix pivot issue
    // card.pivot = card.bounds.bottomLeft.add([card.radius, -card.radius]);
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

export const orbitCards = (event, initialPositions, cardList) => {
  // * orbit several cards
  const pathWidth = 100;
  const offset = pathWidth * cardList.length;
  const speed = 5;
  Array.from(cardList, (card, index) => {
    const sine = Math.sin(offset * index + speed * event.count * Math.PI / 180);
    const cosine = Math.cos(offset * index + speed * event.count * Math.PI / 180);
    if (cosine > 0) {
      if (sine > 0) {
        // * this part is scuffed when the settings aren't right
        card.bringToFront();
      }
      card.scaling = 1 - 0.5 * Math.abs(sine);
    } else {
      card.sendToBack();
      card.scaling = 0.2 + 0.3 * Math.abs(sine);
    }
    card.position = initialPositions[index].add([pathWidth * sine, 0]);
  });
};

export const inspectCard = (event, card, pos) => {
  const mousePos = event.point;
  const distVec = mousePos.subtract(pos).normalize();
  card.matrix.set(1, distVec.x, distVec.x, 1, 0, 0);
  if (distVec.y > 0) {
    card.children[card.children.length - 1].opacity = Math.abs(distVec.x);
  } else {
    card.children[card.children.length - 1].opacity = 0;
  }
  card.scale(1 - 0.5 * Math.abs(distVec.x));
  card.position = pos;
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