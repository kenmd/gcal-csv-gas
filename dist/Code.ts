import { saveEvents } from "./GCal";

function main() {
    const calId = "email.address@example.com";
    const fromDate = "2019/04/01";
    const toDate = "2019/07/01";
    const sheetKey = "dummyYjHDcwM-P1SfYoqJC6fhK3wmrtbJ0eLI-UH1Rrg";
    const sheetName = "シート1";

    saveEvents(calId, fromDate, toDate, sheetKey, sheetName);
}
