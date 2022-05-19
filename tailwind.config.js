module.exports = {
  content: ["./views/**/*.{html,js,ejs}"],
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