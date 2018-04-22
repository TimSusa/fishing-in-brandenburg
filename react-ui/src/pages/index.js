import React from 'react';
import PropTypes from 'prop-types';
import Input from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

import TableEnhaced from '../components/EnhancedTable/';
import { getNamesAndAreas } from './../angel-radar';

import { GoogleMapComponent } from '../components/GoogleMap/GoogleMap';

class Index extends React.Component {
	startVal = '100';
	state = {
		limitAreaValue: this.startVal,
		data: getNamesAndAreas(this.startVal),
		currentGeoPosition: '',
		markerPositions: []
	};
	componentWillMount() {
		// In order to save performance, we have a look, 
		// if geo pos is already set to local storage
		const currentGeoPosition = window.localStorage.getItem('currentGeoPosition')
		if (!currentGeoPosition) {
			this.getLocation();
		} else {
			this.setState({
				currentGeoPosition
			});
		}
	}
	render() {
		const { classes } = this.props;
		const { currentGeoPosition } = this.state;
		return (
			<div className={classes.root}>
				<Typography variant="display1" gutterBottom>
					DAV Angelgewässer Brandenburg
				</Typography>
				<Typography variant="subheading" gutterBottom>
					Suche nach Gewässername:
				</Typography>
				<Input
					placeholder="Name hier eingeben"
					defaultValue={''}
					inputProps={{
						'aria-label': 'Name hier eingeben'
					}}
					onChange={this.handleChange}
					name="inputName"
				/>
				<br />
				<br />

				<Typography variant="subheading" gutterBottom>
					Sortierung nach Fläche größer in ha:
				</Typography>
				<Input
					defaultValue={this.state.limitAreaValue}
					inputProps={{
						'aria-label': 'Fläche hier eingeben'
					}}
					onChange={this.handleChange}
					name="inputArea"
				/>
				<Typography variant="subheading" gutterBottom>
					Gefundene Anzahl: {this.state.data.length}
				</Typography>
				{currentGeoPosition && <GoogleMapComponent isMarkerShown currentGeoPosition={currentGeoPosition} markerPositions={this.state.markerPositions}/>}
				<TableEnhaced data={this.state.data} currentGeoPosition={currentGeoPosition} onItemSelected={this.onItemSelected} />
			</div>
		);
	}

	onItemSelected = (markerPositions) => {
		this.setState({
			markerPositions
		})
	}
	handleChange = (e) => {
		if (e.target.name === 'inputArea') {
			var data = getNamesAndAreas(e.target.value);
			this.setState({ data, limitAreaValue: e.target.value, markerPositions: data.map( ({coods}) => (coods)) });
		}
		if (e.target.name === 'inputName') {
			const data = getNamesAndAreas(this.state.limitAreaValue).filter((item) => {
				return item.name.includes(e.target.value);
			});
			this.setState({
				data,
				markerPositions: data.map( ({coods}) => (coods))
			});
		}
	};

	getLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(this.showPosition);
		} else {
			console.warn('Geolocation is not supported by this browser.');
		}
	};
	showPosition = ({ coords: { latitude, longitude } }) => {
		const currentGeoPosition = `${latitude},${longitude}`;
		this.setState({
			currentGeoPosition
		});
		window.localStorage.setItem('currentGeoPosition', currentGeoPosition);
	};
}

Index.propTypes = {
	classes: PropTypes.object.isRequired
};

const styles = (theme) => ({
	root: {
		textAlign: 'center',
		paddingTop: theme.spacing.unit * 10
	}
});

export default withRoot(withStyles(styles)(Index));
