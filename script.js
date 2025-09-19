//Script to hightlight the menu item.
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav a");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { rootMargin: "-100px 0px -60% 0px", threshold: [0.1, 0.3, 0.6] }
  );

  sections.forEach(section => {
    observer.observe(section);
  });
});


// Scroll-to
document.querySelectorAll('.scroll-to').forEach(btn => {
  btn.addEventListener('click', () => {
    const t = document.querySelector(btn.dataset.target);
    if (t) t.scrollIntoView({ behavior: 'smooth' });
  });
});

// PayPal Buttons
function initPayPal() {
  if (!window.paypal) return;
  // Per-service "Book Now"
  document.querySelectorAll('.paypal-btn').forEach((el) => {
    const amount = (el.dataset.amount || '0').replace(/[^\d.]/g, '');
    const desc = el.dataset.desc || 'Booking';
    paypal.Buttons({
      style: { layout: 'vertical', shape: 'pill', label: 'buynow' },
      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{ amount: { value: amount, currency_code: 'GBP' }, description: desc }]
      }),
      onApprove: (data, actions) => actions.order.capture().then((details) => {
        alert('Thanks, ' + details.payer.name.given_name + '! Your booking is noted.');
      })
    }).render(el);
  });
  // Donate
  paypal.Buttons({
    style: { layout: 'vertical', shape: 'pill', label: 'donate' },
    createOrder: (data, actions) => actions.order.create({
      purchase_units: [{ amount: { value: '10.00', currency_code: 'GBP' }, description: 'Donation' }]
    }),
    onApprove: (data, actions) => actions.order.capture().then((details) => {
      alert('Thank you for your donation, ' + details.payer.name.given_name + '!');
    })
  }).render('#paypal-donate');
}
if (document.readyState !== 'loading') initPayPal();
else document.addEventListener('DOMContentLoaded', initPayPal);

document.getElementById('year').textContent = new Date().getFullYear();
