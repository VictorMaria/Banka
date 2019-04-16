import users from '../storage/users';
import helper from '../helpers/helpers';

let uniqueUserId = 2;

class User {
  static signUp(data) {
    uniqueUserId += 1;
    const hashedPassword = helper.hashPassword(data.password);
    const user = {
      id: uniqueUserId,
      email: (data.email).toLowerCase(),
      firstName: (data.firstName[0]).toUpperCase() + (data.firstName).slice(1).toLowerCase(),
      lastName: (data.lastName[0]).toUpperCase() + (data.lastName).slice(1).toLowerCase(),
      password: hashedPassword,
      type: 'client',
      isAdmin: false,
      isStaff: false,
      profilePhoto: '/server/uploads/ninja-avi.jpg',
    };
    users.push(user);
    const userToken = helper.generateToken(user.id, user.isAdmin, user.isStaff);

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

  static checkForEmail(data) {
    const user = users.find(item => item.email === (data.email).toLowerCase());
    return user;
  }

  static signIn(data) {
    const user = users.find(item => item.email === (data.email).toLowerCase());
    const userToken = helper.generateToken(user.id, user.isAdmin, user.isStaff);
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
  static getUser(id) {
    const user = users.find(item => item.id === parseInt(id, 10));
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
  static quickCheck(id) {
    const user = users.find(item => item.id === parseInt(id, 10));
    if (user) {
      return true;
    }
  }

  static uploadProfilePhoto(id, file) {
    const user = users.find(item => item.id === parseInt(id, 10));
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
export default User;
