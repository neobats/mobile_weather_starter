export const round = (decimal) => (value) =>
  +(Math.round(value + "e" + decimal) + "e-" + decimal);

export const roundHundredth = round(2);
