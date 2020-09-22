// TODO: write your code here


const butn = document.querySelector('.check-button');
const input = document.querySelector('.input');
const incorrectLabel = document.querySelector('.hidden-incorrect');
const luhnLabel = document.querySelector('.hidden-luhn');
const correctLabel = document.querySelector('.hidden-correct');
const labels = document.querySelector('.labels');
butn.addEventListener('click', checkCorrect);
input.addEventListener('keyup',showPaySystem);
let content;

 function clearLabelsErrors() {
  incorrectLabel.style.display = 'none';
  luhnLabel.style.display = 'none'; 
  correctLabel.style.display = 'none';
}

   function checkPaySystem(cont)
{
  cont = cont.replace(/\s/g, '');
  if(cont.startsWith('4013'))
  {
    return 'VISA';
  }
  else if(cont.startsWith('5016'))
  {
    return 'MasterCard';
  }
  else if(cont.startsWith('5012'))
  {
    return 'American Express';
  }
  else if(cont.startsWith('5019'))
  {
    return 'Diners';
  }
  else if(cont.startsWith('4022'))
  {
    return 'Discover';
  }
  else if(cont.startsWith('4021'))
  {
    return 'JCB';
  }
  else if(cont.startsWith('4018'))
  {
    return 'МИР';
  }
  else 
  {
    return 'Платежная система не определена';
  }
}

  function showPaySystem() {
  let card = document.querySelector('.card');
  if(card) {card.remove();}
  content = input.value;
  labels.insertAdjacentHTML('beforebegin',`<div class="card">${checkPaySystem(content)}</div>`)
}

  function checkNumber(cont) {
  cont = cont.replace(/\s/g, '');
  if(cont.length!==16)
  {
    return 'Incorrect length';
  }
  else if (!luhnAlgorithm(cont))
  {
    return 'Incorrect luhn';
  }
  else
  { 
    return 1;
   }
}

  function checkCorrect(event) {
  event.preventDefault();
  clearLabelsErrors();
  content = input.value;
  if(checkNumber(content)==='Incorrect length')
  {
    incorrectLabel.style.display = 'block';
  }
  else if(checkNumber(content)==='Incorrect luhn')
  {
    luhnLabel.style.display = 'block';  
  }
  else if(checkNumber(content)===1)
  {
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

