import React, { useState } from 'react';
import './channels.css';
import { connect } from 'react-redux';
import { Menu, Icon, Form, Segment, Modal, Button } from 'semantic-ui-react';
import firebase from '../../../server/firebase';

const Channels = (props) => {

    const [modalOpenState, setModalOpenState] = useState(false);
    const [channelDetails, setChannelDetails] = useState({ name: '', description: '' });
    const [isLoading, setIsLoading] = useState(false);

    const channelCollectionRef = firebase.database().ref('channels');

    const onSubmit = () => {
        if(checkModalForm()){
            //can log a error mesage to the scren
            return;
        }
        
        const key = channelCollectionRef.push().key;

        const channel = {
            id: key,
            name: channelDetails.name,
            description: channelDetails.description,
            createdBy: {
                name: props.user.displayName,
                avatar: props.user.photoURL
            }
        }

        setIsLoading(true);
        channelCollectionRef.child(key)
        .update(channel)
        .then(() => {
            setChannelDetails({ name: '', description: '' });
            setModalOpenState(false);
            setIsLoading(false);
        })
        .catch((err) => {
            setIsLoading(false);
            console.log(err);
        })
    }

    const checkModalForm = () => {
        return !channelDetails.name.length || !channelDetails.description.length;
    }

    const handleChange = (e) => {
        const target = e.target;
        setChannelDetails((currentDetails) => {
            let details = {...currentDetails};
            details[target.name] = target.value;
            return details;
        })
    }

    const openModal = () => {
        setModalOpenState(true);
    }

    const closeModal = () => {
        setModalOpenState(false);
    }


    return <>
        <Menu.Menu>
            <Menu.Item>
                <span>
                    <Icon name='exchange' /> Channels
                </span>
                (0)
            </Menu.Item>
            <Menu.Item>
                <span onClick={openModal}>
                    <Icon name='add' /> ADD

                </span>
            </Menu.Item>
        </Menu.Menu>

        <Modal open={modalOpenState} onClose={closeModal}>
            <Modal.Header>
                Create Channel
            </Modal.Header>
            <Modal.Content>
                <Form>
                    <Segment stacked>
                        <Form.Input
                            name="name"
                            value={channelDetails.name}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Channel Name"
                        />

                        <Form.Input
                            name="description"
                            value={channelDetails.description}
                            onChange={handleChange}
                            type="text"
                            placeholder="Enter Channel Description"
                        />
                    </Segment>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button disabled={isLoading} loading={isLoading} onClick={onSubmit}>
                    <Icon name='checkmark' /> Save
                </Button>
                <Button onClick={closeModal}>
                    <Icon name='remove' /> Cancel
                </Button>
            </Modal.Actions>
        </Modal>

    </>
}

const mapStateToProps = (state) => {
    return {
        user: state.user.currentUser
    }
}

export default connect(mapStateToProps)(Channels);