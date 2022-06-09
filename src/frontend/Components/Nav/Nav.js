import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { Menu } from "./Menu";
import { useSelector } from "react-redux";
import styles from "./Nav.module.css";

export const Nav = () => {
  const [showmenu, setShowmenu] = useState(false);
  const { isLogged } = useSelector((state) => state.auth);

  return (
    <>
      <div className="rs-row">
        <div className="col-12">
          <header className={`header ${styles.header_update}`}>
            <h1 className="header-logo">
              <Link to="/">Connect</Link>
            </h1>
            {isLogged ? (
              <ul className={`header-nav ${styles.header_nav_reset}`}>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active_url" : "normal"
                    }
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "active_url" : "normal"
                    }
                    to="/explore/all"
                  >
                    Explore
                  </NavLink>
                </li>

                <li>
                  <div className="badge" onClick={() => setShowmenu(!showmenu)}>
                    <img
                      className="badge-img profile_icon_size"
                      src="https://picsum.photos/200"
                      alt="badge-1"
                    />
                    <div className="badge-item badge-online"></div>
                  </div>
                </li>
              </ul>
            ) : null}
          </header>
          {showmenu ? <Menu /> : null}
        </div>
      </div>
    </>
  );
};
