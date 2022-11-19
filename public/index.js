const form = document.getElementById("form");
const input = document.querySelector("input");
const messageDiv = document.querySelector(".message");

const shortenedLink = document.querySelector(".short-link");

const handleSubmit = async () => {
    console.log("called")
  let url = document.querySelector("#url").value;
  const response = await fetch("http://localhost:3000/link", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ url }),
  }).then((response) => response.json());
  console.log(response)
  console.log(response.status)
  if (response.status == '400') {
    input.style.border = "2px solid red";
    messageDiv.textContent = `${response.message}, please try another one!`;
  }
  if (response.status === '200') {
    messageDiv.textContent = response.message;
  }
};

 // Clear input field and error message
const clearFields = () => {
  let url = document.querySelector("#url");
  url.value = '';
  url.addEventListener('focus', () => {
    messageDiv.textContent = '';
  })
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  handleSubmit();
  clearFields();
});