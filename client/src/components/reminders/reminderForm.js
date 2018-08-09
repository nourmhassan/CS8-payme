import React from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import { addReminder } from '../../actions/smsReminders';

const ReminderForm = props => {
  return (
    <div className="reminderform">
      <div className="reminderform-drop">
        <h1>Invoices:</h1>
        <Dropdown
          className="dropdown"
          placeholder="Choose invoice by name"
          // closeOnChange
          search
          selection
          options={props.invoices.map((invoice, i) => {
            return (
              <div className="dropdown-option" key={i}>
                <p
                  tabIndex="0"
                  className={props.selected ? 'dropdown-select' : null}
                  onClick={() => {
                    props.onSelect();
                    props.getInvoice(
                      invoice._id,
                      invoice.phone.number,
                      invoice.clientName,
                      invoice.totalAmount,
                      invoice.email.address,
                    );
                  }}
                >
                  {invoice.clientName}
                </p>
              </div>
            );
          })}
        />
      </div>
      <div className="reminder-radios_menu">
        <div className="reminder-radios">
          <div className="reminder-select">
            <label>Sms</label>
            <input
              type="radio"
              value="false"
              checked={props.isEmail === 'false' || props.isEmail === false}
              onChange={props.handleEmail}
            />
          </div>
          <div className="reminder-select">
            <label>Email</label>
            <input
              type="radio"
              value="true"
              checked={props.isEmail === 'true'}
              onChange={props.handleEmail}
            />
          </div>
        </div>
        <div className="reminder-radios">
          <div className="reminder-select">
            <label>Daily</label>
            <input
              type="radio"
              value="daily"
              checked={props.remind === 'daily'}
              onChange={props.handleRemind}
            />
          </div>
          <div>
            <label>Weekly</label>
            <input
              type="radio"
              value="weekly"
              checked={props.remind === 'weekly' || props.remind === ''}
              onChange={props.handleRemind}
            />
          </div>
          <div>
            <label>Monthy</label>
            <input
              type="radio"
              value="monthly"
              checked={props.remind === 'monthly'}
              onChange={props.handleRemind}
            />
          </div>
        </div>
      </div>
      <div className="reminderform-message">
        <h1>Custom message:</h1>
        <textarea
          type="body"
          className="reminderform-message-input"
          onChange={props.handleMessage}
        />

        <div className="addreminder">
          <button
            className="addreminder-button connect-stripe_button"
            type="submit"
            onClick={() => {
              props.addReminder(props.formData, props.history);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default connect(
  null,
  { addReminder },
)(ReminderForm);
