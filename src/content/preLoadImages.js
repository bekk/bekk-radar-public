import isDataURL from '../lib/isDataURL';
import { Promise } from 'es6-promise-polyfill';

let loading = false;

const loadIt = function(image){
  if(!image) return;

  const p = new Promise(function(resolve){

    setTimeout(function tryToLoadIt(){
      if(loading){
        setTimeout(tryToLoadIt, 100);
      } else {
        loading = true;
        let img = new Image();
        img.onload = function(){
          resolve();
        };
        img.src = image;
      }
    },100);

  });

  p.then(function(){
    loading = false;
  });

};

module.exports = function(){
  const imageFiles = require.context('./', true, /\.(jpg|jpeg|png|svg)$/);
  const imagePaths = imageFiles.keys();
  for(let i in imagePaths){
    const image = imageFiles(imagePaths[i]);
    if(!isDataURL(image)){
      loadIt(image);
    }
  }
};
