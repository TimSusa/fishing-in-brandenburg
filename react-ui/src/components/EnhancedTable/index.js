import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';

class EnhancedTable extends React.Component {
	constructor(props, context) {
		super(props, context);

		this.state = {
			order: 'asc',
			orderBy: 'area',
			selected: [],
			data: []
		};
	}

	componentWillMount() {
		this.refreshStateData(this.props.data);
	}

	componentWillReceiveProps(nextProps) {
		this.refreshStateData(nextProps.data);
	}

	render() {
		const { classes } = this.props;
		const { order, orderBy, selected } = this.state;
		const data = this.state.data;
		return (
			<Paper className={classes.root}>
				<EnhancedTableToolbar
					numSelected={selected.length}
					selectedItems={this.state.selected}
					handleOpenGoogleClick={this.handleOpenGoogleClick}
					handleDeleteSelection={this.handleDeleteSelection}
				/>
				<div className={classes.tableWrapper}>
					<Table className={classes.table}>
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={this.handleSelectAllClick}
							onRequestSort={this.handleRequestSort}
							rowCount={data.length}
						/>
						<TableBody>
							{data.map((n, i) => {
								const isSelected = this.isSelected(i, n);
								return (
									<TableRow
										hover
										onClick={(event) => this.handleClick(event, i)}
										role="checkbox"
										aria-checked={isSelected}
										tabIndex={-1}
										key={`${i}-selected`}
										selected={isSelected}
									>
										<TableCell padding="checkbox">
											<Checkbox checked={isSelected} />
										</TableCell>
										<TableCell padding="none">{n.name}</TableCell>
										<TableCell numeric>{n.area}</TableCell>
										<TableCell>{n.community}</TableCell>
										<TableCell>
											{n.coods ? (
												<a target="_blank" href={`https://maps.google.com/?q=${n.coods}`}>
													zeigen
												</a>
											) : (
												<div>-</div>
											)}
										</TableCell>
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</div>
			</Paper>
		);
	}

	refreshStateData = (input) => {
		this.setState({
			data: input
		});
	};

	handleDeleteSelection = () => {
		this.setState({ selected: [] });
	};

	handleOpenGoogleClick = (evt) => {
		evt.preventDefault();
		const coods = this.state.selected
			.map(({ coods }) => {
				return coods;
			})
			.filter((ob) => !!ob);
		const currPos = this.props.currentGeoPosition ? this.props.currentGeoPosition.toString() + '/' : '';
		const resultingPos = currPos + coods.join('/');
		window.location.href = `https://www.google.com/maps/dir/${resultingPos}`;
	};

	handleRequestSort = (event, property) => {
		const orderBy = 'area';
		let order = 'desc';

		if (this.state.orderBy === property && this.state.order === 'desc') {
			order = 'asc';
		}

		const data = order === 'desc' ? this.props.data.sort((a, b) => a.area - b.area) : this.props.data.reverse();

		this.setState({ data, order, orderBy });
	};

	handleSelectAllClick = (event, checked) => {
		event.preventDefault();
		if (checked) {
			this.setState({ selected: this.state.data.map((n) => n) });
			return;
		}
		this.setState({ selected: [] });
	};

	handleClick = (event, index) => {
		const currentSelectedObj = this.state.data[index];
		let tmpArray = this.state.selected;

		if (tmpArray) {
			if (this.state.selected.indexOf(currentSelectedObj) !== -1) {
				const idx = tmpArray.indexOf(currentSelectedObj);
				tmpArray.splice(idx, 1);
			} else {
				tmpArray = [ ...this.state.selected, currentSelectedObj ];
			}
		}

		this.setState({
			selected: tmpArray
		});
	};

	isSelected = (i, input) => {
		const tmp = this.state.selected && this.state.selected.some((obj) => obj.name === input.name);
		return tmp;
	};
}

EnhancedTable.propTypes = {
	classes: PropTypes.object.isRequired
};

const styles = (theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing.unit * 3
	},
	table: {
		minWidth: 800
	},
	tableWrapper: {
		overflowX: 'auto'
	}
});

export default withStyles(styles)(EnhancedTable);
