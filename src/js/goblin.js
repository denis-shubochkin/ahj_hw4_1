export default class Goblin {
  constructor(cellsCount) {
    this.maxMoves = 5;
    this.fieldCelssCount = cellsCount;
  }

  changePos() {
    let newPos = Math.floor(0 + Math.random() * (this.fieldCelssCount - 1));
    do {
      newPos = Math.floor(0 + Math.random() * (this.fieldCelssCount - 1));
    }
    while (this.position === newPos);
    this.position = newPos;
  }
}
