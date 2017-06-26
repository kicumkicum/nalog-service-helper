function loadPage() {
    const page = UrlFetchApp.fetch(SERVICE_BASE_URL);
    const regexp = new RegExp('name="captchaToken".*\>', 'i');
    const match = regexp.exec(page.getContentText())[0];
    const captchaToken = match.substring('name="captchaToken" value="'.length).replace('"/>', '');
    
    return showCaptcha(getCaptchaImgSrc(captchaToken));
  }
  
  

var CAPTCHA_BASE_URL = 'https://service.nalog.ru/static/captcha.html';
var SERVICE_BASE_URL = 'https://service.nalog.ru/inn.do';
//https://service.nalog.ru/static/captcha.html?r=1498150605927&a=


/**
* @params {Nalog.Deps} deps
*/
var Nalog = function(deps) {
  this._request = deps.request;
  
  /**
  * @params {Nalog.InputData} data
  * @params {{
  *   token: string,
  *   value: string
  * }} captcha
  */
  this.getINN = function(data, captcha) {
    const url = 'https://service.nalog.ru/inn-proc.do';
    const newData = {
      'fam': data.fam,
      'nam': data.nam,
      'otch': data.otch,
      'bdate': data.bdate,
      'docno': data.docno,
      'docdt': data.docdt,
      'captcha': captcha.value,
      'captchaToken': captcha.token,
      'c': 'innMy',
      'bplace': '',
      'doctype': '21',
      
    };

    const responce = this._request.fetch('post', url, newData);
  };
  
  this.getCaptchaImageSrc = function() {
    var captchaToken = this._loadCaptchaToken();
    return this._loadCaptchaImageSrc(captchaToken.loadTime, captchaToken.token);
  };
  
  /**
  * @param {number} loadTime
  * @param {string} token
  */
  this._loadCaptchaImageSrc = function(loadTime, token) {
    return CAPTCHA_BASE_URL + '?r=' + loadTime + '&a=' + token;
  };

  /**
  * @return {{loadTime: number, token: string}}
  */
  this._loadCaptchaToken = function() {
    const now = Math.floor(Date.now() / 1000);
    const response = UrlFetchApp.fetch(CAPTCHA_BASE_URL + '?' + now);
    return {loadTime: now, token: response};
  };
};

/**
* @typedef {{
*   request: Request
* }}
*/
Nalog.Deps;

/**
* @typedef {{
*   fam: string,
*   nam: string,
*   otch: string,
*   bdate: string,
*   docno: string,
*   docdt: string
* }}
*/
Nalog.InputData;

/**
* @typedef {{
*   fam: string,
*   nam: string,
*   otch: string,
*   bdate: string,
*   docno: string,
*   docdt: string,
*   captcha: string,
*   captchaToken: string,
*   c: string,
*   bplace: string,
*   doctype: string
* }}
*/
Nalog.OutputtData;

/**
* @params {Nalog.Deps} deps
*/
function createNalog(deps) {
  return new Nalog(deps);
};

function testNalog() {
  var showCaptcha = function(src) {
//    return src;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const html = HtmlService.createHtmlOutputFromFile('captcha.html'); 
    html.setWidth(300);
    html.setHeight(200);
    
//    html.append('<img src="' + src + '">');
//    html.append('<!DOCTYPE html><html><head><base target="_top"></head><body><img src="' + src + '"></body></html>');
    //html.append('<img src=' + src + '>');
    
    ss.show(html);
  };
  
  var n = createNalog();
  
  var a = n._loadCaptchaToken();
  var src = n._loadCaptchaImageSrc(a.loadTime, a.token);
  Logger.log(src);
  
  showCaptcha(src);
};
