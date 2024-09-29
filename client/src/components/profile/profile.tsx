import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import './profile.css';

const Profile = () => {

    return(

        <div className="profile-container">
            <FontAwesomeIcon className="profile-icon" icon={faUser} />
        </div>
    )
}

export default Profile;