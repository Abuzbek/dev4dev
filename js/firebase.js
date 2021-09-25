const name = document.querySelector("[name=name]");
const phoneNumber = document.querySelector("[name=phone]");
const question = document.querySelector("[name=question]");
const message = document.querySelector("[name=message]");
document.querySelector("#form-submit").addEventListener("submit", async (e) => {
  e.preventDefault();
  let data = new Date(Date.now());
  await $.getJSON(
    "https://ipgeolocation.abstractapi.com/v1/?api_key=4c593469b08d45a7b7f279b6f55bff31",
    function (ip) {
      firebase.database().ref(`/users/${data}`).set({
        name: name.value,
        phoneNumber: phoneNumber.value,
        question: question.value,
        message: message.value,
        IP: ip,
      });
    }
  );

  name.value = "";
  phoneNumber.value = "";
  question.value = "";
  message.value = "";
});
