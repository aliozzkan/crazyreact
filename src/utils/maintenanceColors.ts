export const colors = [
  {
    color: "#fff700",
    desc: "* Bakım zamanı bekleniyor",
  },
  {
    color: "#15ff00",
    desc: "* Bakım gerçekleşti",
  },
  {
    color: "#00c3ff",
    desc: "* Bakım yapılabilir",
  },
  {
    color: "#000000",
    desc: "* Bakım planlanan zamanda gerçekleşmedi",
  },
  {
    color: "#BDBDBD",
    desc: "* Bakım planlanan zaman dışında gerçekleşti",
  },
];

export function getColorDescription(color: string) {
  
  const colorItem = colors.find((_color) => _color.color === color);
  if (!colorItem) return null;

  return colorItem["desc"];
}
