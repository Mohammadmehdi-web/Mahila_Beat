export const validateComplainantDetails = (
  complainantName,
  mobileNumber,
  setErrors,
) => {
  let valid = true;
  let errors = {};

  // Validate complainant name (only letters and spaces)
  if (!complainantName.trim()) {
    errors.complainantName = 'कृपया अपना नाम दर्ज करें';
    valid = false;
  } else if (!/^[A-Za-z\s]+$/.test(complainantName)) {
    errors.complainantName = 'नाम में केवल अक्षर और स्पेस होने चाहिए';
    valid = false;
  }

  // Validate mobile number (only digits, 10 digits)
  if (!mobileNumber.trim()) {
    errors.mobileNumber = 'कृपया मोबाइल नंबर दर्ज करें';
    valid = false;
  } else if (!/^\d{10}$/.test(mobileNumber)) {
    errors.mobileNumber = 'मोबाइल नंबर 10 अंकों का होना चाहिए';
    valid = false;
  }

  setErrors(errors); // Update errors state
  return valid; // Return whether the form is valid
};

export const validateWomanDetails = (womenData, errors, setErrors) => {
  let valid = true;
  let newErrors = {...errors}; // Copy the previous error state

  // Validate name and phone number for all women
  womenData.forEach((woman, index) => {
    const nameField = `name${index + 1}`;
    const mobileField = `mobile${index + 1}`;

    // Validate name (only letters)
    if (!woman.name.trim()) {
      newErrors[nameField] = 'नाम आवश्यक है';
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(woman.name)) {
      newErrors[nameField] = 'नाम में केवल अक्षर होने चाहिए';
      valid = false;
    } else {
      newErrors[nameField] = ''; // Clear previous error if valid
    }

    // Validate mobile number (10 digits)
    if (!woman.mobileNumber.trim()) {
      newErrors[mobileField] = 'मोबाइल नंबर आवश्यक है';
      valid = false;
    } else if (!/^\d{10}$/.test(woman.mobileNumber)) {
      newErrors[mobileField] = 'मोबाइल नंबर 10 अंकों का होना चाहिए';
      valid = false;
    } else {
      newErrors[mobileField] = ''; // Clear previous error if valid
    }
  });

  setErrors(newErrors); // Update errors state
  return valid; // Return whether the form is valid
};
