export type SendOtpByBvnAttributes = {
  bvn: string;
  purpose: string;
  deviceId: string;
  deviceModel: string;
};

export type SendOtpByBvnResponse = {
  bvn: string;
  firstName: string;
  middleName: string;
  lastName: string;
  dateOfBirth: string;
  phoneNumber: string;
  registrationDate: null;
  enrollmentBank: null;
  watchListed: string;
  phoneNumber1: string;
  phoneNumber2: string;
  enrollmentBranch: null;
  email: string;
  gender: string;
  levelOfAccount: null;
  lgaOfOrigin: string;
  lgaOfResidence: string;
  maritalStatus: string;
  nin: string;
  nameOnCard: null;
  nationality: string;
  residentialAddress: string;
  stateOfOrigin: string;
  stateOfResidence: string;
  title: string;
  referenceId: string;
};

type ValidateOtp = {
  PhoneNo?: string;
  OtpToken: string;
  Email?: string;
  ReferenceId: string;
};

export type ValidateOtpAttributes = ValidateOtp &
  Required<Pick<ValidateOtp, 'Email' | 'PhoneNo'>>;

export type Document = {
  documentName: string;
  documentFileData: string;
  documentType: number;
  documentNumber: string;
  issueAuthority: string;
  countryOfIssue: string;
  placeOfIssue: string;
  issueDate: string;
  expiryDate: string;
  fileExtension: string;
};

export type Address = {
  address: string | null;
  streetName: string | null;
  houseNumber: string | null;
  postalCode: string | null;
  city: string | null;
  town: string | null;
  state: string | null;
  country: string | null;
  addressType: string | null;
};

export type CreateAccountAndProfileForUserAttributes = {
  emailAddress: string;
  referralCode?: string;
  firstName: string;
  lastName: string;
  middleName: string;
  phoneNo: string;
  gender: string;
  dateOfBirth: string | Date;
  maritalStatus: string;
  isStaff: boolean;
  nationality: string;
  title: string;
  bvn: string;
  accountType: number;
  documents?: Document[]; // Optional
  addresses?: Address[]; // Optional
  requestId: string;
  smsAlert: boolean;
  productId: string;
  deviceId: string;
  deviceModel: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  pin: string;
  confirmPin: string;
  createdBy: string;
};

export type CreateAccountAndProfileForUserResponse = {
  nuban: string | null;
  dateCreated: string; // Assuming this is in ISO date-time format
  accountName: string | null;
  customerId: string | null;
  requestId: string | null;
};

export type ResendOtpAttributes = {
  referenceId: string;
};

export type ResendOtpResponse = {
  phoneNumber: string;
  isEnabled: boolean;
  isUsed: boolean;
  referenceId: string;
};

export type SendOtpByAccountNumberAndDobAttributes = {
  accountNumber: string;
  deviceId: string;
  deviceModel: string;
  dateOfBirth: string | Date;
};

export type SendOtpByAccountNumberAndDobResponse = {
  referenceId: string;
  phoneNumber: string;
  email: string;
};

export type CreateCustomerProfileAttributes = {
  deviceId: string;
  deviceModel: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  pin: string;
  confirmPin: string;
  createdBy: string;
  smsAlert: boolean;
  accountNumber?: string; // Optional property
};

export type LogUserInAttributes = {
  deviceid: string;
  username?: string;
  email: string;
  password: string;
};

export type LogUserInResponse = {
  email: string | null;
  username: string | null;
  deviceId: string | null;
  cifid: string | null;
  fullName: string | null;
  accessToken: string | null;
  refreshToken: string | null;
};

export type ValidateResetPasswordAttributes = {
  deviceId: string;
  emailAddress: string;
  transactionPin: string;
};

export type ResetPasswordAttributes = {
  deviceId: string;
  emailAddress: string;
  temporalPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  transactionPin: string;
};

export type SendOtpForPasswordResetAttribute = {
  email: string;
  phoneNumber: string;
  transactionPin: string;
};

export type SendOtpForPasswordResetResponse = string;

export type ValidateOtpFromPasswordResetAttribute = {
  PhoneNo: string;
  OtpToken: string;
  Email: string;
  ReferenceId: string;
};

export type ChangePasswordAttribute = {
  deviceid: string;
  accessToken: string;
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  transactionPin: string;
};

export type ErrorResponse = {
  errorMsg: string;
  errorCode: string;
};

export type SendOtpForDeviceChangeAttributes = {
  deviceId: string;
  deviceModel: string;
  accountNumber: string;
  password: string;
};

export type SendOtpForDeviceChangeResponse = {
  ReferenceId: string | null;
  SessionId: string | null;
};

export type ChangeDeviceAttributes = {
  AccountNumber: string;
  ReferenceId: string;
  SessionId: string;
  Otp: string;
  DeviceId: string;
  DeviceModel: string;
};

export type ChangeDeviceResponse = LogUserInResponse;
