// validation function
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Please enter a valide email adress";
  return "";
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  // At least 8 characters
  if (password.length < 8) return "Password must be at least 8 characters long";

  // At least 1 uppercase
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  // At least 1 lowercase
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  // At least 1 number
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }

  // At least 1 special character
  if (!/[@$!%*?&]/.test(password)) {
    return "Password must contain at least one special character (@$!%*?&)";
  }
  return "";
};

export const validateAvatar = (file) => {
  if (!file) return ""; //Avatar is optional
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (!allowedTypes.includes(file.type))
    return "Avatar must be a JPG or PNG file";
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return "Avatar file must be less than 5MB";
  }
  return "";
};
