import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../context/UserDataContext'
import { FireDataContext } from '../../context/FireDataContext'
import axiosWithAuth from '../../utils/axiosWithAuth'
import fire from '../../config/fire'
import LocationsList from './LocationsList'
import ReactGA from 'react-ga'

ReactGA.pageview('/profile')

// USER PROFILE PAGE
const Dashboard = props => {
  const {
    userDataState,
    getUserData,
    updateTextAlerts,
    updatePushAlerts,
    addPhoneNumber
  } = useContext(UserDataContext)
  const {
    fireDataState,
    getUserLocations,
    deleteUserLocation,
    updateSavedLocationErrorMessage
  } = useContext(FireDataContext)
  const { userLocations, userLocationMarkers } = fireDataState
  const {
    email,
    phone,
    receiveSMS,
    receivePush,
    firstName,
    lastName
  } = userDataState

  const [phoneNumber, setPhoneNumber] = useState('')
  const [showEditPhone, setEditPhone] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newEmail, setNewEmail] = useState('')

  if (fireDataState.errorMessage[0] === 'there is an erro') {
    alert(
      'This location is already saved. To update the radius, please click the location on the map.'
    )
    //reverts the error message to false
    updateSavedLocationErrorMessage('false')
  }

  useEffect(() => {
    setPhoneNumber(phone)
  }, [phone])

  function formatPhone(phone) {
    if (phone != null) {
      return phone.replace(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
        '($1) $2-$3'
      )
    }
  }

  useEffect(() => {
    getUserData()
    getUserLocations()
  }, [userLocationMarkers])

  const handleAddPhoneNumber = e => {
    if (phoneNumber.length > 9) {
      setEditPhone(false)
      addPhoneNumber(phoneNumber)
    } else if (0 <= phoneNumber.length < 9) {
      window.alert('Please enter a valid phone number')
      setEditPhone(true)
    }
  }

  const changeEmail = () => {
    console.log(newEmail)
    axiosWithAuth()
      .put(
        // `${process.env.REACT_APP_ENV}users/update/${
        `users/update/${fire.auth().currentUser.uid}`,
        { email: newEmail }
      )
      .then(res => {
        fire
          .auth()
          .currentUser.updateEmail(newEmail)
          .then(newEmailCreated => {
            console.log('new email has been saved in firebase')
          })
          .catch(err => console.log(err))
        setIsEditing(false)
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="dashboard-wrapper">
      <h5 className='map-button' onClick={() => props.history.push('/home')}>
        <i class="fas fa-angle-left"
          onClick={() => props.history.push('/home')}>          
         </i>Map         
      </h5>       
      <div className="content-wrapper">
        <h3 className='profile-title'>Profile</h3>
        <div className="personal-info">
          <h4 className="profile-name">
            {firstName} {lastName}
          </h4>
          {/* Checks to see if isEditing is false and if so renders the email of the user and if true will render the input for editing */}
          {!isEditing ? (
            <div className="profile-field-container">
              <h4 className="profile-field profile-email">
                {!newEmail ? `${email}` : `${newEmail}`}
              </h4>
              {/* <button onClick={() => setIsEditing(true)}>Edit email</button> */}
              <i
                onClick={() => setIsEditing(true)}
                className="fas fa-pencil-alt edit-profile-icon"
              />
            </div>
          ) : (
            <div className="profile-field-container">
              <input
                type="email"
                placeholder="Enter your new email"
                className="profile-email is-editing-input"
                name="newEmail"
                onChange={e => setNewEmail(e.target.value)}
              />
              <button
                className="save-edit-btn"
                type="submit"
                onClick={() => changeEmail()}
              >
                Save
              </button>
            </div>
          )}
          {phone === null || showEditPhone ? (
            <div className="profile-field-container">
              <input
                className="is-editing-input"
                type="text"
                name="phone"
                value={formatPhone(phoneNumber)}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="ex. 123 456 7890"
              />
              <button
                className="save-edit-btn"
                onClick={() => handleAddPhoneNumber()}
              >
                {showEditPhone ? 'Save' : 'Add Phone Number'}
              </button>
            </div>
          ) : (
            <div className="profile-field-container">
              <h4 className="profile-field profile-phone">
                {formatPhone(phoneNumber)}
              </h4>
              <i
                onClick={() => setEditPhone(true)}
                className="fas fa-pencil-alt edit-profile-icon"
              />
            </div>
          )}
          

            {/* <div className="notif-box">
              <h4>Push Notifications</h4>
              <div className="checkbox-wrapper">
                <input
                  className="checkbox"
                  id="checkbox2"
                  type="checkbox"
                  onChange={e => {
                    updatePushAlerts(!receivePush)
                  }}
                  checked={receivePush}
                />
                <label className="checkbox-label" htmlFor="checkbox2" />
              </div>
            </div> */}
          {/* </div> */}
          {/* <button onClick={e=>{subscribeUser()}}>Check</button> */}
        </div>
        <LocationsList
          userLocations={userLocations}
          deleteUserLocation={deleteUserLocation}
          receivePush={receivePush}
          receiveSMS={receiveSMS}
          phone={phone}
          {...props}
        />
      </div>
    </div>
  )
}

export default Dashboard
