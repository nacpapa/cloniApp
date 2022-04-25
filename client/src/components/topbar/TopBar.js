import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';
import './topbar.css';

export default function TopBar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };
  return (
    <div className="top">
      <div className="topCenter">
        {user ? (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/">
                Home
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/write">
                New post
              </Link>
            </li>
          </ul>
        ) : (
          <></>
        )}
      </div>
      <div className="topRight">
        {user ? (
          <>
            <img
              className="topImg"
              src="https://media-exp1.licdn.com/dms/image/C4D0BAQG2wy9sAHXb6w/company-logo_200_200/0/1617976670549?e=2147483647&v=beta&t=IYdkEARR3Wtpv0E0KsoYRotzNs2Qw6krzIttl-kKGsI"
              alt=""
            />
            <ul className="topList">
              <li className="topListItem" onClick={handleLogout}>
                {user && 'LOGOUT'}
              </li>
            </ul>
          </>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
