import SpreadsheetApp = GoogleAppsScript.Spreadsheet.SpreadsheetApp;

export default class Sheet {
	private app: SpreadsheetApp = SpreadsheetApp;

	readFromActiveRow(): string[] {
		const activeSheet = this.app.getActiveSheet();
		const range = activeSheet.getActiveRange();
		const a = range.getDisplayValues();
		return a[0];
	}

	writeToCell(value: string|number, position: ISheetPosition) {
		// log('write to cell', value, position.row, position.column);
		this.app.getActiveSheet().getRange(position.row, position.column).setValue(value);
	}

	getCurrentRow(): number {
		return this.app.getActiveRange().getRow();
	}
	
	splitNames(from:number, to:number) {
		const fullNames = this.app.getActiveSheet().getRange(from, RowName.FULL_NAME + 1, to, 1).getDisplayValues();

		fullNames.forEach(function(fullName:string[], i) {
			const names = fullName[0].split(' ');
			if (fullName[0].toLocaleLowerCase().indexOf('общество') > -1 ||
				fullName[0].toLocaleLowerCase().indexOf('администрация') > -1) {
				return;
			}

			this.app.getActiveSheet().getRange(i, RowName.FAMILY + 1).setValue(names[0] || '');
			this.app.getActiveSheet().getRange(i, RowName.NAME + 1).setValue(names[1] || '');
			this.app.getActiveSheet().getRange(i, RowName.SECOND_NAME + 1).setValue(names[2] || '');
		}, this);
	}
}

interface ISheetPosition {
	row: number,
	column: number
}

export enum RowName {
	NVL = 0,
	SQUARE = 1,
	CON_DESC = 2,
	REG_NO = 3,
	TYPE = 4,
	FULL_NAME = 5,
	FAMILY = 6,
	NAME = 7,
	SECOND_NAME = 8,
	BIRTHDAY = 9,
	INN = 10,
	PASSPORT_NUMBER = 11,
	PASSPORT_DATE = 12,
	SNILS = 13
}
