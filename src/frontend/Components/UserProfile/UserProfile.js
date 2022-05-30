import styles from "./UserProfile.module.css";
import { EditProfileModal } from "../Model/EditProfileModal";
import { useSelector } from "react-redux";
import { useState } from "react";

export const UserProfile = () => {
  const [editprofile, SetEditProfile] = useState(false);
  const {
    data: { user },
  } = useSelector((state) => state.auth);

  return (
    <div className={`flex flex-column ${styles.profile_box} width-80`}>
      <img
        className="avatar avatar-l avatar-img-square"
        src="https://picsum.photos/200"
        alt="badge-1"
      />
      <div className="profile_name">Rahul Shukla</div>
      <button
        className="btn btn-primary"
        onClick={() => SetEditProfile(!editprofile)}
      >
        Edit Profile
      </button>
      <p className={`${styles.profile_description} mt-xs`}>
        Software Engineer || Youtuber || Neog Member || Bloger || Helper ||
        Doctor
      </p>
      <p className={`${styles.profile_url} mt-xs`}>rahulcs754.vercel.com</p>
      <div className={` flex flex-row mt-m ${styles.user_details}  width-70`}>
        <div className="flex flex-column align-item">
          <span>0</span>
          <span>Following</span>
        </div>
        <div className="flex flex-column align-item">
          <span>0</span>
          <span>Posts</span>
        </div>
        <div className="flex flex-column align-item">
          <span>3K</span>
          <span>Followers</span>
        </div>
      </div>
      {editprofile ? <EditProfileModal /> : null}
    </div>
  );
};
