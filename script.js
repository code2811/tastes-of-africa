// Recipe Filter
const filterButtons = document.querySelectorAll('.recipe-filters button');
const recipeCards = document.querySelectorAll('.recipe-card');

if (filterButtons.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const region = btn.getAttribute('data-region');
      recipeCards.forEach(card => {
        if (region === 'all' || card.getAttribute('data-region') === region) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// Add to Favorites
const favoriteButtons = document.querySelectorAll('.favorite-btn');
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

function updateFavoriteButtons() {
  favoriteButtons.forEach(btn => {
    const id = btn.getAttribute('data-id');
    if (favorites.includes(id)) {
      btn.classList.add('favorited');
    } else {
      btn.classList.remove('favorited');
    }
  });
}

if (favoriteButtons.length) {
  favoriteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      if (favorites.includes(id)) {
        favorites = favorites.filter(fav => fav !== id);
      } else {
        favorites.push(id);
      }
      localStorage.setItem('favorites', JSON.stringify(favorites));
      updateFavoriteButtons();
    });
  });
  updateFavoriteButtons();
}

// Contact Form Validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Remove any existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) existingError.remove();
    
    if (message.length <= 20) {
      const errorDiv = document.createElement('div');
      errorDiv.className = 'error-message';
      errorDiv.innerHTML = '<p>⚠️ Message must be more than 20 characters.</p>';
      contactForm.insertBefore(errorDiv, contactForm.firstChild);
      return;
    }
    contactForm.style.display = 'none';
    const confirmation = document.createElement('div');
    confirmation.className = 'confirmation';
    confirmation.innerHTML = `<h2>Thank you, ${name}! We've received your message.</h2>`;
    contactForm.parentNode.appendChild(confirmation);
  });
}

// Newsletter Form (Optional Enhancement)
document.querySelectorAll('#newsletter').forEach(form => {
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    form.innerHTML = `<p>Thank you for subscribing, ${email}!</p>`;
  });
});
