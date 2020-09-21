export default class State {
  constructor() {
    this.points = 0;
    this.emptyTurns = 0;
  }

  clear() {
    if (document.getElementById('goblin')) {
      document.getElementById('goblin').remove();
    }
    document.querySelector('.points').textContent = 0;
  }

  refresh() {
    this.points += 1;
    document.querySelector('.points').textContent = this.points;
  }
}
