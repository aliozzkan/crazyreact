import numeral from "numeral";
if(numeral.locales["tr"] === undefined) {
  numeral.register("locale", "tr", {
    delimiters: {
      thousands: ".",
      decimal: ",",
    },
    abbreviations: {
      thousand: "k",
      million: "m",
      billion: "b",
      trillion: "t",
    },
    ordinal: function (number) {
      return number === 1 ? "er" : "ème";
    },
    currency: {
      symbol: "TL",
    },
  });
}
numeral.locale("tr");