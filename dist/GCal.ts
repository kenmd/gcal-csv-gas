import { getNumberOfWeekInMonth } from "./Util";
import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Event = GoogleAppsScript.Calendar.CalendarEvent;

export function saveEvents(calId: string, fromDate: string, toDate: string, sheetKey: string, sheetName: string) {
    const sheet = _openSheet(sheetKey, sheetName);
    _prepareSheetHeader(sheet);

    const events = _findEvents(calId, fromDate, toDate);
    _writeEventsToSheet(calId, events, sheet);
}

function _openSheet(sheetKey: string, sheetName: string) {
    const spreadsheet = SpreadsheetApp.openById(sheetKey);
    return spreadsheet.getSheetByName(sheetName);
}

function _findEvents(calId: string, fromDate: string, toDate: string) {
    const calendar = CalendarApp.getCalendarById(calId);
    return calendar.getEvents(new Date(fromDate), new Date(toDate));
}

function _prepareSheetHeader(sheet: Sheet) {
    sheet.getRange("A1").setValue("calendar_id");
    sheet.getRange("B1").setValue("日付");
    sheet.getRange("C1").setValue("月");
    sheet.getRange("D1").setValue("週");
    sheet.getRange("E1").setValue("内容");
    sheet.getRange("F1").setValue("開始時間");
    sheet.getRange("G1").setValue("終了時間");
    sheet.getRange("H1").setValue("会議時間");
    sheet.getRange("I1").setValue("場所");
}

function _writeEventsToSheet(calId: string, events: Event[], sheet: Sheet) {
    let row = 2;

    for (const event of events) {
        const start = event.getStartTime();
        const end = event.getEndTime();
        const yyyyMmDd = start.toISOString().slice(0, 10).replace(/-/g, "/");
        const month = (start.getMonth() + 1) + "月"; // month number start with zero
        const week = getNumberOfWeekInMonth(start);
        const title = event.getTitle();
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        const location = event.getLocation();

        if (hours === 24) {
            continue;   // skip daily event
        }

        sheet.getRange("A" + row).setValue(calId);
        sheet.getRange("B" + row).setValue(yyyyMmDd);
        sheet.getRange("C" + row).setValue(month);
        sheet.getRange("D" + row).setValue(week);
        sheet.getRange("E" + row).setValue(title);
        sheet.getRange("f" + row).setValue(start.toTimeString().split(" ")[0]);
        sheet.getRange("G" + row).setValue(end.toTimeString().split(" ")[0]);
        sheet.getRange("H" + row).setValue(hours);
        sheet.getRange("I" + row).setValue(location);

        row++;
    }
}
