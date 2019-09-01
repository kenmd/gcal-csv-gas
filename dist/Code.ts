import { saveEvents } from "./GCal";
import { calendarIds } from "./GCalLists";
import { openSheet } from "./Util";

function main() {
    const calIds = calendarIds();
    const fromDate = "2019/04/01";
    const toDate = "2019/07/01";
    const sheetKey = "dummyYjHDcwM-P1SfYoqJC6fhK3wmrtbJ0eLI-UH1Rrg";
    const sheetName = "シート1";

    const sheet = openSheet(sheetKey, sheetName);
    saveEvents(calIds, fromDate, toDate, sheet);
}
