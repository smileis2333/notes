// ==UserScript==
// @name        New script - nhentai.net
// @namespace   Violentmonkey Scripts
// @match       https://nhentai.net/*
// @grant       none
// @version     1.0
// @author      -
// @description 2020/6/10 下午4:58:10
// ==/UserScript==
(function(){
  'use strict';
  

  if (/https:\/\/nhentai.net\/g\/\d+\/\d+/.test (document.URL) ) {
      let nav = document.querySelector("body > nav");
  let parent = nav.parentNode;
  parent.removeChild(nav);
  
  let num = document.querySelector("#content > section.reader-bar > div.reader-pagination > button > span.num-pages").innerHTML;
  let pics = [];
    
    let firstImgDom = document.querySelector('#image-container > a > img');
    let baseURL = /https:\/\/i\.nhentai\.net\/galleries\/\d+\//.exec (firstImgDom.getAttribute('src'))[0];
    
    for(let i=1;i<=num;++i){
      pics.push(baseURL+i+'.jpg');
    }
    

    parent.innerHTML = '';
    var position = 0;
    var addPic = setInterval(()=>{
      parent.innerHTML = parent.innerHTML + "<div style='width:100%'><img style='width:100%' src='"+pics[position]+"'></div>";
      position++;
      
      if(position==pics.length){
        clearInterval(addPic);
      }
    },1000);
    
  }else{
      console.log('fail');
  }
})();