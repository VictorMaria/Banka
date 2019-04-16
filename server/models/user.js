import users from '../storage/users';

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
}
export default User;