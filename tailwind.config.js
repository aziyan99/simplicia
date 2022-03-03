module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      'body': ['Nunito']
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}