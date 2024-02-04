// Contains all api calls relating to user accounts
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Response} from '../types';
import {ERROR_CODE_TYPES} from '../../constants/error';
import {
  Console,
  decryptWithAES256,
  encryptWithAES256,
  getBaseUrl,
  returnDecryptedError,
} from '../../utils';
import {
  GetTransactionReceiptAttributes,
  GetTransactionReceiptResponse,
  MakeLocalBankTransferAttributes,
  MakeLocalBankTransferResponse,
} from '../types/transfer';
import {ErrorResponse} from '../types/auth';
import {RootState} from '../store/store';

export const makeLocalBankTransfer = createAsyncThunk<
  MakeLocalBankTransferResponse,
  MakeLocalBankTransferAttributes,
  {state: RootState; rejectValue: ErrorResponse}
>('opti2.0/makeLocalBankTransfer', async (param, thunkApi) => {
  try {
    let d = encryptWithAES256(JSON.stringify(param)).encryptedText;
    const store = thunkApi.getState();
    const result = await axios.post(
      `${getBaseUrl()}/Transfer/intra-bank`,
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

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue({
        errorCode: data.ResponseCode || ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: data.ResponseMessage || 'Request failed please try again',
      });
    }

    let res_data = data.Data as MakeLocalBankTransferResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('makeLocalBankTransfer param-----', param);
    let error = returnDecryptedError(err, true);
    Console.log('makeLocalBankTransfer err-----', error);

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

export const getTransactionReceipt = createAsyncThunk<
  GetTransactionReceiptResponse,
  GetTransactionReceiptAttributes,
  {state: RootState; rejectValue: ErrorResponse}
>('opti2.0/getTransactionReceipt', async (param, thunkApi) => {
  try {
    const store = thunkApi.getState();
    const result = await axios.get(
      `${getBaseUrl()}/Transfer/transaction-receipt`,
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

    if (data.ResponseCode != '00') {
      return thunkApi.rejectWithValue({
        errorCode: data.ResponseCode || ERROR_CODE_TYPES['GENERAL_ERROR'],
        errorMsg: data.ResponseMessage || 'Request failed please try again',
      });
    }

    let res_data = data.Data as GetTransactionReceiptResponse;
    return thunkApi.fulfillWithValue(res_data);
  } catch (err) {
    Console.log('getTransactionReceipt param-----', param);
    let error = returnDecryptedError(err, true);
    Console.log('getTransactionReceipt err-----', error);

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
