const colorDataBase = {
  colorName: {
    red: {
      minHue: 0,
      maxHue: 10,
      minHue2: 330,
      maxHue2: 360,
    },
    orange: {
      minHue: 10,
      maxHue: 45,
    },
    yellow: {
      minHue: 45,
      maxHue: 70,
    },
    green: {
      minHue: 70,
      maxHue: 170,
    },
    blue: {
      minHue: 170,
      maxHue: 255,
    },
    purple: {
      minHue: 255,
      maxHue: 330,
    },
  },
  colorComp: {
    red: "primary",
    orange: "red + yellow",
    yellow: "primary",
    green: "blue + yellow",
    blue: "primary",
    purple: "blue + red",
  },
};
export default colorDataBase;
