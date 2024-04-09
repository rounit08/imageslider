const images = [
  "https://cdn.pixabay.com/photo/2024/02/14/13/13/hamburg-8573427_640.jpg",
  "https://cdn.pixabay.com/photo/2024/02/21/08/06/coast-8587004_640.jpg",
  "https://cdn.pixabay.com/photo/2023/09/10/11/11/storm-8244663_640.jpg",
  "https://cdn.pixabay.com/photo/2023/11/23/20/40/ocean-8408693_640.jpg",
];

let currentSlide = 0;
const carouselEl = document.getElementById("carousel");
let touchStartX = 0;

function showSlide(index) {
  const offset = -index * 100;
  carouselEl.style.transform = `translateX(${offset}%)`;
}

function setTransition() {
  //   setTimeout(() => {
  carouselEl.style.transition = "transform 0.3s ease";
  //   }, 10);
}

function removeTransition() {
  carouselEl.style.transition = "";
}

function nextSlide() {
  currentSlide++;
  showSlide(currentSlide);

  if (currentSlide === images.length + 1) {
    setTimeout(() => {
      currentSlide = 1;
      showSlide(currentSlide);
      removeTransition();
    }, 100);

    setTimeout(() => {
      setTransition();
    }, 110);
  }
}

function prevSlide() {
  currentSlide--;
  showSlide(currentSlide);

  if (currentSlide === 0) {
    setTimeout(() => {
      currentSlide = images.length;
      showSlide(currentSlide);
      removeTransition();
    }, 100);

    setTimeout(() => {
      setTransition();
    }, 110);
  }
}

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  const touchEndX = event.changedTouches[0].clientX;
  const deltaX = touchEndX - touchStartX;
  if (deltaX > 50) {
    prevSlide();
  } else if (deltaX < -50) {
    nextSlide();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const imgLast = document.createElement("img");
  imgLast.src = images[images.length - 1];
  carouselEl.appendChild(imgLast);

  images.forEach((image) => {
    const img = document.createElement("img");
    img.src = image;
    carouselEl.appendChild(img);
  });

  const imgFirst = document.createElement("img");
  imgFirst.src = images[0];
  carouselEl.appendChild(imgFirst);

  removeTransition();
  showSlide(1);
  currentSlide = 1;
  setTransition();

  carouselEl.addEventListener("touchstart", handleTouchStart);
  carouselEl.addEventListener("touchend", handleTouchEnd);
});
