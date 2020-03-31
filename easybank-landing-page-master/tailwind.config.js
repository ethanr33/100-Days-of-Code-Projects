module.exports = {
  theme: {
    extend: {
      fontFamily: {
        "display": ["'Public Sans'", "sans-serif"]
      },
      colors: {
        "dark-blue": "hsl(233, 26%, 24%)",
        "lime-green": "hsl(136, 65%, 51%)",
        "bright-cyan": "hsl(192, 70%, 51%)",
        "grayish-blue": "hsl(233, 8%, 62%)",
        "light-grayish-blue": "hsl(220, 16%, 96%)",
        "very-light-gray": "hsl(0, 0%, 98%)",
        "ff": "rgb(255, 0, 0)",
      },
      spacing: {
        "72": "18rem",
        "80": "19rem",
        "88": "20rem",
        "96": "21rem",
        "104": "22rem",
        "112": "23rem",
        "120": "24rem",
        "128": "25rem",
        "160": "29rem",
        "extra": "130%"
      },
      zIndex: {
        "-10": "-10"
      },
      gridTemplateRows: {
        "footer-mobile": "repeat(10rem)",
        "footer-sm": "repeat(10rem)",
      },
      gridTemplateColumns: {
        "footer-desktop": "2fr 1fr 1fr 35em"
      },
      screens: {
        "xxl": {min: "1566px"}
      }
    },
  },
  variants: {},
  plugins: [],
}
