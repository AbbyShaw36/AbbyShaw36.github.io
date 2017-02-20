import React, { Component, PropTypes } from 'react';
import moment from "moment";
import { indexOf } from "lodash";
import createWeekDays from "../util/createWeekDays";
import createDates from "../util/createDates";

class Calendar extends Component {
  static propTypes = {
    weekOffset: PropTypes.number.isRequired,
    date: PropTypes.object.isRequired,
    renderDay: PropTypes.func,
    onNextMonth: PropTypes.func.isRequired,
    onPrevMonth: PropTypes.func.isRequired,
    onPickDate: PropTypes.func,
    daysHasNote: PropTypes.array,
    currentNote: PropTypes.object.isRequired
  };

  static defaultProps = {
    weekOffset: 0,
    renderDay: day => day.format("YYYY-MM-D"),
    daysHasNote: []
  };

  render() {
    const { date, weekOffset, renderDay, onNextMonth, onPrevMonth, onPickDate, daysHasNote, currentNote } = this.props;

    return (
      <div className='calendar'>
        <div className='calnedar_header'>
          <button onClick={onPrevMonth}>&laquo;</button>
          <div className='calendar_header_currentDate'>{date.format("YYYY")}年 {date.format("M")}月</div>
          <button onClick={onNextMonth}>&raquo;</button>
        </div>
        <div className='calendar_body calendar_grid'>
          <div className='calendar_grid_head'>
            {
              createWeekDays(weekOffset).map((weekDay,i) => {
                return (
                  <div key={`week-${i}`} className='calendar_grid_item'>{weekDay}</div>
                )
              })
            }
          </div>
          <div className='calendar_grid_body'>
            {
              createDates(date,weekOffset).map((day,i) => {
                return (
                  <div
                    key={`week-${i}`}
                    className={`calendar_grid_item ${day.className || ''} ${indexOf(daysHasNote,day.day.format("YYYY-MM-DD")) !== -1 ? 'hasNote' : ''} ${currentNote.date === day.day.format("YYYY-MM-DD") ? 'currentDate' : ''} ${day.day.format("YY-M-D") === moment().format("YY-M-D") ? 'today' : ''}`}
                    onClick={(e) => {
                      onPickDate(day.day);
                    }}
                  >
                    {day.day.format("YY-M-D") === moment().format("YY-M-D") ? '今天' : renderDay(day.day)}
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
};

export default Calendar;
