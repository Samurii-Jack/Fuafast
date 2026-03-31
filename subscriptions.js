document.addEventListener('DOMContentLoaded', () => {
  // FAQ Accordion functionality
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const faqItem = button.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // Track subscription clicks
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
      const planName = this.href.includes('Solo') ? 'Solo Dweller' :
                       this.href.includes('Couple') ? 'Couples Plan' :
                       this.href.includes('Family') ? 'Family Bundle' : 'General';
      
      console.log('Subscription click:', planName);
      
      // Add your analytics tracking here
      // Example: gtag('event', 'subscription_click', { plan: planName });
    });
  });

  // Track FAQ interactions
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', function() {
      const question = this.querySelector('span').textContent;
      console.log('FAQ opened:', question);
      
      // Add your analytics tracking here
      // Example: gtag('event', 'faq_interaction', { question: question });
    });
  });
});
