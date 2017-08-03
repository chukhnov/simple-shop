import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'


class App extends Component {

    render() {
        const styles = {
            wellStyles: {
                maxWidth: 400, margin: '0 auto 10px', textAlign: 'center'
            },
            texts: {
                fontSize: '20px'
            },
            textArea: {
                marginTop: '12px',
                height: '35px',
                textAlign: 'center'
            }
        };


        return (
            <div>
                <form className="well" style={styles.wellStyles}>
                <span style={styles.texts}>Please Log In, or&nbsp;
                </span>
                <div>
                    <input style={styles.textArea} type='text' ref='username' defaultValue="admin"/>
                </div>
                <div>
                    <input style={styles.textArea} type='password' ref='password' defaultValue="admin"/>
                </div>
                <div>
                    <br/>
                    <Button type="submit" bsStyle="primary" bsSize="small" onClick={(e) => this.handleClick(e)}>
                        Login
                    </Button>
                </div>
            </form>
            </div>
        )
    }

    handleClick(e) {
        e.preventDefault();
        const username = this.refs.username;
        const password = this.refs.password;
        const dataUsername = username.value.trim();
        const dataPassword = password.value.trim();
        const obj = {
            username: dataUsername,
            password: dataPassword
        };
        this.props.onLoginClick(obj);
        username.value = '';
        password.value = '';

    }
}

export default connect()(App)