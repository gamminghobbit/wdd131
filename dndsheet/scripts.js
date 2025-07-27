function updateCharacter() {
  const name = document.getElementById("char-name").value;
  const charClass = document.getElementById("char-class").value;
  const level = document.getElementById("char-level").value;

  const output = document.getElementById("character-output");

  output.innerText = `${name || "Unnamed"} the level ${level || "1"} ${charClass || "Adventurer"}`;
}
function calculateModifier(score) {
  return Math.floor((score - 10) / 2);
}

function updateModifiers() {
  const abilities = ['str', 'dex', 'con', 'int', 'wis', 'cha'];

  abilities.forEach(stat => {
    const value = parseInt(document.getElementById(stat).value) || 10;
    const mod = calculateModifier(value);
    const sign = mod >= 0 ? `+${mod}` : mod;
    document.getElementById(`${stat}-mod`).innerText = sign;
  });
}

// Hook it up to inputs
window.addEventListener("DOMContentLoaded", () => {
  updateModifiers(); // calculate on page load

  document.querySelectorAll('.ability input').forEach(input => {
    input.addEventListener('input', updateModifiers);
  });
});
const classPresets = {
  fighter: {
    saves: { fort: 2, reflex: 0, will: 0 },
    skills: ['Climb', 'Craft', 'Handle Animal', 'Intimidate', 'Jump', 'Ride', 'Swim']
  },
  rogue: {
    saves: { fort: 0, reflex: 2, will: 0 },
    skills: ['Appraise', 'Balance', 'Bluff', 'Disable Device', 'Hide', 'Listen', 'Move Silently', 'Open Lock', 'Search', 'Spot', 'Tumble']
  },
  wizard: {
    saves: { fort: 0, reflex: 0, will: 2 },
    skills: ['Concentration', 'Craft', 'Knowledge (Arcana)', 'Spellcraft']
  },
  cleric: {
    saves: { fort: 2, reflex: 0, will: 2 },
    skills: ['Concentration', 'Diplomacy', 'Heal', 'Knowledge (Religion)', 'Spellcraft']
  }
};

function applyClassPreset() {
  const selected = document.getElementById("class-preset").value;
  if (!selected || !classPresets[selected]) return;

  const { saves, skills } = classPresets[selected];

  // Update Saving Throws
  document.querySelector('.saving-throws').innerHTML = `
    <h2>Saving Throws</h2>
    <ul>
      <li><strong>Fortitude:</strong> +${saves.fort}</li>
      <li><strong>Reflex:</strong> +${saves.reflex}</li>
      <li><strong>Will:</strong> +${saves.will}</li>
    </ul>
  `;

  // Update Skills List
  const skillList = skills.map(skill => `<div><strong>${skill}:</strong> +0</div>`).join('');
  document.querySelector('.skills-grid').innerHTML = skillList;
}
function addGearItem() {
  const input = document.getElementById('gear-input');
  const value = input.value.trim();
  if (!value) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="gear-label">${value}</span>
    <button onclick="removeGearItem(this)">X</button>
  `;

  li.addEventListener('click', () => {
    li.classList.toggle('checked');
  });

  document.getElementById('gear-list').appendChild(li);
  input.value = '';
}

function removeGearItem(button) {
  const li = button.parentElement;
  li.remove();
}
