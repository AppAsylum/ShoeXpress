export const isEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export const validateEmail = v =>
  !v.trim() ? 'Enter your email address' : !isEmail(v) ? 'That email doesn’t look right' : null;

export const validatePassword = v =>
  !v ? 'Enter a password' : v.length < 8 ? 'Use at least 8 characters' : null;

export const validateRequired = (v, label) => (!v.trim() ? `Enter your ${label}` : null);

// The app has no auth backend yet; this stands in for a network request so
// buttons show a realistic loading state.
export const fakeRequest = (ms = 900) => new Promise(r => setTimeout(r, ms));
