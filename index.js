import createCustomSelect from "./custom-select";

const form = document.getElementById("new-color");
const colors = document.querySelectorAll(".color");
const notification = document.getElementById("message");
let hiddenAfter5Sec;

createCustomSelect();

function coppyMessage(message, data) {
  clearTimeout(hiddenAfter5Sec);
  notification.classList.remove("hidden");
  notification.textContent = `${message} ${data}`;
  hiddenAfter5Sec = setTimeout(() => {
    notification.classList.add("hidden");
  }, 5000);
}

function copyToClipboard() {
  navigator.clipboard.writeText(this.dataset.color);
  this.dataset.color != ""
    ? coppyMessage("You copied the hex code: ", this.dataset.color)
    : "";
}

colors.forEach((color) => color.addEventListener("click", copyToClipboard));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(document.forms["new-color"].elements[0].value);
  const colorInput = document.forms["new-color"].elements[0].value.slice(1);
  const colorScheme =
    document.forms["new-color"].elements[1].value.toLowerCase();

  console.log(colorInput);

  console.log(
    `https://www.thecolorapi.com/scheme?hex-${colorInput}&mode=${colorScheme}&count=5`
  );

  fetch(
    `https://www.thecolorapi.com/scheme?hex=${colorInput}&mode=${colorScheme}&count=5`
  )
    .then((res) => res.json())
    .then((data) => console.log(data.colors));
});
