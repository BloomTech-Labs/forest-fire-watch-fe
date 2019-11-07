import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../context/UserDataContext'
import NavigationProfile from '../NavigationProfile'
import { FireDataContext } from '../../context/FireDataContext'
import axiosWithAuth from '../../utils/axiosWithAuth'
import fire from '../../config/fire'
import LocationsList from './LocationsList'

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

  if (fireDataState.errorMessage[0] === 'there is an error') {
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

  const handleAddPhoneNumber = () => {
    if (phoneNumber.length > 9) {
      setEditPhone(false)
      addPhoneNumber(phoneNumber)
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
      <NavigationProfile />
      <div className="content-wrapper">
        <div className="personal-info">
          <h3 className="profile-name">
            {firstName} {lastName}
          </h3>
          {/* Checks to see if isEditing is false and if so renders the email of the user and if true will render the input for editing */}
          {!isEditing ? (
            <div className="profile-field-container">
              <h3 className="profile-field profile-email">
                {!newEmail ? `${email}` : `${newEmail}`}
              </h3>
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
              <h3 className="profile-field profile-phone">
                {formatPhone(phoneNumber)}
              </h3>
              <i
                onClick={() => setEditPhone(true)}
                className="fas fa-pencil-alt edit-profile-icon"
              />
            </div>
          )}
          <div className="notification-wrapper">
            <div className="notif-box">
              <h4>Text Alerts</h4>
              <div className="checkbox-wrapper">
                <input
                  className="checkbox"
                  id="checkbox1"
                  type="checkbox"
                  onChange={() => {
                    updateTextAlerts(!receiveSMS)
                  }}
                  checked={receiveSMS}
                />
                <label className="checkbox-label" htmlFor="checkbox1" />
              </div>
            </div>

            <div className="notif-box">
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
            </div>
          </div>
          {/* <button onClick={e=>{subscribeUser()}}>Check</button> */}
        </div>
        <LocationsList
          userLocations={userLocations}
          deleteUserLocation={deleteUserLocation}
          {...props}
        />
      </div>
    </div>
  )
}

export default Dashboard
