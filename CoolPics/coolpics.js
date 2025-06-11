const menuButton = document.getElementById('menu-button');
const navList = document.querySelector('#main-nav ul');

menuButton.addEventListener('click', () => {
  navList.classList.toggle('hide');
});
function handleResize() {
  const navList = document.querySelector('#main-nav ul');
  if (window.innerWidth > 1000) {
    navList.classList.remove('hide');
  } else {
    navList.classList.add('hide');
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);
const gallery = document.querySelector('.gallery');

gallery.addEventListener('click', (event) => {
  const clickedImg = event.target.closest('img');
  if (!clickedImg) return;

  const src = clickedImg.getAttribute('src');
  const alt = clickedImg.getAttribute('alt');
  const base = src.split('-')[0]; // "norris"
  const fullSrc = `${base}-full.jpeg`;

  const dialog = document.createElement('dialog');
  dialog.innerHTML = `
    <img src="${fullSrc}" alt="${alt}">
    <button class="close-viewer">X</button>
  `;
  document.body.appendChild(dialog);
  dialog.showModal();

  dialog.querySelector('.close-viewer').addEventListener('click', () => {
    dialog.close();
    dialog.remove();
  });

  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) {
      dialog.close();
      dialog.remove();
    }
  });
});
