import localFont from "next/font/local";

const productSans = localFont({
  src: [
    {
      path: "./product-sans/Product-Sans-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./product-sans/Product-Sans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./product-sans/Product-Sans-Italic.ttf",
      weight: "100 900",
      style: "italic",
    },
    {
      path: "./product-sans/Product-Sans-Regular.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--product-sans",
});

export const FONTS = {
  productSans,
};
