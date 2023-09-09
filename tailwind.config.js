module.exports = {
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["[data-theme=light]"],
          neutral: "#E7E247",
        },
      },
      {
        dark: {
          ...require("daisyui/src/theming/themes")["[data-theme=dark]"],
          neutral: "#EBC3DB",
        },
      },
      {
        synthwave: {
          ...require("daisyui/src/theming/themes")["[data-theme=synthwave]"],
          neutral: "#610F7F",
        },
      },
      {
        pastel: {
          ...require("daisyui/src/theming/themes")["[data-theme=pastel]"],
          neutral: "#E184A2" // "#92374D",
        },
      },
      {
        retro: {
          ...require("daisyui/src/theming/themes")["[data-theme=retro]"],
          neutral: "#137547",
        },
      },
      {
        cyberpunk: {
          ...require("daisyui/src/theming/themes")["[data-theme=cyberpunk]"],
          neutral: "#16697A",
        },
      },
      {
        valentine: {
          ...require("daisyui/src/theming/themes")["[data-theme=valentine]"],
          neutral: "#664147",
        },
      },
      {
        cupcake: {
          ...require("daisyui/src/theming/themes")["[data-theme=cupcake]"],
          neutral: "#A03E99",
        },
      },
    ],
  },
};
