// Small interactions for the portfolio
document.addEventListener('DOMContentLoaded',()=>{
  // Year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form -> open mail client
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const name = data.get('name') || 'Friend';
      const message = data.get('message') || '';
      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const body = encodeURIComponent(message + '\n\nSent from portfolio');
      window.location.href = `mailto:manasahm2005@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
