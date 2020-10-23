import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {getUsername} from '../utils/session'
import Container from 'react-bootstrap/Container';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username:""}
    }
    componentDidMount(){
        this.setState({username:getUsername()})
    }
    render() {
        
        //let name ="";
        let showLogin = false;
        if(this.state.username == null || this.state.username.length <=0){
            showLogin = true;
        }
        return (
            
            <Navbar expand="lg">
                <Container>
                <Navbar.Brand href="/">List App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="" className="justify-content-end">
                    {/* <Nav className="mr-auto">
                        <Nav.Link href="/">Events</Nav.Link>
                        <Nav.Link href="/">Link</Nav.Link>
                    </Nav> */}
                    <Nav>
                        {showLogin ? <Nav.Link href="/login">Login</Nav.Link>:
                        <NavDropdown title={this.state.username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="logout">Logout</NavDropdown.Item>
                        </NavDropdown>}
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
}
export default Navigation;