import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
//import {claimItem, unclaimItem, getUser} from './API';
import {getID, getKey} from '../utils/session'
import {AuthGetRequest, AuthPostRequest} from '../utils/api';
import Popover from 'react-bootstrap/Popover';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import styles from '../styles/reset.password.module.css'
class ResetPassword extends React.Component {
    constructor(props){
        super(props);
        this.state={inEdit:false}
    }


    render() {
        const resetPopover = (<Popover  className={styles.ResetPassword} id="resetpassword">
            
        <Popover.Content>
        <Form onSubmit={(e)=>{
            e.preventDefault();
            this.props.onFinish(e,this.props.id); 
            document.body.click();
            }
        }>
                    <Row>
                        <Col sm="8">
                            <Form.Control type="text" name="password" placeholder="New Password" maxLength="100" onChange={(e)=>this.props.onChangeHandle(e,this.props.id)} />
                        </Col>
                    <Col sm="4">
                    <Button variant="primary" sm="4" type="submit">
                        Save
                    </Button>
                    </Col>
                    </Row>
                </Form>
        </Popover.Content>
    </Popover>);
        return <div>
                <OverlayTrigger trigger="click"  rootClose placement="bottom" overlay={resetPopover}>
                    <Button>Reset Password</Button>
                </OverlayTrigger>
                
            </div>
        
    }
}
export default ResetPassword;