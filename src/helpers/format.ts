export function convertingDate(data) {
  const partesData = data.split('-');

  const dataFormatada =
    partesData[2] + '/' + partesData[1] + '/' + partesData[0];

  return dataFormatada;
}
