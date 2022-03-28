import {useContext, useState, useEffect} from 'react';
import {MediaContext} from '../contexts/MediaContext';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/variables';

const Profile = () => {
  const [user] = useContext(MediaContext);
  const [avatar, setAvatar] = useState({
    filename: 'https://placekitten.com/320',
  });
  const {getTag} = useTag();

  const fetchAvatar = async () => {
    const avatars = await getTag('avatar_' + user.user_id);
    setAvatar(avatars.pop());
  };
  useEffect(() => {
    fetchAvatar(user);
  }, [user]);

  return (
    <>
      <h1>Profile</h1>
      {user && (
        <ul>
          <li>
            <img src={mediaUrl + avatar.filename} alt={user.username} />
          </li>
          <li>{user.username}</li>
          <li>{user.email}</li>
          <li>{user.full_name}</li>
        </ul>
      )}
    </>
  );
};

export default Profile;
