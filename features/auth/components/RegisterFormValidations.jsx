export const registerValidations = {
  name: {
    required: "İsim alanı zorunludur",
    minLength: {
      value: 2,
      message: "İsim en az 2 karakter olmalıdır",
    },
    maxLength: {
      value: 50,
      message: "İsim en fazla 50 karakter olabilir",
    },
    pattern: {
      value: /^[a-zA-ZğüşöçıİĞÜŞÖÇ\s]+$/i,
      message: "İsim sadece harf içerebilir",
    },
  },

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
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
      message:
        "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermelidir",
    },
  },
};
