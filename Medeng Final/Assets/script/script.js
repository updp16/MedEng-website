
(function() {
 

  window.addEventListener('scroll', function() {
    const serviceItems = document.querySelectorAll('.service-item');
    const triggerHeight = window.innerHeight * 0.8;

    serviceItems.forEach(item => {
      const itemTop = item.getBoundingClientRect().top;

      if (itemTop < triggerHeight) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });
})();


// Get all expand buttons
const expandButtons = document.querySelectorAll('.expand-btn');

expandButtons.forEach(button => {
  button.addEventListener('click', function() {

      const content = this.parentElement.nextElementSibling;

      
      if (content.classList.contains('open')) {
          // Close content
          content.style.height = content.scrollHeight + "px"; 
          setTimeout(() => {
              content.style.height = "0"; 
          }, 10); 
          content.classList.remove('open');
          content.classList.add('collapsed');
      } else {
          content.style.height = "0"; 
          
          // Open content
          content.classList.remove('collapsed');
          setTimeout(() => {
              content.style.height = content.scrollHeight + "px"; 
          }, 10);
          content.classList.add('open');
          
          setTimeout(() => {
              content.style.height = "auto"; 
          }, 500); 
      }


      const icon = this.querySelector('i.icon1');
      icon.classList.toggle('bi-dash');
      icon.classList.toggle('bi-plus');
  });
});




// Wrapping the first script in an IIFE to avoid conflicts
(function() {
  const carousel = document.querySelector('.carousel-container');
  let angle = 0;
  const slideAngle = 90;
  const slides = document.querySelectorAll('.carousel-slide');

  document.querySelector('.next').addEventListener('click', () => {
    rotateCarousel(slideAngle);
  });

  document.querySelector('.prev').addEventListener('click', () => {
    rotateCarousel(-slideAngle);
  });

  function rotateCarousel(deg) {
    angle += deg;
    carousel.style.transform = `rotateY(${angle}deg)`;
    updateSlideVisibility();
  }

  function updateSlideVisibility() {
    slides.forEach((slide, index) => {
      const slideCurrentAngle = (angle + index * slideAngle) % 360;

      if (slideCurrentAngle > 90 && slideCurrentAngle < 270) {
        slide.style.opacity = 0; 
      } else {
        slide.style.opacity = 1;
      }
    });
  }

  // Setting up the globe
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('globe'), alpha: true });

  renderer.setSize(500, 500);
  camera.position.z = 17;

  const geometry = new THREE.SphereGeometry(10, 50, 50);
  const textureLoader = new THREE.TextureLoader();
  const globeTexture = textureLoader.load('https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
  const material = new THREE.MeshBasicMaterial({ map: globeTexture });
  const globe = new THREE.Mesh(geometry, material);
  scene.add(globe);

  let isDragging = false;
  let startX = 0;

  document.getElementById('globe').addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX;
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  document.addEventListener('mousemove', (event) => {
    if (isDragging) {
      const deltaX = event.clientX - startX;
      globe.rotation.y += deltaX * 0.005;
      startX = event.clientX;

      if (deltaX > 9) {
        rotateCarousel(-slideAngle);  
      } else if (deltaX < -5) {
        rotateCarousel(slideAngle);  
      }
    }
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
})();












