import React from 'react';
import PropTypes from 'prop-types';
import Input from 'material-ui/Input'
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import withRoot from '../withRoot';

import TableEnhaced from '../components/EnhancedTable/'
import { getNamesAndAreas } from './../angel-radar'

class Index extends React.Component {
  startVal = '100'
  state = {
    limitAreaValue: this.startVal,
    data: getNamesAndAreas(this.startVal)
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Typography variant="display1" gutterBottom>
          DAV Angelgewässer Brandenburg
        </Typography>
        <Typography variant="subheading" gutterBottom>
          Sortierung nach Name:
        </Typography>
        <Input
        placeholder="Name hier eingeben"
          defaultValue={''}
          inputProps={{
            'aria-label': 'Name hier eingeben',
          }}
          onChange={this.handleChange}
          name='inputName'
        />
        <br/>
        <br/>
        
        <Typography variant="subheading" gutterBottom>
          Sortierung nach Fläche (ha):
        </Typography>
        <Input
          defaultValue={this.state.limitAreaValue}
          inputProps={{
            'aria-label': 'Fläche hier eingeben',
          }}
          onChange={this.handleChange}
          name='inputArea'
        />
        <Typography variant="subheading" gutterBottom>
          Gesamt: {this.state.data.length}
        </Typography>
        <TableEnhaced data={this.state.data}/>
      </div>
    );
  }

  handleChange = (e) => {
    if (e.target.name === 'inputArea') {
      var data = getNamesAndAreas(e.target.value) 
      this.setState({data, limitAreaValue: e.target.value})
      
    }
    if (e.target.name === 'inputName') {
      const data = getNamesAndAreas(this.state.limitAreaValue)
        .filter( item => {
          return item.name.includes(e.target.value)
        })
      this.setState({
        data
      })
    }
    
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
  },
});

export default withRoot(withStyles(styles)(Index));
