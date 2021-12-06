/**
 * 函数防抖
 * @param {Function} func
 * @param {number} delay
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func: Function, delay: number, immediate = false) {
  let timer: any | undefined;

  return (...args: any) => {
    if (immediate && !timer) {
      func(...args);
      immediate = false;
      return;
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
// export function debounce(this: any, func: any, delay: any, immediate = false) {
//   let timer: any,
//     context: any = this;
//   return (...args: any) => {
//     if (immediate) {
//       func.apply(context, args);
//       immediate = false;
//       return;
//     }
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       func.apply(context, args);
//     }, delay);
//   };
// }
