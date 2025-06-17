let participantCount = 1;

const addButton = document.getElementById("add-participant");
addButton.addEventListener("click", () => {
  participantCount++;
  const newSectionHTML = participantTemplate(participantCount);
  addButton.insertAdjacentHTML("beforebegin", newSectionHTML);
});

function participantTemplate(count) {
  return `
    <section class="participant${count}">
      <label for="name${count}">Participant Name</label>
      <input type="text" id="name${count}" name="name${count}">
      
      <label for="age${count}">Age</label>
      <input type="number" id="age${count}" name="age${count}">

      <label for="fee${count}">Fee</label>
      <input type="number" id="fee${count}" name="fee${count}">
    </section>
  `;
}

const form = document.querySelector("form");
const summary = document.getElementById("summary");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("adultName").value;
  const total = totalFees();
  const message = successTemplate({ name, count: participantCount, total });

  form.classList.add("hide");
  summary.innerHTML = message;
  summary.classList.remove("hide");
});

function totalFees() {
  let fees = [...document.querySelectorAll("[id^=fee]")];
  return fees.reduce((sum, input) => sum + parseFloat(input.value || 0), 0);
}

function successTemplate({ name, count, total }) {
  return `<p>Thank you ${name} for registering. You have registered ${count} participants and owe $${total} in Fees.</p>`;
}
