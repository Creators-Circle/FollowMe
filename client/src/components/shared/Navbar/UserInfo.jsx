import { connect } from 'react-redux';
import '../../../css/UserInfo.css';

const UserInfo = ({ user }) => (
      <span id='userInfo'>
        <img id='profilePic' src={user.avatar} />
      </span>
    );

const mapStatetoProps = ({ user }) => {
  return {
    user
  };
};

export default connect(mapStatetoProps)(UserInfo);
