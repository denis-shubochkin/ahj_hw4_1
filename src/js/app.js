// TODO: write your code here


const butn = document.querySelector('.check-button');
const input = document.querySelector('.input');
const incorrectLabel = document.querySelector('.hidden-incorrect');
const correctLabel = document.querySelector('.hidden-correct');
butn.addEventListener('click', checkCorrect);
let content;

function checkCorrect(event) {
  event.preventDefault();
  content = input.value.replace(/\s/g, '');
  console.log(luhnAlgorithm(content));
  if(content.length!==16)
   {
    incorrectLabel.style.display = 'block';
   }
   else
   {
    incorrectLabel.style.display = 'none';
    correctLabel.style.display = 'block';
   }
}


function luhnAlgorithm(digits) {
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let cardNum = parseInt(digits[i]);

    if ((digits.length - i) % 2 === 0) {
      cardNum = cardNum * 2;

      if (cardNum > 9) {
        cardNum = cardNum - 9;
      }
    }

    sum += cardNum;
  }
  console.log(sum)
  return sum % 10 === 0;
}

