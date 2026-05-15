// =========================
// NAVBAR MOBILE
// =========================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    navOverlay.classList.toggle('show');
  });
}

if (navOverlay) {
  navOverlay.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('show');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    navOverlay.classList.remove('show');
  });
});

// =========================
// NAVBAR SCROLL
// =========================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// =========================
// MENU TABS
// =========================

const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.mc');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {

    tabs.forEach(btn => btn.classList.remove('active'));
    tab.classList.add('active');

    const category = tab.dataset.tab;

    cards.forEach(card => {

      if (
        category === 'all' ||
        card.dataset.category === category
      ) {
        card.style.display = 'block';

        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);

      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
          card.style.display = 'none';
        }, 200);
      }

    });

  });
});





// =========================
// DISH MODAL
// =========================
// =========================
// DISH MODAL
// =========================

const modal =
  document.getElementById('dishModal');

const modalOverlay =
  document.getElementById('dishModalOverlay');

const modalClose =
  document.getElementById('dishModalClose');

const modalImg =
  document.getElementById('dishModalImg');

const modalTitle =
  document.getElementById('dishModalTitle');

const modalDesc =
  document.getElementById('dishModalDesc');

const modalPrice =
  document.getElementById('dishModalPrice');

const modalIngredients =
  document.getElementById('dishModalIngredients');

const detailsButtons =
  document.querySelectorAll('.mc-details-btn');

detailsButtons.forEach(button => {

  button.addEventListener('click', () => {

    // =========================
    // قراءة بيانات الكرت نفسه
    // =========================

    const card =
      button.closest('.mc');

    const title =
      card.dataset.title;

    const img =
      card.dataset.img;

    const desc =
      card.dataset.desc;

    const price =
      card.dataset.price;

    const ingredients =
      JSON.parse(
        card.dataset.ingredients
      );

    // =========================
    // تعبئة المودال
    // =========================

    modalImg.src = img;

    modalImg.alt = title;

    modalTitle.textContent =
      title;

    modalDesc.textContent =
      desc;

    modalPrice.textContent =
      price + '₪';

    modalIngredients.innerHTML =
      '';

    ingredients.forEach(item => {

      const li =
        document.createElement('li');

      li.textContent = item;

      modalIngredients.appendChild(li);

    });

    // =========================
    // فتح المودال
    // =========================

    modal.classList.add('open');

    modal.setAttribute(
      'aria-hidden',
      'false'
    );

  });

});

// =========================
// CLOSE MODAL
// =========================

function closeDishModal() {

  modal.classList.remove('open');

  modal.setAttribute(
    'aria-hidden',
    'true'
  );

}

modalClose.addEventListener(
  'click',
  closeDishModal
);

modalOverlay.addEventListener(
  'click',
  closeDishModal
);

document.addEventListener(
  'keydown',
  e => {

    if (e.key === 'Escape') {

      closeDishModal();

    }

  }
);

// =========================
// GALLERY LIGHTBOX
// =========================

const galleryItems =
  document.querySelectorAll('.gi');

const lightbox =
  document.createElement('div');

lightbox.className =
  'gallery-lightbox';

lightbox.innerHTML = `
  <span class="lightbox-close">
    &times;
  </span>

  <img src="" alt="">
`;

document.body.appendChild(lightbox);

const lightboxImg =
  lightbox.querySelector('img');

const lightboxClose =
  lightbox.querySelector('.lightbox-close');

galleryItems.forEach(item => {

  item.addEventListener('click', () => {

    const img =
      item.querySelector('img');

    if (!img) return;

    lightboxImg.src = img.src;

    lightbox.classList.add('open');

  });

});

lightboxClose.addEventListener(
  'click',
  closeLightbox
);

lightbox.addEventListener(
  'click',
  e => {

    if (e.target === lightbox) {
      closeLightbox();
    }

  }
);

function closeLightbox() {
  lightbox.classList.remove('open');
}

// =========================
// STATS COUNTER
// =========================

const statNumbers =
  document.querySelectorAll('.sn');

const statsObserver =
  new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        const el = entry.target;

        const target =
          +el.dataset.to;

        let current = 0;

        const increment =
          target / 40;

        const counter =
          setInterval(() => {

            current += increment;

            if (current >= target) {

              el.textContent = target;

              clearInterval(counter);

            } else {

              el.textContent =
                Math.floor(current);

            }

          }, 30);

        statsObserver.unobserve(el);

      }

    });

  }, {
    threshold: 0.5
  });

statNumbers.forEach(num => {
  statsObserver.observe(num);
});

// =========================
// CONTACT FORM
// =========================
async function submitForm(e) {

  e.preventDefault();

  const form = e.target;

  const name =
    form.querySelector('input[type="text"]').value;

  const phone =
    form.querySelector('input[type="tel"]').value;

  const message =
    form.querySelector('textarea').value;

  // =====================================
  // ضع توكن البوت هنا
  // =====================================

  const BOT_TOKEN =
    '8871081132:AAFm3eis03tQ17VuxKxercJdCeSAFWqs5pc';

  // =====================================
  // ضع الـ Chat ID هنا
  // =====================================

  const CHAT_ID =
    '1390499803';

  // =====================================
  // الرسالة التي ستصل إلى تلجرام
  // =====================================

  const text = `
📩 رسالة جديدة من موقع Angus For Meat

👤 الاسم:
${name}

📞 الهاتف:
${phone}


📝 الرسالة:
${message}
`;

  try {

    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json'
        },

        body: JSON.stringify({

          chat_id: CHAT_ID,

          text: text

        })

      }
    );

    // =====================================
    // نجاح الإرسال
    // =====================================

    if (response.ok) {

      showToast('تم إرسال الرسالة بنجاح ✅');

      form.reset();

    } else {

      showToast('فشل إرسال الرسالة ❌');

    }

  } catch (error) {

    console.error(error);

    showToast('حدث خطأ بالاتصال ❌');

  }

}



// =========================
// TOAST
// =========================

const toast =
  document.getElementById('toast');

function showToast(message) {

  toast.textContent = message;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// =========================
// HERO PARTICLES
// =========================

const particlesContainer =
  document.getElementById('particles');

if (particlesContainer) {

  for (let i = 0; i < 20; i++) {

    const particle =
      document.createElement('span');

    particle.classList.add('particle');

    particle.style.left =
      Math.random() * 100 + '%';

    particle.style.width =
      Math.random() * 4 + 2 + 'px';

    particle.style.height =
      particle.style.width;

    particle.style.animationDuration =
      Math.random() * 10 + 8 + 's';

    particle.style.animationDelay =
      Math.random() * 5 + 's';

    particlesContainer.appendChild(particle);
  }

}