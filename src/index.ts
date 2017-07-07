import Sheet, {RowName} from './sheet';
import Nalog, {Captcha, InputData} from './nalog';
import UI from './ui';
import SpreadsheetApp = GoogleAppsScript.Spreadsheet.SpreadsheetApp;
import utils from './utils';

export default class App {
	private ui: UI;
	private sheet: Sheet;
	private nalog: Nalog;

	constructor() {
		this.ui = new UI();
		this.sheet = new Sheet();
		this.nalog = new Nalog();
	}

	getCaptcha() {
		const captchaSrc = this.nalog.getCaptchaImageSrc();
		const currentApp = SpreadsheetApp.getActiveSpreadsheet();
		this.ui.showCaptcha(captchaSrc, currentApp);

		// Next call this.setCaptcha
	};

	writeINN(captcha: Captcha) {
		// Read fio from current Row
		const value = this.sheet.readFromActiveRow();

		// Send POST request to Nalog for getting INN
		let inn = null;
		try {
			 inn = this.nalog.getINN(this.createINNData(value), captcha);
		} catch (e) {
			// this.ui.showPopup()
			// log(e);
		}

		// log('inn', inn);

		// Write INN to Cell
		if (inn) {
			this.sheet.writeToCell(inn, {
				row: this.sheet.getCurrentRow(),
				column: RowName.INN + 1
			});
		}
	};

	splitNames() {
		this.sheet.splitNames(2, 13861);
	};

	createMenu() {
		const appUi = SpreadsheetApp.getUi();
		appUi.createMenu('ФНС')
            .addItem('Запросить ИНН', '_getINN')
            .addToUi();
		appUi.createMenu('Утилиты')
            .addItem('Разделить полное имя на столбцы', '_splitNames')
            .addToUi();
	};

	private createINNData(rowData: string[]): InputData {
		return {
			fam: rowData[RowName.FAMILY],
			nam: rowData[RowName.NAME],
			otch: rowData[RowName.SECOND_NAME],
			bdate: rowData[RowName.BIRTHDAY].replace('/', '.').replace('/', '.'),
			docno: utils.spliceString(rowData[RowName.PASSPORT_NUMBER].replace('№', ''), 2, 0, ' '),
			docdt: rowData[RowName.PASSPORT_DATE].replace('/', '.').replace('/', '.')
		};
	}
}

declare const global: any;
global.app = new App();
