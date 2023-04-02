import createCustomSelect from './custom-select';

const colorContainer = document.querySelectorAll('.color-container');
const form = document.getElementById('new-color');
const notification = document.getElementById('message');
let hiddenAfter5Sec;

createCustomSelect();
getData();

function coppyMessage(message, data) {
  clearTimeout(hiddenAfter5Sec);
  notification.classList.remove('hidden');
  notification.textContent = `${message} ${data}`;
  hiddenAfter5Sec = setTimeout(() => {
    notification.classList.add('hidden');
  }, 5000);
}

function copyToClipboard() {
  navigator.clipboard.writeText(this.dataset.color);
  this.dataset.color != '' ? coppyMessage('You copied the hex code: ', this.dataset.color) : '';
}

function render(arrData) {
  colorContainer.forEach((color, index) => {
    color.innerHTML = `
        <div class="color" data-color="${arrData[index]}" style="background-color: ${arrData[index]}">
        </div>
        <div class="color-name">${arrData[index]}</div>
      `;
  });
  document.querySelectorAll('.color').forEach((color) => color.addEventListener('click', copyToClipboard));
}

function getData() {
  const colorInput = document.forms['new-color'].elements[0].value.slice(1);
  const colorScheme = document.forms['new-color'].elements[1].value.toLowerCase();

  fetch(`https://www.thecolorapi.com/scheme?hex=${colorInput}&mode=${colorScheme}&count=5`)
    .then((res) => res.json())
    .then((data) => {
      render(data.colors.map((el) => el.hex.value));
    });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  getData();
});
