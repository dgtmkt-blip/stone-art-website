/* ===== Stone Art — site scripts ===== */

/* ---- Supabase config ---- */
const SUPABASE_URL = 'https://uqipxisotjwqglyiommz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_iFt5Lq7zIY-AuyokmGV0LQ_jbTMUnpC';

/* ---- Header scroll state ---- */
const header = document.querySelector('.site-header');
function onScroll() {
  if (window.scrollY > 40) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll);
onScroll();

/* ---- Mobile menu ---- */
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle) {
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
}

/* ---- Scroll reveal ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ---- Contact form -> Supabase ---- */
const form = document.getElementById('inquiry-form');
if (form) {
  const msg = document.getElementById('form-msg');
  const btn = form.querySelector('.btn-submit');
  const btnText = btn.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.className = 'form-msg';
    btn.disabled = true;
    btn.textContent = 'Sending…';

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      company: form.company.value.trim(),
      message: form.message.value.trim(),
      source: 'website'
    };

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        msg.textContent = 'Thank you — your inquiry has been received. Our team will contact you shortly.';
        msg.classList.add('success');
        form.reset();
      } else {
        throw new Error('Request failed: ' + res.status);
      }
    } catch (err) {
      msg.textContent = 'Sorry, something went wrong. Please call us at +91 33 4066 0166 or try again.';
      msg.classList.add('error');
    } finally {
      btn.disabled = false;
      btn.textContent = btnText;
      msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}

/* ---- Footer year ---- */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
