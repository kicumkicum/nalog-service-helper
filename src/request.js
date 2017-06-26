var Transport = function() {
 this.fetch = function(method, url, data, opt_headers) {
    const options = {
      'method': method,
      'payload': data,
      'muteHttpExceptions': true
    };
    return UrlFetchApp.fetch(url, options);
  };
};

var Request = function(captcha) {
  this._transport = new Transport();

  this.fetch = function(method, url, data, opt_headers) {
    return this._transport.fetch(method, url, data, opt_headers);
  };
  
  this.getINN = function(data, captcha) {
  
  };
  
//  if (method === 'POST') {
//    
//  }
  
   const params = [{
          "name": "c",
          "value": "innMy"
        }, {
          "name": "fam",
          "value": "Акинина"
        }, {
          "name": "nam",
          "value": "Оксан"
        }, {
          "name": "otch",
          "value": "Вячеславовна"
        }, {
          "name": "bdate",
          "value": "13.02.1964"
        }, {
          "name": "bplace",
          "value": ""
        }, {
          "name": "doctype",
          "value": "21"
        }, {
          "name": "docno",
          "value": "69 08 264832"
        }, {
          "name": "docdt",
          "value": "30.03.2009"
        }, {
          "name": "captcha",
          "value": captcha.value
        }, {
          "name": "captchaToken",
          "value": captcha.token
      }];
  const newParams = {};
  params.forEach(function(param) {
    newParams[param.name] = param.value;
  });

  var options = {
    'method' : 'post',
    'muteHttpExceptions': true,
    'payload' : newParams
  };
  url = 'https://service.nalog.ru/inn-proc.do';
  return UrlFetchApp.fetch(url, options);
  
  
};

function getCaptchaToken() {
  var n = createNalog();
  const src = n.getCaptchaImageSrc();
  const ad = '<script> setTimeout(function() {document.getElementById("image").setAttribute("src","' + src + '") } , 3000)</script>';
  Logger.log(src);
  Logger.log(ad);
  
  var ui = createUI();
  ui.showPopup({
        width: 500,
        height: 500,
        src: 'captcha.html',
        sourceType: UI.SourceType.LOCAL,
        title: 'Test popup',
    appendData: ad
      }, SpreadsheetApp.getActiveSpreadsheet());
  
}


function testRequest(captcha) {
  Logger.log('start test request');
  var result = Request(captcha);
  Logger.log('r ' + result.getContentText());
}
