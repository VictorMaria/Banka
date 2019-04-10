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
}
export default new User();
