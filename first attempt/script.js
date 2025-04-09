const modalOverlay = document.getElementById('modalOverlay');
const ratingScale = document.getElementById('ratingScale');
let selectedRating = null;

// Define inline SVG icons (customize paths as needed)
const normalIcon = `<svg width="24" height="24" viewBox="0 0 24 24">
  <path fill="currentColor" d="M4,4 L10,4 L10,6 L6,6 L6,10 L4,10 Z M14,4 L20,4 L20,10 L18,10 L18,6 L14,6 Z M4,14 L6,14 L6,18 L10,18 L10,20 L4,20 Z M14,20 L14,18 L18,18 L18,14 L20,14 L20,20 Z"/>
</svg>`;

const fullscreenIcon = `<svg width="24" height="24" viewBox="0 0 24 24">
  <path fill="currentColor" d="M2,2 L2,10 L4,10 L4,4 L10,4 L10,2 Z M14,2 L14,4 L20,4 L20,10 L22,10 L22,2 Z M2,14 L4,14 L4,20 L10,20 L10,22 L2,22 Z M14,22 L14,20 L18,20 L18,14 L22,14 L22,22 Z"/>
</svg>`;

const smallIcon = `<svg width="24" height="24" viewBox="0 0 24 24">
  <path fill="currentColor" d="M8,8 L16,8 L16,16 L8,16 Z"/>
</svg>`;

// Define Zoom Icons (using inline SVG)
const zoomInIcon = `<svg width="24" height="24" viewBox="0 0 24 24">
  <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="2" fill="none"/>
  <line x1="10" y1="7" x2="10" y2="13" stroke="currentColor" stroke-width="2"/>
  <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" stroke-width="2"/>
</svg>`;

const zoomOutIcon = `<svg width="24" height="24" viewBox="0 0 24 24">
  <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="2" fill="none"/>
  <line x1="7" y1="10" x2="13" y2="10" stroke="currentColor" stroke-width="2"/>
</svg>`;

let zoomed = false;

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

function toggleZoom() {
  const overlay = document.getElementById('modalOverlay');
  const zoomBtn = document.getElementById('zoomBtn');
  
  if (!zoomed) {
    overlay.classList.add('zoomed');
    zoomBtn.title = "Zoom out";
    zoomBtn.innerHTML = zoomOutIcon;
    zoomed = true;
  } else {
    overlay.classList.remove('zoomed');
    zoomBtn.title = "Zoom in";
    zoomBtn.innerHTML = zoomInIcon;
    zoomed = false;
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
  document.getElementById('zoomBtn').addEventListener('click', toggleZoom);
});