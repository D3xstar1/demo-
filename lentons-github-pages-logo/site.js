const menu = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
const form = document.querySelector('form');
const practiceArea = document.querySelector('#area');
const status = document.querySelector('.form-status');

function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
}

menu.addEventListener('click', () => {
  const expanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!expanded));
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    closeMenu();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

document.querySelector('.header').classList.add('menu-ready');

function openLinkedInsight() {
  const target = document.getElementById(window.location.hash.slice(1));
  if (target instanceof HTMLDetailsElement && target.closest('.insight-grid')) {
    target.open = true;
  }
}

openLinkedInsight();
window.addEventListener('hashchange', openLinkedInsight);

if (form) {
  const selectedPractice = new URLSearchParams(window.location.search).get('practice');
  if ([...practiceArea.options].some((option) => option.value === selectedPractice)) {
    practiceArea.value = selectedPractice;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
    status.textContent = 'Demo complete. Your sample enquiry was not sent or saved.';
  });

  form.addEventListener('input', () => {
    status.textContent = '';
  });

  form.querySelector('button').disabled = false;
}
