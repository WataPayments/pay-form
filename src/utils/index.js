export function getCurrency(currency) {
  if (currency === "RUB") {
    return "₽";
  }

  return currency;
}

export function lunaCheck(cardNumber) {
  if (!cardNumber && cardNumber.length < 16) {
    return false;
  }

  let checksum = 0;
  const cardnumbers = cardNumber.split("").map(Number);

  for (const [index, num] of cardnumbers.entries()) {
    if (index % 2 === 0) {
      let buffer = num * 2;
      buffer > 9 ? (checksum += buffer - 9) : (checksum += buffer);
    } else {
      checksum += num;
    }
  }
  return checksum % 10 === 0;
}
