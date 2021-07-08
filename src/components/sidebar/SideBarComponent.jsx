import { Menu } from "semantic-ui-react";
import './sidebar.css';
import UserInfoComponent from "./userinfo/UserInfoComponent";
import Channels from "./channels/ChannelsComponent";

const SideBar = () => {
    return(
        <Menu vertical fixed='left' borderless size='large' className='side-bar'>
            <UserInfoComponent/>
            <Channels/>
        </Menu>
    );
}

export default SideBar;