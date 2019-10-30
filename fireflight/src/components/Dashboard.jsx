import React, { useContext, useEffect, useState } from 'react';
import { UserDataContext } from '../context/UserDataContext';
import NavigationProfile from './NavigationProfile';
import { FireDataContext } from '../context/FireDataContext';
import { Link } from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import fire from '../config/fire';

// USER PROFILE PAGE
const Dashboard = () => {
	const { userDataState, getUserData, updateTextAlerts, updatePushAlerts, addPhoneNumber } = useContext(
		UserDataContext
	);
	const { fireDataState, getUserLocations, deleteLocationMarker, deleteUserLocation } = useContext(FireDataContext);
	const { userLocations } = fireDataState;
	const { email, phone, receiveSMS, receivePush } = userDataState;
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ showEditPhone, setEditPhone ] = useState(false);
	const [ isEditing, setIsEditing ] = useState(false);
	const [ newEmail, setNewEmail ] = useState('');

	//   console.log("user locations: ", userLocations);

	useEffect(() => {
		getUserData();
		getUserLocations();
	}, []);

	const handleAddPhoneNumber = () => {
		if (phoneNumber.length > 9) {
			setEditPhone(false);
			addPhoneNumber(phoneNumber);
		}
	};

	const phoneInput = (
		<div>
			<input
				className="form-input-phone"
				type="text"
				name="phone"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				placeholder="ex. 123 456 7890"
			/>
			<button className="phone-btn" onClick={() => handleAddPhoneNumber()}>
				{showEditPhone ? 'Submit' : 'Add Phone Number'}
			</button>
		</div>
	);

	const changeEmail = () => {
		console.log(newEmail);
		axiosWithAuth()
			.put(`${process.env.REACT_APP_ENV}users/update/${fire.auth().currentUser.uid}`, { email: newEmail })
			.then((res) => {
				console.log(res);
				fire
					.auth()
					.currentUser.updateEmail(newEmail)
					.then((newEmailCreated) => {
						console.log('new email has been saved in firebase');
					})
					.catch((err) => alert(err.message));
				setIsEditing(false);
			})
			.catch((err) => console.log(err));
	};

	console.log('Userlocations', userLocations[0]);

	return (
		<div className="dashboard-wrapper">
			<NavigationProfile />
			<div className="content-wrapper">
				<div className="personal-info">
					<h3 className="profile-name">Dora Belme</h3>
					{/* Checks to see if isEditing is false and if so renders the email of the user and if true will render the input for editing */}
					{!isEditing ? (
						<h3 className="profile-email">
							{!newEmail ? `${email}` : `${newEmail}`}{' '}
							<button onClick={() => setIsEditing(true)}>Edit Email</button>
						</h3>
					) : (
						<div>
							<input
								type="email"
								placeholder="Enter your new Email"
								className="profile-email"
								name="newEmail"
								onChange={(e) => setNewEmail(e.target.value)}
								className="is-editing-input"
							/>
							<button type="submit" onClick={() => changeEmail()}>
								Change Email
							</button>
						</div>
					)}
					<h3 className="profile-phone">{phone}</h3>

					{phone === null || showEditPhone ? (
						phoneInput
					) : (
						<div className="phone-edit">
							<h4>{phone}</h4>
							<i
								onClick={() => setEditPhone(true)}
								style={{ margin: 'auto 0px', cursor: 'pointer' }}
								class="fas fa-pencil-alt"
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
										updateTextAlerts(!receiveSMS);
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
									onChange={(e) => {
										updatePushAlerts(!receivePush);
									}}
									checked={receivePush}
								/>
								<label className="checkbox-label" htmlFor="checkbox2" />
							</div>
						</div>
					</div>
					{/* <button onClick={e=>{subscribeUser()}}>Check</button> */}
				</div>
				<div className="locations-info">
					<h3>Saved Locations</h3>
					<div className="locations-table">
						<tbody>
							<div className="table-row">
								<th className="locations-header">Address</th>
								<th className="locations-header">Radius</th>
								<th className="locations-header">Alerts</th>
								<th className="locations-header">Delete</th>
							</div>

							{userLocations.map((loc, index) => (
								<div className="table-row" key={index + loc.radius}>
									<td className="address-box">{loc.address}</td>
									<td>{loc.radius} mi</td>
									<td>{loc.notifications ? 'ON' : 'OFF'}</td>
									<button className="add-location-btn" onClick={() => deleteUserLocation(loc.id)}>
										Delete Location
									</button>
								</div>
							))}
						</tbody>
					</div>
					<Link to="/address">
						<button className="add-location-btn">Add Location</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
