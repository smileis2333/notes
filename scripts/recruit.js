// ==UserScript==
// @name        New script - zhipin.com
// @namespace   kkk
// @match       https://www.zhipin.com/i100020-c101280100/y_3/
// @grant       none
// @version     1.0
// @author      -
// @description 2020/7/6 下午1:51:37
// @match        *://search.51job.com/*
// @match        *://sou.zhaopin.com/*
// @match        *://www.zhipin.com/*
// @match        *://www.lagou.com/*
// @match        *://www.liepin.com/*
// @match        *://*.58.com/*
// @match        *://zhaopin.baidu.com/quanzhi*
// @require      https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js
// @grant GM_setValue
// @grant GM_getValue
// @run-at document-end
// ==/UserScript==
$(function () {
    'use strict';
    initSetting();
    // 页面加载检查，有些网站使用的是ajax申请数据
    var checkId = setInterval(() => {
        if ($(website.companySelector).length > 0) {
            console.log('load conplete,start filter')
            clearInterval(checkId)
            initUI();
            filterBlackList();
            filterHaveBeen();
            filterKeyword();
           
        }
    }, 500);

})

function initSetting() {
    webMap = {
        'www.lagou.com': { removeDepth:4,blackBtn: "<button class='bbtn' style='float: left;position: relative;top: 35px;left: -80px;font-size:20px'>拉黑</button>", companySelector: 'li.con_list_item ', companyNameSelector: '.company_name a',workNameSelector:''},
        'www.zhipin.com': { removeDepth:6,blackBtn: "<button class='bbtn' style='position:absolute;top: 15px;left: 400px'>拉黑</button>", companySelector: '#main > div > div.job-list > ul > li', companyNameSelector: ' div > div.info-primary > div.info-company > div > h3 > a',filterKeyWord:function(){
          $('.job-name a').each(function(){
            let workName = $(this).html().toLowerCase();
            if(workName.indexOf('java')==-1){
              $(this).parent().parent().parent().parent().parent().parent().parent().remove();
            }
          })
        },haveBeen:function(){
          $("div > div.info-primary > div.primary-wrapper > div > div.job-limit.clearfix > button > span").each(function(){
            if($(this).html()=='继续沟通'){
              $(this).parent().parent().parent().parent().parent().parent().parent().remove()
            }
          })
          
        }},
        'search.51job.com': {init:function(){$('.el.title').remove()}, removeDepth:1,blackBtn: "<button class='bbtn' style='float: left;position: relative;left: -80px;font-size:20px'>拉黑</button>", companySelector: "#resultList > div.el:not('.title')", companyNameSelector: ".t2",filterKeyWord:function(){
            $('#resultList > div > p > span > a').each(function(){
            let workName = $(this).html().toLowerCase();
            if(workName.indexOf('java')==-1){
              $(this).parent().parent().parent().remove();
            }
          })  
        }},
        'sou.zhaopin.com': {removeDepth:3,blackBtn: "<button class='bbtn' style='float: left;position: relative;left: -80px;font-size:20px'>拉黑</button>", companySelector: ".contentpile__content__wrapper", companyNameSelector: ".commpanyName > a",filterKeyWord:function(){
          $('.jobName >span').each(function(){
            let workName = $(this).attr('title').toLowerCase();
            if(workName.indexOf('java')==-1){
              $(this).parent().parent().parent().parent().parent().remove();
            }
          })  
        }},
    }
    website = webMap[window.location.host]
    if(website.init!=undefined){
      website.init()
    }
    
}

function initUI() {
    $(website.companyNameSelector).before(website.blackBtn)
    $('.bbtn').click(function () {
        let blacklist = GM_getValue('blacklist') ? JSON.parse(GM_getValue('blacklist')) : []
        let companyName = $(this).next().html()
        blacklist.push(companyName)
        GM_setValue('blacklist', JSON.stringify(blacklist))
        filterBlackList()
        event.stopPropagation();
    })

}

function filterBlackList() {
    let blacklist = GM_getValue('blacklist') ? JSON.parse(GM_getValue('blacklist')) : []

    $(website.companySelector).find(website.companyNameSelector).each(function () {
        if (blacklist.indexOf($(this).html()) != -1) {
            let removeDepth = website.removeDepth;
            let removeTarget = $(this);
            while(removeDepth-->0){
              removeTarget = removeTarget.parent() 
            }
            removeTarget.remove();
        }
    })
}

function filterHaveBeen(){
  if(website.haveBeen!=undefined){
    website.haveBeen();
  }
}

function filterKeyword(){
  if(website.filterKeyWord!=undefined){
    website.filterKeyWord();
  }
}

