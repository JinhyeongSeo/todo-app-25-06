export function dateToStr(date) {
  const pad = (n) => {
    return n < 10 ? `0${n}` : n;
  };

  return (
    date.getFullYear() +
    "-" + pad(date.getMonth() + 1) +
    "-" + pad(date.getDate()) +
    " " + pad(date.getHours()) + 
    ":" + pad(date.getMinutes()) +
    ":" + pad(date.getSeconds()
    )
  )
}