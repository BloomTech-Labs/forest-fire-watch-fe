import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { UserDataContext } from '../context/UserDataContext';
import NavigationProfile from './NavigationProfile';

// import { NavLink } from "react-router-dom";

import { FireDataContext } from '../context/FireDataContext';

// import PrivateMap from "./PrivateMap";
// import { subscribeUser } from "../subscriptions.js";

// USER PROFILE PAGE
const Dashboard = () => {
	const { userDataState, getUserData, updateTextAlerts, updatePushAlerts, addPhoneNumber } = useContext(
		UserDataContext
	);
	const { fireDataState, getUserLocations } = useContext(FireDataContext);
	const { userLocations } = fireDataState;
	const { email, phone, receiveSMS, receivePush } = userDataState;
	const [ phoneNumber, setPhoneNumber ] = useState('');
	const [ showEditPhone, setEditPhone ] = useState(false);

	useEffect(() => {
		getUserData();
		getUserLocations();
	}, []);

	// const subscribe = e => {};

	const handleAddPhoneNumber = () => {
		if (phoneNumber.length > 9) {
			setEditPhone(false);
			addPhoneNumber(phoneNumber);
		}
	};

	const phoneInput = (
		<DataDiv>
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
		</DataDiv>
	);

	return (
		<div className="dashboard-wrapper">
			<NavigationProfile />
			<div className="content-wrapper">
				<div className="personal-info">
					<h3 className="profile-name">Dora Belme</h3>
					<h3 className="profile-email">{email}</h3>
					<h3 className="profile-phone">123 456 7890</h3>

					{/* {phone === null || showEditPhone ? (
          phoneInput
        ) : (
            <DataDiv>
              <h4>{phone}</h4>
              <i
                onClick={() => setEditPhone(true)}
                style={{ margin: "auto 0px", cursor: "pointer" }}
                class="fas fa-pencil-alt"
              ></i>
            </DataDiv>
          )} */}
					<div className="notification-wrapper">
						<div className="notif-box">
							<h4>Text Alerts</h4>
							<CheckBoxWrapper>
								<CheckBox
									id="checkbox1"
									type="checkbox"
									onChange={() => {
										updateTextAlerts(!receiveSMS);
									}}
									checked={receiveSMS}
								/>
								<CheckBoxLabel htmlFor="checkbox1" />
							</CheckBoxWrapper>
						</div>

						<div className="notif-box">
							<h4>Push Notifications</h4>
							<CheckBoxWrapper>
								<CheckBox
									id="checkbox2"
									type="checkbox"
									onChange={(e) => {
										updatePushAlerts(!receivePush);
									}}
									checked={receivePush}
								/>
								<CheckBoxLabel htmlFor="checkbox2" />
							</CheckBoxWrapper>
						</div>
					</div>
					{/* <button onClick={e=>{subscribeUser()}}>Check</button> */}
				</div>
				<div className="locations-info">
					<h3>Saved Locations</h3>
					<div className="locations-table">
						<tbody>
							<div className="table-row">
								<TH>Address</TH>
								<TH>Radius</TH>
								<TH>Alerts</TH>
								<TH />
							</div>

							{userLocations.map((loc, index) => (
								<div className="table-row" key={index + loc.radius}>
									<td style={{ textTransform: 'capitalize' }}>{loc.address}</td>
									<td>{loc.radius}</td>
									<td>{loc.notifications ? 'ON' : 'OFF'}</td>
								</div>
							))}
						</tbody>
					</div>
					<button className="auth-btn">Add Location</button>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

// const TableRow = styled.tr``;

const TH = styled.th`
	color: black;
	font-family: Open Sans;
	font-style: normal;
	font-weight: 600;
	font-size: 24px;
	line-height: 33px;

	@media (max-width: 500px){
		font-size: 1.6rem;
	}
`;

const DataDiv = styled.div`
	width: 250px;
	margin: 0 20px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	color: black;
	font-family: Open Sans;
	font-weight: normal;
	font-style: normal;
	font-weight: normal;
	font-size: 22px;
	line-height: 22px;
	letter-spacing: -0.41px;
	color: #191a1a;
	background-color: pink;
`;

const CheckBoxWrapper = styled.div`
	position: relative;
	margin: auto 0px auto auto;
`;
const CheckBoxLabel = styled.label`
	position: absolute;
	top: 0;
	left: 0;
	width: 42px;
	height: 26px;
	border-radius: 15px;
	background: #bebebe;
	cursor: pointer;
	&::after {
		content: "";
		display: block;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		margin: 3px;
		background: #ffffff;
		box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
		transition: 0.2s;
	}
`;
const CheckBox = styled.input`
	opacity: 0;
	z-index: 1;
	border-radius: 15px;
	width: 42px;
	height: 26px;
	&:checked + ${CheckBoxLabel} {
		background: #4fbe79;
		&::after {
			content: "";
			display: block;
			border-radius: 50%;
			width: 18px;
			height: 18px;
			margin-left: 21px;
			transition: 0.2s;
		}
	}
`;
