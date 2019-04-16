const users = [
  {
    id: 0,
    email: 'sophie.kamali@outlook.com',
    firstName: 'Sophie',
    lastName: 'Kamali',
    type: 'admin',
    isAdmin: false,
    isStaff: false,
    profilePhoto: '/server/uploads/ninja-avi.jpg',
    password: '$2b$08$sXQtm78J3yyWbgZNVCmhseewTRMUXcQ07OP9ZeAWlyD2DbwrqBvEq',
  },
  {
    id: 1,
    email: 'john.kamali@outlook.com',
    firstName: 'John',
    lastName: 'Kamali',
    type: 'admin',
    isAdmin: true,
    isStaff: false,
    profilePhoto: '/server/uploads/ninja-avi.jpg',
    password: '$2b$08$sXQtm78J3yyWbgZNVCmhseewTRMUXcQ07OP9ZeAWlyD2DbwrqBvEq',
  },
  {
    id: 2,
    email: 'fatima.kamali@outlook.com',
    firstName: 'Fatima',
    lastName: 'Kamali',
    type: 'staff',
    isAdmin: false,
    isStaff: true,
    profilePhoto: '/server/uploads/ninja-avi.jpg',
    password: '$2b$08$sXQtm78J3yyWbgZNVCmhseewTRMUXcQ07OP9ZeAWlyD2DbwrqBvEq',
  },
];

export default users;
