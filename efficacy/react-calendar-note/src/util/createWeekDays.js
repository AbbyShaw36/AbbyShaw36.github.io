import { pullAt } from "lodash";

export default function createWeekDays(weekOffset=0) {
  const weekArr = ["日","一","二","三","四","五","六"];

  let newWeekArr = [];

  while(weekArr.length) {
    newWeekArr.push(pullAt(weekArr,weekOffset));
  }

  return newWeekArr;
}
