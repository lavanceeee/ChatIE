export function reg(text) {
//   const reg = /\(.*?\)/g;
//   let update = text.match(reg); //string[] || null

//   if (!update) {
//     update = [text];
//   }

  const removeParenthedes = text.slice(1, -1);
  return removeParenthedes.split(',').map(item => item.trim()).toString(); 
}
