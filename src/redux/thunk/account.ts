// Contains all api calls relating to user accounts
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Response} from '../types';
import {
  FetchUserAccountsAttribute,
  FetchUserAccountsResponse,
  FetchUserByAcctNumberAttribute,
  FetchUserByAcctNumberResponse,
} from '../types/account';
import {
  Console,
  decryptWithAES256,
  encryptWithAES256,
  getBaseUrl,
  returnDecryptedError,
} from '../../utils';
import {ErrorResponse} from '../types/auth';
import {ERROR_CODE_TYPES} from '../../constants/error';
import {RootState} from '../store/store';

export const fetchUserAccounts = createAsyncThunk<
  FetchUserAccountsResponse[],
  FetchUserAccountsAttribute
>('opti2.0/sendOtpByBvn', async (param, thunkApi) => {
  try {
    const result = await axios.get(
      `${getBaseUrl()}/Account/${param.cifId}/customer-details`,
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

    let res_data = data.Data as FetchUserAccountsResponse[];
    Console.info('fetchUserAccounts data', data);
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.error('param-----', param);
    return thunkApi.rejectWithValue(returnDecryptedError(err));
  }
});

export const fetchUserByAccountNumber = createAsyncThunk<
  FetchUserByAcctNumberResponse,
  FetchUserByAcctNumberAttribute,
  {state: RootState; rejectValue: ErrorResponse}
>('opti2.0/fetchUserByAccountNumber', async (param, thunkApi) => {
  try {
    const result = await axios.get(
      `${getBaseUrl()}/Account/${param.acctNo}/details`,
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

    let res_data = data.Data as FetchUserByAcctNumberResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('fetchUserByAccountNumber param-----', param);
    let error = returnDecryptedError(err, true);
    Console.log('fetchUserByAccountNumber err-----', error);

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
