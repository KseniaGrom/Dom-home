describe('Basic test', () => {
  test('should pass', () => {
    expect(true).toBe(true);
  });
});


describe('GnomeGame', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="container">
        <h1>Игра "Ударь гнома"</h1>
        <div class="score-container">
          <span>Счет: </span>
          <span id="score">0</span>
        </div>
        <div class="game-board" id="game-board"></div>
        <button class="reset-btn" id="reset-btn">Новая игра</button>
      </div>
    `;
  });

  test('should have empty game board initially', () => {
    const board = document.getElementById('game-board');
    expect(board).toBeTruthy();
    expect(board.children.length).toBe(0);
  });

  test('should have reset button', () => {
    const resetBtn = document.getElementById('reset-btn');
    expect(resetBtn).toBeTruthy();
    expect(resetBtn.textContent).toBe('Новая игра');
  });

  test('should have score element', () => {
    const score = document.getElementById('score');
    expect(score).toBeTruthy();
    expect(score.textContent).toBe('0');
  });
});