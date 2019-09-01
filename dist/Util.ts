// https://www.skyarc.co.jp/engineerblog/entry/customizewebpagelabel.html
// https://detail.chiebukuro.yahoo.co.jp/qa/question_detail/q12164404582
// 元のコードは土曜を基準としているが、営業日ベースにするため金曜基準に修正している
export function getNumberOfWeekInMonth(thisDay: Date) {
    const nextFriDate = thisDay.getDate() - thisDay.getDay() + 5;
    const nextFriday = new Date(thisDay.getFullYear(), thisDay.getMonth(), nextFriDate);

    if (thisDay.getMonth() !== nextFriday.getMonth()) {
        return getNumberOfWeekInMonth(nextFriday);
    } else {
        return (thisDay.getMonth() + 1) + "月-第" + Math.floor((nextFriDate + 6) / 7) + "週";
    }
}

export function openSheet(sheetKey: string, sheetName: string) {
    const spreadsheet = SpreadsheetApp.openById(sheetKey);
    return spreadsheet.getSheetByName(sheetName);
}

// 一度 subscribe すると、組織内の他の人の予定も読めるようになる
// https://groups.google.com/forum/#!topic/google-apps-api-japan/yy262qzhCZw

export function subscribe(calId: string) {
    CalendarApp.subscribeToCalendar(calId);
}

export function unsubscribe(calId: string) {
    const cal = CalendarApp.getCalendarById(calId);
    cal.unsubscribeFromCalendar();
}
