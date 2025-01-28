
/* 
  second => h:mm:ss
*/
export const formattedSecond = (second: number) => {
  second = Math.round(second);
  const h = Math.floor(second / (60 * 60));
  
  let m: string|number = Math.floor(second % (60 * 60) / 60);
  let s: string|number = second % (60 * 60) % 60;

  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;

  return h ? `${h}:${m}:${s}` : `${m}:${s}`
}