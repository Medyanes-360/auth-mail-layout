// Giriş formu için validasyon kuralları
export const loginValidations = {
  email: {
    required: "E-posta alanı zorunludur",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Geçerli bir e-posta adresi giriniz",
    },
  },

  password: {
    required: "Şifre alanı zorunludur",
    minLength: {
      value: 6,
      message: "Şifre en az 6 karakter olmalıdır",
    },
  },
};
