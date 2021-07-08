import { Grid, Image, Header, Icon, Dropdown } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './userinfo.css'
import firebase from '../../../server/firebase';

const UserInfo = (props) => {
    
    const getDropdownOptions = () => {
        return [{
            key: 'signout',
            text: <span onClick={signOut}>Sign Out</span>
        }]
    }

    const signOut = () => {
        firebase.auth()
            .signOut()
            .then(() => console.log('User Signed Out'));
    }
    
    if (props.user) {
        
        return (
            <Grid>
                <Grid.Column>
                    <Grid.Row className='userinfo-grid-row'>
                        <Header inverted as='h2'>
                            <Icon name='slack' />
                            <Header.Content>MySlack</Header.Content>
                        </Header>
                        <Header className='userinfo-displayname' inverted as='h4'>
                            <Dropdown trigger={
                                <span>
                                    <Image src={props.user.photoURL} avatar></Image>
                                    {props.user.displayName}
                                </span>
                            } options={getDropdownOptions()}>

                            </Dropdown>

                        </Header>
                    </Grid.Row>
                </Grid.Column>
            </Grid>
        )
    }
    else return null;
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(UserInfo);