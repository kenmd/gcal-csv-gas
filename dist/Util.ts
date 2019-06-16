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
