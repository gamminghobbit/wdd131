const themeSelector = document.getElementById('themeSelector');
const logo = document.getElementById('logo');

function changeTheme() {
  const selectedTheme = themeSelector.value;
  if (selectedTheme === "dark") {
    document.body.classList.add("dark");
    logo.src = "byui-logo_white.png"; // adjust this if your file name differs
  } else {
    document.body.classList.remove("dark");
    logo.src = "byui-logo_blue.jpg";
  }
}

themeSelector.addEventListener('change', changeTheme);
