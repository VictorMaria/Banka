import helper from '../helpers/helpers';

class User {
  constructor() {
    this.users = [];
    this.uniqueUserId = 0;
  }

  signUp(data) {
    this.uniqueUserId += 1;
    const hashedPassword = helper.hashPassword(data.password);
    const user = {
      id: this.uniqueUserId,
      email: (data.email).toLowerCase(),
      firstName: (data.firstName[0]).toUpperCase() + (data.firstName).slice(1).toLowerCase(),
      lastName: (data.lastName[0]).toUpperCase() + (data.lastName).slice(1).toLowerCase(),
      password: hashedPassword,
      type: 'client',
      isAdmin: false,
      isStaff: false,
      profilePhoto: '/server/uploads/ninja-avi.jpg',
    };
    this.users.push(user);
    const userToken = helper.generateToken(user.id, user.isAdmin);

    const response = {
      token: userToken,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: user.type,
      profilePhoto: user.profilePhoto,
    };
    return response;
  }

  checkForEmail(data) {
    return this.users.find(u => u.email === (data.email).toLowerCase());
  }

  signIn(data) {
    const user = this.users.find(u => u.email === (data.email).toLowerCase());
    const userToken = helper.generateToken(user.id, user.isAdmin);
    const response = {
      token: userToken,
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      type: user.type,
    };
    return response;
  }

  // eslint-disable-next-line consistent-return
  getUser(id) {
    const user = this.users.find(u => u.id === parseInt(id, 10));
    if (user) {
      return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        type: user.type,
        profilePhoto: user.profilePhoto,
      };
    }
  }

  // eslint-disable-next-line consistent-return
  quickCheck(id) {
    const user = this.users.find(u => u.id === parseInt(id, 10));
    if (user) {
      return true;
    }
  }

  uploadProfilePhoto(id, file) {
    const user = this.users.find(u => u.id === parseInt(id, 10));
    if (!file) {
      return 'Select an Image';
    }
    user.profilePhoto = file.path;
    const response = {
      id: user.id,
      email: user.email,
      profilePhoto: user.profilePhoto,
    };
    return response;
  }
}
export default new User();
