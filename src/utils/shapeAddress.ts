export const shapeAddress = (address: string) => {
  const data = address.split(',');
  const city = data[1].trim();
  const country = data[2].trim();
  return { city, country };
};
