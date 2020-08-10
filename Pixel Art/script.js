const METHODS = {
  0: 'querySelector',
  1: 'querySelectorAll',
  2: 'createElement',
};

let lazyCoder = (keyMethod, tagName) => {
  return document[`${METHODS[keyMethod]}`](tagName);
}

const divBoard = lazyCoder(0, '.board');
let pixel = lazyCoder(1, '.pixel');
let divWithSelection = {};

function generateFourColors() {
  for (let i = 0; i < 4; i += 1) {
    let primary = lazyCoder(2, 'div');
    primary.classList.add('color');

    if (i === 0) {
      primary.classList.add('selected');
    }

    lazyCoder(0, '#color-palette').appendChild(primary);
  }
  divWithSelection = lazyCoder(0, '.selected');
}

function generateElements(elements) {
  if (elements < 5) {
    elements = 5;
  } else if (elements > 50) {
    elements = 50;
  }

  const divColumns = new Array(elements).fill(0);
  divColumns.forEach((e, index, array) => {
    e = lazyCoder(2, 'div');
    e.className = 'line';
    array.forEach((i) => {
      i = lazyCoder(2, 'div');
      i.className = 'pixel';
      i.id = 'pixel';
      e.appendChild(i);
    });
    e.style.gridTemplateColumns = `repeat(${elements}, 40px)`;
    divBoard.appendChild(e);
  });
  pixel = lazyCoder(1, '.pixel');
}

function clearBoard() {
  lazyCoder(1, '.line').forEach((e) => e.remove());
}

function getCurrentColor() {
  return divWithSelection.style.backgroundColor;
}

lazyCoder(0, '#generate-board').onclick = () => {
  if (lazyCoder(0, '.input-text').value === '') {
    window.alert('Board inválido!');
  } else {
    clearBoard();
    generateElements(Number(lazyCoder(0, '.input-text').value));
  }
};

lazyCoder(0, '#color-palette').addEventListener('click', (e) => {
  divWithSelection.classList.remove('selected');
  e.target.classList.add('selected');
  divWithSelection = e.target;
});

lazyCoder(0, '.board').addEventListener('click', (e) => {
  e.target.style.backgroundColor = getCurrentColor();
  console.log(e.target.style.backgroundColor)
});

lazyCoder(0, '.btn-reset').addEventListener('click', () => {
  pixel.forEach((p) => {
    p.style.backgroundColor = 'white';
  });
});

lazyCoder(0, '.btn-color').addEventListener('click', (e) => {
  changeColorToRandom();
});

function getRandomColor() {
  const colors = [];

  for (let i = 0; i < 3; i += 1) {
    colors.push(Math.floor(Math.random() * 255));
  }

  return `rgb(${colors[0]}, ${colors[1]}, ${colors[0]})`;
}

function changeColorToRandom() {
  lazyCoder(1, '.color').forEach((item) => {
    item.style.backgroundColor = getRandomColor();
  });
}

window.onload = () => {
  generateFourColors();
  changeColorToRandom();
  generateElements(5);
};
