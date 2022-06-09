import {
  VscHome,
  VscRemoteExplorer,
  VscBookmark,
  VscBell,
  VscSmiley,
} from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
export const SidebarMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="left-part m-s">
      <div>
        <ul className="list">
          <li className="list-item" onClick={() => navigate("/")}>
            <VscHome size={20} />
            Home
          </li>
          <li className="list-item" onClick={() => navigate("/explore")}>
            <VscRemoteExplorer size={20} />
            Explore
          </li>
          <li className="list-item">
            <VscBookmark size={20} />
            Bookmarks
          </li>
          <li className="list-item">
            <VscBell size={20} />
            Notifications
          </li>
          <li className="list-item " onClick={() => navigate("/profile")}>
            <VscSmiley size={20} />
            Profile
          </li>
        </ul>
      </div>
    </div>
  );
};
