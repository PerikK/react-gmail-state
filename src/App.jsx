import { useState } from 'react'
import Header from './components/Header'
import initialEmails from './data/emails'

import './styles/App.css'

function App() {
  // Use initialEmails for state
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')


  function handleToggleRead(index) {
    const readEmails = [...emails]; 
    readEmails[index].read = !readEmails[index].read;    
    setEmails(readEmails); 
  }
  
  function handleToggleStarred(index) {
    const starredEmails = [...emails]; 
    starredEmails[index].starred = !starredEmails[index].starred;
    setEmails(starredEmails); 
  }
  
  function handleEmailsSelection() {
    let emailsToShow = emails
    if (hideRead) {
      emailsToShow = emails.filter((email) => !email.read)
    }
    if (currentTab === 'starred') {
      emailsToShow = emailsToShow.filter((email) => email.starred)
    }

    return emailsToShow
  }

  function getStarredNum() {
    return handleEmailsSelection().filter((email) => email.starred)   
  }
  
  function handleEmailDisplay(emails) {

    const emailsToDisplay = handleEmailsSelection(emails);

    return emailsToDisplay.map((email, index) => (
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

  // console.log(initialEmails)
  
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => setCurrentTab('inbox') }
          >
            <span className="label">Inbox</span>
            <span className="count">{ emails.length }</span>
          </li>
          <li
            className="item"
            onClick={() => setCurrentTab('starred')}
          >
            <span className="label">Starred</span>
            <span className="count">{ getStarredNum().length }</span>
          </li>

          <li className="item toggle">
            <label htmlFor="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={ () => { setHideRead(!hideRead) } }
            />
          </li>
        </ul>
      </nav>
      <main className="emails">{ handleEmailDisplay(emails) }</main>
    </div>
  )
}

export default App
