import React, { Component } from "react";
import { render } from "react-dom";
import moment from "moment";
import { filter, includes, takeWhile } from "lodash";
import Calendar from "./components/calendar.jsx";
import Note from "./components/note.jsx";
import "./style/calendar.scss";

var noteList = [{
  "date" : "2017-02-05",
  "note": "abc",
  "updateTime": "2017-02-01 08:00:00"
  },{
  "date": "2017-02-10",
  "note": "aaa",
  "updateTime": "2017-02-01 08:00:00"
}];

var getNoteObj = (dayObj) => {
  return filter(noteList, (o) => {
    return o.date === dayObj.format("YYYY-MM-DD")
  })[0];
}

class BearCalendarNote extends Component {
  constructor(props) {
    super(props);

    let todayObj = moment();
    let noteObj = getNoteObj(todayObj);

    this.state = {
      date: todayObj,  // 当前显示月份的日期，用于填充日历
      currentDate: todayObj,  // 当前选中日期
      currentNote: noteObj || {"date": todayObj.format("YYYY-MM-DD"),"note": ""},  // 当前显示的笔记
      inputValue: noteObj ? noteObj.note : "",  // 当前显示笔记内容
      isEdited: false  // 是否已编辑过笔记
    };
  }

  render() {
    const { date, currentNote,isEdited } = this.state;

    return (
      <div className="bearCalendarNote">
        <Calendar
          onNextMonth={() => this.setState({ date: date.clone().add(1,"months")})}
          onPrevMonth={() => this.setState({ date: date.clone().subtract(1,"months")})}
          date={date}
          onPickDate={
            (dayObj) => {
              // console.log(day);
              // console.log(this.state.date.format("YYYY-MM-DD"))

              let noteObj = getNoteObj(dayObj) || {"date": dayObj.format("YYYY-MM-DD"),"note": ""};

              this.setState({
                currentNote : noteObj,
                date: dayObj
              });

              // console.log(this.state);
            }
          }
          renderDay={(dayObj) => dayObj.format("D")}
          daysHasNote={noteList.map((o) => { return  !!o.note ? o.date : false })}
          currentNote={currentNote}
        />
        <Note
          note={currentNote}
          onSave={
            (text) => {
              currentNote.note = text;
              currentNote.updateTime = moment().format("YYYY-MM-DD HH:mm:ss");

              if (!getNoteObj(moment(currentNote.date))) {
                noteList.push(currentNote);
              }

              // console.log(currentNote);
              // console.log(noteList);

              this.setState({isEdited: false})
            }
          }
          onChange={
            (value) => {
              currentNote.note = value;

              this.setState({isEdited: true});
              // console.log(this.state);
            }
          }
          inputValue={currentNote ? currentNote.note : ""}
          isEdited={isEdited}
        />
      </div>
    );
  }
}

render(
  <BearCalendarNote />,
  document.getElementById("calendar")
);
