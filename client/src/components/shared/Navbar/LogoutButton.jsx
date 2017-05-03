import '../../../css/LogoutButton.css';

const LogoutButton = () => (
  <input id='LogoutButton' className='btn btn-blue' type="button" value="Logout"
  onClick={ () => {
    window.location.href = '/logout';
  }
  } />
);

export default LogoutButton;
