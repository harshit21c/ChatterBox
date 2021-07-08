import React, { useState } from 'react';
import {Grid, Segment, Form, Icon, Header, Button, Message} from 'semantic-ui-react';
import firebase from '../../../server/firebase';
import {Link} from 'react-router-dom';
import '../auth.css'

const Login = () => {
    
    const user = {
        userName: '',
        email: '',
        password: '',
        confirmpassword: ''
    }

    const errors = [];

    const [userState, setUserState] = useState(user);
    const [errorState, setErrorState] = useState(errors);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (event) => {
        let target = event.target;
        setUserState((currState) => {
            let currUser = {...currState};
            currUser[target.name] = target.value;
            return currUser;
        })
    }

    const onSubmit = (event) => {
        setErrorState(() => []);
        if(checkForm()){
            setIsLoading(true);
            firebase.auth()
                .signInWithEmailAndPassword(userState.email, userState.password)
                .then((createdUser) => {
                    setIsLoading(false);
                    console.log(createdUser);
                })
                .catch((serverError) => {
                    setIsLoading(false);
                    setErrorState((error) => error.concat(serverError));
                })
        }
        
    }

    const checkForm = () => {
        if(isFormIncomplete()){
            setErrorState((error) => error.concat({message: "Please fill in all the fields!"}));
            return false;
        }
        // if(!checkPassword()){
        //     return false
        // }
        return true;
    }

    const isFormIncomplete = () => {
        return userState.email==='' || userState.password==='';
    }

    // const checkPassword = () => {
    //     if(userState.password.length <8){
    //         setErrorState((error) => error.concat({message: "Password length should be greater than 8"}));
    //         return false;
    //     }
    //     else if(userState.password !== userState.confirmpassword){
    //         setErrorState((error) => error.concat({message: "Password and Confirm Password does not match"}));
    //         return false;
    //     }
    //     return true;
    // }

    const formatErrors = () => {
        return errorState.map((error, index) => <p key={index}>{error.message}</p>);
    }
    
    return(
        <Grid verticalAlign="middle" textAlign="center" className='grid-form'>
            <Grid.Column style={{maxWidth: '500px'}}>
                <Header icon as='h2'>
                    <Icon name='slack' />
                    Login
                </Header>
                <Form onSubmit={onSubmit}>
                    <Segment stacked>
                        <Form.Input 
                            name="email"
                            value={userState.email}
                            icon="mail"
                            iconPosition="left"
                            onChange={handleChange}
                            type="text"
                            placeholder="Email"
                        />

                        <Form.Input 
                            name="password"
                            value={userState.password}
                            icon="lock"
                            iconPosition="left"
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                        /> 
                    </Segment> 
                    <Button disabled={isLoading} loading={isLoading}>Submit</Button>
                </Form>

                {errorState.length>0 && <Message error>
                    <h3>Errors</h3>
                    {formatErrors()}
                </Message>}

                <Message>
                    Not an user? <Link to='/register'>Register</Link>
                </Message>
            </Grid.Column>
        </Grid>
    );
}

export default Login;