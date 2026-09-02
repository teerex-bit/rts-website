const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

if (toggle && navigation) {
  toggle.addEventListener('click', () => {
    const isOpen = navigation.dataset.open === 'true';
    navigation.dataset.open = String(!isOpen);
    toggle.setAttribute('aria-expanded', String(!isOpen));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navigation.dataset.open = 'false';
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}
