// 自分のアドレス: subscribe しないために除外
const myCalId = "bar@example.com";

export function myCalendarId() {
    return myCalId;
}

// 保存したいアドレスのリスト
const calIds = `
foo@example.com
bar@example.com
baz@example.com
`.trim().split("\n");

export function calendarIds() {
    return calIds;
}
