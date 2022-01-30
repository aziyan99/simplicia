module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'body': ['Nunito']
    },
    extend: {},
  },
  plugins: [
    // require('daisyui'),
    require('@tailwindcss/forms'),
  ],
  // daisyui: {
  //   styled: true,
  //   themes: false,
  //   rtl: false,
  // },
}