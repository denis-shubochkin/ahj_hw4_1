// TODO: write your code here


const butn = document.querySelector('.check-button');
const input = document.querySelector('.input');
const incorrectLabel = document.querySelector('.hidden-incorrect');
const luhnLabel = document.querySelector('.hidden-luhn');
const correctLabel = document.querySelector('.hidden-correct');
const labels = document.querySelector('.labels');
let content;


function clearLabelsErrors() {
  incorrectLabel.style.display = 'none';
  luhnLabel.style.display = 'none';
  correctLabel.style.display = 'none';
}

function luhnAlgorithm(digits) {
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let cardNum = parseInt(digits[i], 10);
    if ((digits.length - i) % 2 === 0) {
      cardNum *= 2;

      if (cardNum > 9) {
        cardNum -= 9;
      }
    }

    sum += cardNum;
  }
  console.log(sum);
  return sum % 10 === 0;
}


export function checkNumber(cont) {
  const res = cont.replace(/\s/g, '');
  if (res.length !== 16) {
    return 'Incorrect length';
  }
  if (!luhnAlgorithm(res)) {
    return 'Incorrect luhn';
  }

  return 1;
}


function checkCorrect(event) {
  event.preventDefault();
  clearLabelsErrors();
  content = input.value;
  if (checkNumber(content) === 'Incorrect length') {
    incorrectLabel.style.display = 'block';
  } else if (checkNumber(content) === 'Incorrect luhn') {
    luhnLabel.style.display = 'block';
  } else if (checkNumber(content) === 1) {
    correctLabel.style.display = 'block';
  }
}


if (butn) { butn.addEventListener('click', checkCorrect); }


export function checkPaySystem(cont) {
  const res = cont.replace(/\s/g, '');
  if (res.startsWith('4013')) {
    return 'VISA';
  }
  if (res.startsWith('5016')) {
    return 'MasterCard';
  }
  if (res.startsWith('5012')) {
    return 'American Express';
  }
  if (res.startsWith('5019')) {
    return 'Diners';
  }
  if (res.startsWith('4022')) {
    return 'Discover';
  }
  if (res.startsWith('4021')) {
    return 'JCB';
  }
  if (res.startsWith('4018')) {
    return 'МИР';
  }

  return 'Платежная система не определена';
}

function showPaySystem() {
  const card = document.querySelector('.card');
  if (card) { card.remove(); }
  content = input.value;
  labels.insertAdjacentHTML('beforebegin', `<div class="card">${checkPaySystem(content)}</div>`);
}


if (input) { input.addEventListener('keyup', showPaySystem); }
