function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('Цербер')
    .addItem('Авторизация', 'loginToCerber')
    .addItem('Отправить выделенные строки', 'sendRows')
    .addToUi();
  ui.createMenu('ФНС')
    .addItem('Запросить ИНН', 'getCaptchaToken')
    .addToUi();
}

