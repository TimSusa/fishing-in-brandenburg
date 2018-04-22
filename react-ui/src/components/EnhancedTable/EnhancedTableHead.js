import React from 'react';
import PropTypes from 'prop-types';
import { TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';
import Tooltip from 'material-ui/Tooltip';

const columnData = [
	{ id: 'name', numeric: false, disablePadding: true, label: 'Gewässername' },
	{ id: 'area', numeric: true, disablePadding: false, label: 'Fläche (ha)' },
	{ id: 'community', numeric: false, disablePadding: false, label: 'Verein' },
	{ id: 'distance', numeric: true, disablePadding: false, label: 'Distanz (Luftlinie in km)' }
];

class EnhancedTableHead extends React.Component {
	render() {
		const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

		return (
			<TableHead>
				<TableRow>
					<TableCell padding="checkbox">
						<Checkbox
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={numSelected === rowCount}
							onChange={onSelectAllClick}
						/>
					</TableCell>
					
					{columnData.map((column) => {
						return (
							<TableCell
								key={column.id}
								numeric={column.numeric}
								padding={column.disablePadding ? 'none' : 'default'}
								sortDirection={orderBy === column.id ? order : false}
							>
								<Tooltip
									title="Sort"
									placement={column.numeric ? 'bottom-end' : 'bottom-start'}
									enterDelay={300}
								>
									<TableSortLabel
										active={orderBy === column.id}
										direction={order}
										onClick={this.createSortHandler(column.id)}
									>
										{column.label}
									</TableSortLabel>
								</Tooltip>
							</TableCell>
						);
					}, this)}
				</TableRow>
			</TableHead>
		);
	}

	createSortHandler = (property) => (event) => {
		this.props.onRequestSort(event, property);
	};
}

EnhancedTableHead.propTypes = {
	numSelected: PropTypes.number.isRequired,
	onRequestSort: PropTypes.func.isRequired,
	onSelectAllClick: PropTypes.func.isRequired,
	order: PropTypes.string.isRequired,
	orderBy: PropTypes.string.isRequired,
	rowCount: PropTypes.number.isRequired
};

export default EnhancedTableHead;
