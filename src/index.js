import './style.css';
import gnomeImage from './img/gnome.png';

class GnomeGame {
  constructor(boardSize = 4) {
    this.boardSize = boardSize;
    this.cells = [];
    this.currentGnomeCell = null;
    this.score = 0;
    this.interval = null;
    this.boardElement = document.getElementById('game-board');
    this.scoreElement = document.getElementById('score');
    this.resetButton = document.getElementById('reset-btn');

    this.init();
  }

  init() {
    this.createBoard();
    this.createGnome();
    this.startMoving();
    this.attachEvents();
  }

  createBoard() {
    this.boardElement.innerHTML = '';
    this.cells = [];

    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      this.boardElement.appendChild(cell);
      this.cells.push(cell);
    }
  }

  createGnome() {
    if (this.currentGnomeCell) {
      this.currentGnomeCell.innerHTML = '';
      this.currentGnomeCell.classList.remove('has-gnome');
    }

    const gnome = document.createElement('img');
    gnome.src = gnomeImage;
    gnome.alt = 'Gnome';
    gnome.className = 'gnome-image';

    const randomIndex = Math.floor(Math.random() * this.cells.length);
    const cell = this.cells[randomIndex];
    cell.appendChild(gnome);
    cell.classList.add('has-gnome');
    this.currentGnomeCell = cell;
  }

  moveGnome() {
    if (!this.currentGnomeCell) return;

    const currentIndex = parseInt(this.currentGnomeCell.dataset.index);
    let newIndex;

    do {
      newIndex = Math.floor(Math.random() * this.cells.length);
    } while (newIndex === currentIndex);

    const newCell = this.cells[newIndex];
    const gnome = this.currentGnomeCell.querySelector('img');

    if (gnome) {
      newCell.appendChild(gnome);
      this.currentGnomeCell.classList.remove('has-gnome');
      newCell.classList.add('has-gnome');
      this.currentGnomeCell = newCell;
    }
  }

  startMoving() {
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.moveGnome();
    }, 1000);
  }

  handleCellClick(event) {
    const cell = event.target.closest('.cell');
    if (!cell) return;

    if (cell.classList.contains('has-gnome')) {
      this.score += 1;
      this.scoreElement.textContent = this.score;

      cell.style.backgroundColor = '#FFD700';
      setTimeout(() => {
        cell.style.backgroundColor = '';
      }, 200);
    }
  }

  resetGame() {
    this.score = 0;
    this.scoreElement.textContent = this.score;
    this.createGnome();
  }

  attachEvents() {
    this.boardElement.addEventListener('click', (event) => this.handleCellClick(event));
    this.resetButton.addEventListener('click', () => this.resetGame());
  }

  destroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.boardElement.removeEventListener('click', this.handleCellClick);
    this.resetButton.removeEventListener('click', this.resetGame);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const game = new GnomeGame();
  console.log('Game initialized', game);
});
