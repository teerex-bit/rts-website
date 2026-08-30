// Replace this single value when the final Calendly destination is approved.
const BOOKING_URL = 'https://calendly.com/';

document.querySelectorAll('[data-booking-link]').forEach((link) => {
  link.href = BOOKING_URL;
});
