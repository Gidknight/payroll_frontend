// //postcss.config.js

// import tailwindcss from 'tailwindcss'
// import autoprefixer from 'autoprefixer'
// export default {
//   plugins: [tailwindcss('./tailwind.config.js'), autoprefixer]
// }
// // "type": "module",

/* eslint global-require: off, import/no-extraneous-dependencies: off */

module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')]
}
