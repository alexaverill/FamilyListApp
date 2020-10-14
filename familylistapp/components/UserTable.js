import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
class UserTable extends React.Component{
    
    constructor(props){
        super(props);
        //{this.props.date.toDateString()}
        this.state = {users:["1S"]}
    }
    render() {
        let userTable = this.state.users.map((user)=>{
            return <h3>{user}</h3>;
        })
        return (
            <>
            {userTable}
            </>
        );
    }
}

export default UserTable;