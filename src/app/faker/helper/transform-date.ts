// transform this date formate Sun Aug 28 2022 14:49:57 GMT+0200 (Eastern European Standard Time) to 2022-08-28 14:49:57
export default function transformDate(date: Date) {
    // const dateArray = date.toDateString().split(' ');
    const year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hours = date.getHours(),
        minutes = date.getMinutes(),
        seconds = date.getSeconds();
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

