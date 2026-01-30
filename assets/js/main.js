// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle && navToggle.addEventListener('click', ()=> navLinks.classList.toggle('show'));

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = a.getAttribute('href');
    if(target.startsWith('#')){
      e.preventDefault();
      const el = document.querySelector(target);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
      navLinks.classList.remove('show');
    }
  })
});

// Set year in footer
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();

// Theme toggle (light / dark)
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';
if(currentTheme === 'dark') document.documentElement.setAttribute('data-theme','dark');

themeToggle && themeToggle.addEventListener('click', (e)=>{
  e.preventDefault();
  const active = document.documentElement.getAttribute('data-theme') === 'dark';
  if(active){
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme','light');
  } else {
    document.documentElement.setAttribute('data-theme','dark');
    localStorage.setItem('theme','dark');
  }
});

// Simple contact form check
const form = document.getElementById('contact-form');
form && form.addEventListener('submit', (e)=>{
  // allow mailto but give a friendly notice
  alert('The form will open your mail client (mailto). To enable server-side handling add a backend or use a form service.');
});