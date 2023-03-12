interface User {
  id?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  password?: string;
  lastName?: string;
  firstName?: string;
  dateOfBirth?: string;
  verified?: boolean;
  apiKeySecret?: string;
}

export default User;
