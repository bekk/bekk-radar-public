//must be usable by node, don't use es2015 syntax not implemented by node
'use strict';

module.exports = function(str) {
  str = str
    .replace(/^\s+|\s+$/g, '') //trim
    .replace(/\s+/g, '-') //convert whitespace
    .toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'æøåãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to   = 'aoaaaaaaeeeeeiiiiooooouuuunc------';
  for (let i = 0, l = from.length; i<l; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, '') //remove illegal chars
    .replace(/-+/g, '-'); // collapse dashes

  return str;
};
