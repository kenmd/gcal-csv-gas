import Sheet = GoogleAppsScript.Spreadsheet.Sheet;
import Event = GoogleAppsScript.Calendar.CalendarEvent;
import { myCalendarId } from "./GCalLists";
import { getNumberOfWeekInMonth, subscribe, unsubscribe } from "./Util";

export function saveEvents(calIds: string[], fromDate: string, toDate: string, sheet: Sheet) {
    _prepareSheetHeader(sheet);

    let row = 2;

    for (const calId of calIds) {
        Logger.log(calId);

        if (calId !== myCalendarId()) {
            subscribe(calId);
        }

        const events = _findEvents(calId, fromDate, toDate);
        row = _writeEventsToSheet(row, calId, events, sheet);

        if (calId !== myCalendarId()) {
            unsubscribe(calId);
        }
    }
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

function _writeEventsToSheet(row: number, calId: string, events: Event[], sheet: Sheet) {
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

    return row;
}
