//COMPOPNENT

import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Button from "react-bootstrap/Button";
import "./CalendarForm.css"
import {
  addCalendar,
  editCalendar,
  getCalendar,
  deleteCalendar,
} from "../pages/Profile/requests";
import { observer } from "mobx-react";
const buttonStyle = { marginRight: 10 };


function CalendarForm({ calendarStore, calendarEvent, onCancel, edit, userID }) {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [title, setTitle] = React.useState("");
  const [id, setId] = React.useState(null);

  // on every change of title, start, end, id 
  React.useEffect(() => {
    setTitle(calendarEvent.title);
    setStart(calendarEvent.start);
    setEnd(calendarEvent.end);
    setId(calendarEvent.id);
  }, [
    calendarEvent.title,
    calendarEvent.start,
    calendarEvent.end,
    calendarEvent.id,
  ]);


  // when submit calendar form
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!title || !start || !end) {
      return;
    }
    if (+start > +end) {
      alert("Start date must be earlier than end date");
      return;
    }
    
    // if creating event (don't need id since one will be created)
    if (!edit) {
      const data = { title, start, end };
      await addCalendar(data);
    }
    // updating an event 
    else {
      const data = { id, title, start, end };
      await editCalendar(data);
    }
    const response = await getCalendar(userID);
    const evs = response.data.map((d) => {
      return {
        // ...d,
        id: d._id,
        title: d.title,
        allday: d.allDay,
        start: new Date(d.start),
        end: new Date(d.end),
      };
    });
    calendarStore.setCalendarEvents(evs);
    onCancel();
  };

  const handleStartChange = (date) => setStart(date);
  const handleEndChange = (date) => setEnd(date);
  const handleTitleChange = (ev) => setTitle(ev.target.value);
  
  const deleteCalendarEvent = async () => {
    await deleteCalendar(calendarEvent.id);
    const response = await getCalendar(userID);
    const evs = response.data.map((d) => {
      return {
        // ...d,
        id: d._id,
        title: d.title,
        allday: d.allDay,
        start: new Date(d.start),
        end: new Date(d.end),
      };
    });
    calendarStore.setCalendarEvents(evs);
    onCancel();
  };
  
  
  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            placeholder="Title"
            value={title || ""}
            onChange={handleTitleChange}
            isInvalid={!title}
          />
          <Form.Control.Feedback type="invalid">{!title}</Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="start">
          <Form.Label>Start</Form.Label>
          <br />
          <DatePicker
            showTimeSelect
            className="form-control"
            selected={start}
            onChange={handleStartChange}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="12" controlId="end">
          <Form.Label>End</Form.Label>
          <br />
          <DatePicker
            showTimeSelect
            className="form-control"
            selected={end}
            onChange={handleEndChange}
          />
        </Form.Group>
      </Form.Row>
      <Button type="submit" style={buttonStyle}>
        Save
      </Button>
      <Button type="button" style={buttonStyle} onClick={deleteCalendarEvent}>
        Delete
      </Button>
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
    </Form>
  );
}
export default observer(CalendarForm);
