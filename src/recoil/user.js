import { atom } from "recoil";

const DefaultUserState = {
  id: 0,
  username: '',
  name: '',
  email: '',
  image: '',
};

const UserState = atom({
  key: 'UserState',
  default: DefaultUserState,
});

export default UserState;