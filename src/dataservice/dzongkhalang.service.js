export function toDzongkha(number) {
  const arr = {
    1: "༡",
    2: "༢",
    3: "༣",
    4: "༤",
    5: "༥",
    6: "༦",
    7: "༧",
    8: "༨",
    9: "༩",
    0: "༠",
    ".": "་",
    "-": "-",
  };
  let dzongkhaNumber = "";

  for (let i = 0; i < number.length; i++) {
    const letter = arr[number.charAt(i)];
    dzongkhaNumber = dzongkhaNumber + letter;
  }

  return dzongkhaNumber;
}
