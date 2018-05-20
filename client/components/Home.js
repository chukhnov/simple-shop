import { connect } from 'react-redux'
import classNames from 'classnames';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import styled from 'styled-components';
import logo from '../images/logo.png'
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import PhoneIcon from '@material-ui/icons/Call';

const styles = theme => ({
    color:"#877874",
    cssRoot: {
        color: theme.palette.getContrastText('#0099a8'),
        backgroundColor: '#0099a8',
        '&:hover': {
        backgroundColor: '#00b0c2'
        }
    },
    flex: {
      flex: 1,
    }
})

const LogoContainer = styled.div`
    background: url(${logo}) no-repeat;
    background-size: contain;
    background-position: center;
    width: 150px;
    height: 150px;
`
const ButtonsSection = styled.div`
    background: #0099a8;
    display: flex;
    flex-direction: row;
    justify-content: center;
`

const PhoneSection = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
`
const PhoneNumbersWrap = styled.div`
    color: #877874;
    font-size: 1.5rem;
    font-family: Roboto, sans-serif;
    display: flex;
    flex-direction: column;
    margin: 0 30px;
`

function TopAppBar(props) {
  const { 
      classes,
      firstPhone,
      secondPhone
    } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
            <LogoContainer/>
            <Typography className={classes.flex}/>
            <PhoneSection>
                <PhoneIcon style={{ fontSize: 50, color: '#0099a8' }}/>
                <PhoneNumbersWrap>
                    <span>
                        {firstPhone}
                    </span>
                    <span>
                        {secondPhone}
                    </span>
                </PhoneNumbersWrap>    
            </PhoneSection>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function ButtonContainer(props) {
    const { classes } = props;
    return <Button 
            color="primary" 
            className={classNames(classes.cssRoot)}
            >
            Кнопка
    </Button>
  }

TopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

class Home extends Component {



    render () {
        const AppBarComponent = withStyles(styles)(TopAppBar)
        const ButtonComponent = withStyles(styles)(ButtonContainer)
        const firstPhone = '+7 (950) 311-71-15'
        const secondPhone = '+7 (950) 312-71-15'
        return <div>
            <AppBarComponent firstPhone={firstPhone} secondPhone={secondPhone}/>
                <ButtonsSection>
                    <ButtonComponent/>
                    <ButtonComponent/>
                    <ButtonComponent/>
                    <ButtonComponent/>
                    <ButtonComponent/>
                </ButtonsSection>
            </div>
    }
}

export default connect()(Home)