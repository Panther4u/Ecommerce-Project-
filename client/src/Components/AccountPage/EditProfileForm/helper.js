export function checkEmailValidation(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    const isEmailValid = emailRegex.test(emailInput.value);
    updateClassOnCondition(emailInput, isEmailValid);
  }
  
  function updateClassOnCondition(element, condition) {
    if (condition) {
      element.classList.add('valid');
      element.classList.remove('invalid');
    } else {
      element.classList.add('invalid');
      element.classList.remove('valid');
    }
  }
  