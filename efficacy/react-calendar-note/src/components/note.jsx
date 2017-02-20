import React, { Component, PropTypes } from 'react';

class Note extends Component {
  static propTypes = {
    note: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    isEdited: PropTypes.bool.isRequired,
  };

  static defaultProps = {};

  render() {
    const {note,isEdited,onSave,onChange,inputValue} = this.props;

    return (
      <div className="note">
        <h2 className="note_title">Note:</h2>
        <textarea
          className="note_textarea"
          onChange={
            (event) => {
              onChange(event.target.value);
            }
          }
          value={inputValue}
        />
        <button
          type="button"
          disabled={isEdited ? "" : "false"}
          onClick={
            () => {
              onSave(inputValue);
            }
          }
          className="note_btn"
        >保存</button>
        {
            inputValue ? <div>更新时间：{note.updateTime}</div> : ""
        }
      </div>
    )
  }
};

export default Note;
