import moment from "moment";
import {
  range,
  takeWhile,
  last
} from "lodash";

export default function createDates(date, weekOffset = 0) {
  const startOfMonth = date.clone().startOf("month");

  let diff = startOfMonth.weekday() - weekOffset + 1;

  if (diff < 0) {
    diff += 7;
  }

  const prevMonthDays = range(1, diff).map((n) => ({
    day: startOfMonth.clone().subtract(diff - n, 'days'),
    className: "prevMonth"
  }));

  const currentMonthDays = range(1, date.daysInMonth() + 1).map(index => ({
    day: moment([date.year(), date.month(), index])
  }));

  const daysAdded = prevMonthDays.length + currentMonthDays.length - 1;

  const nextMonthDays = takeWhile(range(1, 7), n => (daysAdded + n) % 7 !==
    0).map((n) => ({
    day: last(currentMonthDays).day.clone().add(n, "days"),
    className: "nextMonth"
  }));

  return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
}
