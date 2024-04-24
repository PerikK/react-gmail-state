import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)


 

  function handleEmailDisplay(emails) {
    return emails.map((email, index) => (
      <li className="email" key={index}>
        <div className="select">
          <input className="select-checkbox" type="checkbox"
            checked={email.read} onChange={() => handleToggleRead(index)}
          />
        </div>
        <div className="star">
          <input className="star-checkbox" type="checkbox"
            checked={email.starred} onChange={() => handleToggleStarred(index)}
          />
        </div>
        <div className="sender">{email.sender}</div>
        <div className="title">{email.title}</div>
      </li>
    ));
  }

  function handleToggleRead(index) {
    const updatedEmails = [...emails]; 
    updatedEmails[index].read = !updatedEmails[index].read;
    setEmails(updatedEmails); 
  }
  
  function handleToggleStarred(index) {
    const updatedEmails = [...emails]; 
    updatedEmails[index].starred = !updatedEmails[index].starred;
    setEmails(updatedEmails); 
  }
  
  console.log(initialEmails)

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              // onChange={() => {}}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{handleEmailDisplay(emails)}</main>
    </div>
  )
}

export default App
