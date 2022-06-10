import styles from "./UserProfile.module.css";
import { EditProfileModal } from "../Model/EditProfileModal";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUserPost } from "store/postSlice";
import { editProfile } from "store/authSlice";
import { BiEdit } from "react-icons/bi";
import { toast } from "react-toastify";
import { allUsereditProfile, editUser } from "store/userSlice";

export const UserProfile = () => {
  const dispatch = useDispatch();
  const [editprofileState, SetEditProfileState] = useState(false);
  const {
    data: { user: live, userToken },
  } = useSelector((state) => state.auth);

  useEffect(() => {
    (() => {
      dispatch(
        getUserPost({ username: live.username, authorization: userToken })
      );
    })();
  }, []);

  const uploadImage = async (image) => {
    if (Math.round(image.size / 1024000) > 2)
      toast.warning("Image cannot exceed 2mb");
    else {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_API_KEY);
      const requestOptions = {
        method: "POST",
        body: data,
      };
      await fetch(
        "https://api.cloudinary.com/v1_1/rahulcs754/image/upload",
        requestOptions
      )
        .then((response) => response.json())
        .then((json) => {
          dispatch(
            editProfile({
              profileImg: json.url,
            })
          );
          dispatch(allUsereditProfile({ profileImg: json.url, id: live._id }));
          editUser(live);
        })
        .catch((error) => {
          toast.warning(error);
        });
    }
  };

  return (
    <div className={`flex  ${styles.profile_box} width-80`}>
      <div className={styles.profile_img}>
        <img
          className="avatar avatar-l avatar-img-square"
          src={live.pic}
          alt="badge-1"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "https://picsum.photos/200";
          }}
        />
        <input
          type="file"
          id="profileImg"
          className={styles.profile_input_img}
          onChange={(e) => uploadImage(e.target.files[0])}
        />
        <label htmlFor="profileImg">
          <BiEdit className={styles.profile_icon_edit} />
        </label>
      </div>
      <div className="profile_name">@{live.username} </div>
      <button
        className="btn btn-primary"
        onClick={() => SetEditProfileState(!editprofileState)}
      >
        Edit Profile
      </button>
      <p className={`${styles.profile_description} mt-xs`}>{live.bio}</p>
      <p className={`${styles.profile_url} mt-xs`}>{live.link}</p>
      <div className={` flex flex-row ${styles.user_details}  width-70`}>
        <div className="flex flex-column align-item">
          <span>{live.following.length === 0 ? 0 : live.following.length}</span>
          <span>Following</span>
        </div>
        <div className="flex flex-column align-item">
          <span>0</span>
          <span>Posts</span>
        </div>
        <div className="flex flex-column align-item">
          <span>{live.followers.length === 0 ? 0 : live.followers.length}</span>
          <span>Followers</span>
        </div>
      </div>
      {editprofileState ? (
        <EditProfileModal setModal={SetEditProfileState} />
      ) : null}
    </div>
  );
};
