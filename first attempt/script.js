const modalOverlay = document.getElementById('modalOverlay');
const ratingScale = document.getElementById('ratingScale');
let selectedRating = null;

// Modal state can be "normal", "fullscreen", or "small"
let modalState = "normal";

function toggleResize() {
  const modal = document.getElementById('feedbackModal');
  const resizeBtn = document.getElementById('resizeBtn');

  if (modalState === "normal") {
    modal.classList.remove("small");
    modal.classList.add("fullscreen");  // Apply expanded state
    modalState = "fullscreen";
    resizeBtn.title = "Reduce to normal size";
    resizeBtn.innerHTML = fullscreenIcon;
  } else if (modalState === "fullscreen") {
    modal.classList.remove("fullscreen");
    modal.classList.add("small");
    modalState = "small";
    resizeBtn.title = "Expand to normal size";
    resizeBtn.innerHTML = smallIcon;
  } else if (modalState === "small") {
    modal.classList.remove("small");
    modalState = "normal";
    resizeBtn.title = "Toggle fullscreen";
    resizeBtn.innerHTML = normalIcon;
  }
}

// Open modal
document.querySelector('.open-modal-btn').addEventListener('click', () => {
  modalOverlay.style.display = 'flex';
});

// Close modal on outside click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    closeModal();
  }
});

// Generate rating buttons
for (let i = 1; i <= 10; i++) {
  const number = document.createElement('div');
  number.classList.add('rating-number');
  number.innerText = i;
  number.addEventListener('click', () => selectRating(i));
  ratingScale.appendChild(number);
}

function selectRating(num) {
  selectedRating = num;
  document.querySelectorAll('.rating-number').forEach(btn => {
    btn.classList.remove('selected');
  });
  document.querySelector(`.rating-number:nth-child(${num})`).classList.add('selected');
}

function closeModal() {
  modalOverlay.style.display = 'none';
  selectedRating = null;
  document.querySelectorAll('.rating-number').forEach(btn => btn.classList.remove('selected'));
}

function submitFeedback() {
  if (selectedRating !== null) {
    alert(`Thanks for your feedback! You rated us a ${selectedRating}.`);
    closeModal();
  } else {
    alert('Please select a rating before submitting.');
  }
}

// Set up the resize button event listener when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('resizeBtn').addEventListener('click', toggleResize);
});