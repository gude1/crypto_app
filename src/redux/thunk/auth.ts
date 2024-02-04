import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {
  ChangeDeviceAttributes,
  ChangeDeviceResponse,
  ChangePasswordAttribute,
  CreateAccountAndProfileForUserAttributes,
  CreateAccountAndProfileForUserResponse,
  CreateCustomerProfileAttributes,
  ErrorResponse,
  LogUserInAttributes,
  LogUserInResponse,
  ResendOtpAttributes,
  ResendOtpResponse,
  ResetPasswordAttributes,
  SendOtpByAccountNumberAndDobAttributes,
  SendOtpByAccountNumberAndDobResponse,
  SendOtpByBvnAttributes,
  SendOtpByBvnResponse,
  SendOtpForDeviceChangeAttributes,
  SendOtpForDeviceChangeResponse,
  SendOtpForPasswordResetAttribute,
  SendOtpForPasswordResetResponse,
  ValidateOtpAttributes,
  ValidateOtpFromPasswordResetAttribute,
  ValidateResetPasswordAttributes,
} from '../types/auth';
import {
  Console,
  decryptWithAES256,
  encryptWithAES256,
  getAuthBaseUrl,
  getBaseUrl,
  returnDecryptedError,
} from '../../utils';
import {Response} from '../types';
import {RootState} from '../store/store';
import {ERROR_CODE_TYPES} from '../../constants/error';

export const sendOtpByBvn = createAsyncThunk<
  SendOtpByBvnResponse,
  SendOtpByBvnAttributes
>('opti2.0/sendOtpByBvn', async (param, thunkApi) => {
  try {
    Console.log('dev', __DEV__);

    const result = await axios.post(
      `${getAuthBaseUrl()}/otp/bvn`,
      {
        data: encryptWithAES256(JSON.stringify(param)).encryptedText,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue(data.ResponseMessage);
    }

    let res_data = data.Data as SendOtpByBvnResponse;
    Console.info('data', res_data);
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('param-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});

export const validateOtp = createAsyncThunk<String, ValidateOtpAttributes>(
  'opti2.0/validateOtp',
  async (param, thunkApi) => {
    try {
      const result = await axios.post(
        `${getAuthBaseUrl()}/otp/bvn-validation`,
        {
          data: encryptWithAES256(JSON.stringify(param)).encryptedText,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      let decrypted_string = decryptWithAES256(result.data).decryptedText;
      if (!decrypted_string) {
        return thunkApi.rejectWithValue(
          'Something went wrong please try again',
        );
      }
      let data = JSON.parse(decrypted_string) as Response;

      if (data.ResponseCode != '00') {
        return thunkApi.rejectWithValue(data.ResponseMessage);
      }

      return thunkApi.fulfillWithValue('Otp validated successfully!');
    } catch (err) {
      Console.log('validateOtp err-----', param);
      return thunkApi.rejectWithValue(returnDecryptedError(err));
    }
  },
);

export const resendOtp = createAsyncThunk<
  ResendOtpResponse,
  ResendOtpAttributes
>('opti2.0/resendOtp', async (param, thunkApi) => {
  try {
    const result = await axios.post(
      `${getAuthBaseUrl()}/resend-otp`,
      {
        data: encryptWithAES256(JSON.stringify(param.referenceId))
          .encryptedText,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }

    let data = JSON.parse(decrypted_string) as Response;
    let res_data = data.Data as ResendOtpResponse;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue(data.ResponseMessage);
    }

    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('resendOtp err-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});

export const createAccountAndProfileForUser = createAsyncThunk<
  CreateAccountAndProfileForUserResponse,
  CreateAccountAndProfileForUserAttributes
>('opti2.0/createAccountAndProfileForUser', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    Console.log('createAccountAndProfileForUser encrypyed', d);
    const result = await axios.post(
      `${getBaseUrl()}/onboarding/create-customer-account`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue(data.ResponseMessage);
    }

    let res_data = data.Data as CreateAccountAndProfileForUserResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('createAccountAndProfileForUser err-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});

export const sendOtpByAccountNumberAndDob = createAsyncThunk<
  SendOtpByAccountNumberAndDobResponse,
  SendOtpByAccountNumberAndDobAttributes
>('opti2.0/sendOtpByAccountNumberAndDob', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    const result = await axios.post(
      `${getAuthBaseUrl()}/otp/send-by-dob`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue(
        data.ResponseMessage || 'Request failed please try again',
      );
    }

    let res_data = data.Data as SendOtpByAccountNumberAndDobResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('sendOtpByAccountNumberAndDob err-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});

export const createCustomerProfile = createAsyncThunk<
  String,
  CreateCustomerProfileAttributes
>('opti2.0/createCustomerProfile', async (param, thunkApi) => {
  try {
    console.log('createCustomerProfile', param);
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    console.log('createCustomerProfile', d);
    const result = await axios.post(
      `${getBaseUrl()}/onboarding/create-customer`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );
    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (!data) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue(
        data.ResponseMessage || 'Request failed please try again',
      );
    }
    return thunkApi.fulfillWithValue(data.ResponseMessage);
  } catch (err) {
    Console.log('createCustomerProfile err-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});

export const logUserIn = createAsyncThunk<
  LogUserInResponse,
  LogUserInAttributes,
  {rejectValue: ErrorResponse}
>('opti2.0/logUserIn', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    Console.log('----logUserIn encrypted---', d);
    const result = await axios.post(
      `${getAuthBaseUrl()}/login`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    Console.log(
      'logUserIn---decrypted err---',
      decryptWithAES256(result.data).error,
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue({
        errorCode: ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: 'Something went wrong please try again',
      });
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue({
        errorCode: data.ResponseCode || ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: data.ResponseMessage || 'Request failed please try again',
      });
    }

    let res_data = data.Data as LogUserInResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('---logUserIn err1 ----', param);
    let error = returnDecryptedError(err, true);
    let errobj = {
      errorCode: '',
      errorMsg: '',
    };
    if (typeof error == 'object') {
      errobj.errorCode = error.responseCode;
      errobj.errorMsg = error.responseMessage;
    } else {
      errobj.errorCode = ERROR_CODE_TYPES['GENERAL_ERROR'];
      errobj.errorMsg = error;
    }
    return thunkApi.rejectWithValue(errobj);
  }
});

export const validateResetPassword = createAsyncThunk<
  String,
  ValidateResetPasswordAttributes
>('opti2.0/validateResetPassword', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    Console.log('validateResetPassword encrypted', d);
    const result = await axios.post(
      `${getAuthBaseUrl()}/send-reset-password`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue(
        data.ResponseMessage || 'Request failed please try again',
      );
    }

    return thunkApi.fulfillWithValue(
      'A temporal password has been sent to your email and phone number',
    );
  } catch (err) {
    Console.log('validateResetPassword err-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});

export const sendOtpForPasswordReset = createAsyncThunk<
  SendOtpForPasswordResetResponse,
  SendOtpForPasswordResetAttribute
>('opti2.0/sendOtpForPassReset', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    Console.log('sendOtpForPasswordReset encrypted', d);
    const result = await axios.post(
      `${getAuthBaseUrl()}/send-forget-password-otp`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }
    let data = JSON.parse(decrypted_string) as Response;
    Console.log('sendOtpForPasswordReset data', data);

    let res_data = data.Data as SendOtpForPasswordResetResponse;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue(
        data.ResponseMessage || 'Request failed please try again',
      );
    }

    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('sendOtpForPasswordReset err-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});

export const validateOtpFromPasswordReset = createAsyncThunk<
  String,
  ValidateOtpFromPasswordResetAttribute
>('opti2.0/validateOtpFromPasswordReset', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    Console.log('validateOtpFromPasswordReset encrypted', d);
    Console.log('validateOtpFromPasswordReset data', param);

    const result = await axios.post(
      `${getAuthBaseUrl()}/send-reset-password`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }

    let data = JSON.parse(decrypted_string) as Response;

    if (!data) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue(
        data.ResponseMessage || 'Request failed please try again',
      );
    }

    return thunkApi.fulfillWithValue(
      data.ResponseMessage ||
        'Otp validated successfully, a temporal password has been sent to your email and phone number!',
    );
  } catch (err) {
    Console.log('validateOtpFromPasswordReset err-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});

export const resetPassword = createAsyncThunk<String, ResetPasswordAttributes>(
  'opti2.0/resetPassword',
  async (param, thunkApi) => {
    try {
      let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
      Console.log('resetPassword encrypted', d);
      const result = await axios.post(
        `${getAuthBaseUrl()}/reset-password`,
        {
          data: d,
        },
        {
          headers: {
            Accept: 'application/json',
          },
        },
      );

      let decrypted_string = decryptWithAES256(result.data).decryptedText;
      if (!decrypted_string) {
        return thunkApi.rejectWithValue(
          'Something went wrong please try again',
        );
      }
      let data = JSON.parse(decrypted_string) as Response;

      if (!data) {
        return thunkApi.rejectWithValue(
          'Something went wrong please try again',
        );
      }

      if (data.ResponseCode != '00') {
        return thunkApi.rejectWithValue(
          data.ResponseMessage || 'Request failed please try again',
        );
      }

      return thunkApi.fulfillWithValue(
        data.ResponseMessage ||
          'Password reset successfully, you can proceed to login',
      );
    } catch (err) {
      Console.log('resetPassword err-----', param);
      return thunkApi.rejectWithValue(returnDecryptedError(err));
    }
  },
);

export const changePassword = createAsyncThunk<
  String,
  ChangePasswordAttribute,
  {state: RootState; rejectValue: ErrorResponse}
>('opti2.0/changePassword', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    Console.log('changePassword encrypted', []);
    const store = thunkApi.getState();
    const result = await axios.post(
      `${getAuthBaseUrl()}/change-password`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${store.user.accessToken}`,
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue({
        errorCode: ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: 'Something went wrong please try again',
      });
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (!data) {
      return thunkApi.rejectWithValue({
        errorCode: ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: 'Something went wrong please try again',
      });
    }

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue({
        errorCode: data.ResponseCode || ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: data.ResponseMessage || 'Request failed please try again',
      });
    }
    Console.log('changePassword', data);
    return thunkApi.fulfillWithValue(
      data.ResponseMessage ||
        'Password Change successfully, you can proceed to login',
    );
  } catch (err) {
    Console.log('changePassword err-----', param);
    let error = returnDecryptedError(err, true);
    let errobj = {
      errorCode: '',
      errorMsg: '',
    };
    if (typeof error == 'object') {
      errobj.errorCode = error.responseCode;
      errobj.errorMsg = error.responseMessage;
    } else {
      errobj.errorCode = ERROR_CODE_TYPES['GENERAL_ERROR'];
      errobj.errorMsg = error;
    }
    return thunkApi.rejectWithValue(errobj);
  }
});

export const sendOtpForChangeDevice = createAsyncThunk<
  SendOtpForDeviceChangeResponse,
  SendOtpForDeviceChangeAttributes,
  {rejectValue: ErrorResponse}
>('opti2.0/sendOtpForChangeDevice', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    const result = await axios.post(
      `${getAuthBaseUrl()}/send-otp-change-device-account-password`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue({
        errorCode: ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: 'Something went wrong please try again',
      });
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue({
        errorCode: data.ResponseCode || ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: data.ResponseMessage || 'Request failed please try again',
      });
    }

    let res_data = data.Data as SendOtpForDeviceChangeResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('sendOtpForChangeDevice param-----', param);
    let error = returnDecryptedError(err, true);
    Console.log('sendOtpForChangeDevice err-----', error);

    let errobj = {
      errorCode: '',
      errorMsg: '',
    };
    if (typeof error == 'object') {
      errobj.errorCode = error.responseCode;
      errobj.errorMsg = error.responseMessage;
    } else {
      errobj.errorCode = ERROR_CODE_TYPES['GENERAL_ERROR'];
      errobj.errorMsg = error;
    }
    return thunkApi.rejectWithValue(errobj);
  }
});

export const changeDevice = createAsyncThunk<
  ChangeDeviceResponse,
  ChangeDeviceAttributes
>('opti2.0/changeDevice', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    const result = await axios.post(
      `${getAuthBaseUrl()}/change-device-account-password`,
      {
        data: d,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      },
    );

    let decrypted_string = decryptWithAES256(result.data).decryptedText;
    if (!decrypted_string) {
      return thunkApi.rejectWithValue('Something went wrong please try again');
    }
    let data = JSON.parse(decrypted_string) as Response;

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue(
        data.ResponseMessage || 'Request failed please try again',
      );
    }

    let res_data = data.Data as ChangeDeviceResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('changeDevice err-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});
