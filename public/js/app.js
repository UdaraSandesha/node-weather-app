const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = "";
  messageTwo.textContent = "Loading...";

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageTwo.textContent = data.error;
      } else {
        messageOne.textContent = data.placeName;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});
