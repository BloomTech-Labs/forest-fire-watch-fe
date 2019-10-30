import React, { useState, useContext, useEffect } from 'react';
import AddressContext from '../context/addressContextProvider';
import { GlobalContext } from '../context/contextProvider';
import NavigationProfile from '../components/NavigationProfile';
import { FireDataContext } from '../context/FireDataContext';
import Geocoder from 'react-mapbox-gl-geocoder';
import { Link } from 'react-router-dom';

const token = process.env.REACT_APP_MAPBOX_TOKEN;

function Address2() {
	const { getCoordinates, saveLocationMarker, deleteLocationMarker } = useContext(FireDataContext);
	const newAddress = useContext(AddressContext);

	const [ address, setAddress ] = useState('');
	const [ radius, setRadius ] = useState('');
	const [ id, setId ] = useState(undefined);
	const [ viewport, setViewport ] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		if (address) {
			getCoordinates(address, radius);
			saveLocationMarker();
		}
		console.log(getCoordinates(address, radius));
	};

	const queryParams = {
		country: 'us'
	};
	const mapAccess = {
		mapboxApiAccessToken: token
	};
	const [ location, setLocation ] = useState([]);

	const onSelected = (viewport, item) => {
		console.log('on selected', item);
		setAddress(item.place_name);
		setLocation(item.center);
	};

	return (
		<React.Fragment>
			<NavigationProfile />
			<div className="addlocation-wrapper">
				<h2>Add Location</h2>
				<form onSubmit={handleSubmit}>
					<label>Address</label>
					<Geocoder
						{...mapAccess}
						queryParams={queryParams}
						hideOnSelect={true}
						viewport={viewport}
						onSelected={onSelected}
						updateInputOnSelect={true}
						limit={3}
						value={address}
					/>
					<div className="radius-wrapper">
						<label>Radius</label>
						<div className="radius-info">
							<input
								type="number"
								name="Radius"
								placeholder="mi"
								value={radius}
								className="radius-input"
								onChange={(e) => setRadius(e.target.value)}
							/>
							<p className="radius-text">
								Choose the miles from this location that you wish to be notified of fires within.
							</p>
						</div>
					</div>
					{/* <Link to="/dashboard"> */}
					<button className="default-btn">Save Location</button>
					{/* </Link> */}
				</form>
			</div>
		</React.Fragment>
	);
}

export default Address2;
