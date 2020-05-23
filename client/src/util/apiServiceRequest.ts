import axios from 'axios';
import { toast } from 'react-toastify';
import { stringify } from 'qs';
import { call, put } from 'redux-saga/effects';

import { ApiBaseUrl } from '../constants/env';
import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { authActions } from '../sagas/auth';
import store from '../store/configureStore';
import { getAllErrors } from './errorHandling';

const getParamsString = (params = {}) => {
  const encodedParams = stringify(params, { encodeValuesOnly: true, skipNulls: true });
  return encodedParams ? `?${encodedParams}` : '';
};

const HttpMethods = ['get', 'post', 'put', 'patch', 'delete'] as const;
export type IHttpMethod = typeof HttpMethods[number];

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache, no-store, must-revalidate',
  Pragma: 'no-cache',
  Accept: 'application/json',
};

const AUTH_HEADER_NAME = 'Authorization';

interface IRequestOptions {
  isAuth?: boolean;
  isFormData?: boolean;
}

export const isNoNetwork = err => err && err.request && err.request.status === 0;
const is401 = err => err && err.response && err.response.status === 401;
export const is404 = err => err && err.response && err.response.status === 404;
export const is500 = err => err && err.response && err.response.status >= 500;
const isAuthRequest = err => err && err.config && err.config.headers[AUTH_HEADER_NAME];

const handleNetworkError = err => {
  if (isAuthRequest(err)) {
    if (isNoNetwork(err)) {
      toast.error("Seems like you don't have internet connection");
    } else if (is500(err)) {
      toast.error('Our servers are busy at the moment. Please try again or contact support');
    } else if (is404(err)) {
      toast.error('Data Not found');
    } else {
      getAllErrors(err).forEach(error => toast.error(error));
    }
  }
  throw err;
};

const getHeaders = (requestOptions: IRequestOptions = {}) => {
  const headers = { ...defaultHeaders };
  if (requestOptions.isAuth) {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (!token) {
      store.dispatch(authActions.delete.run());
      throw new Error('401');
    }
    headers[AUTH_HEADER_NAME] = `Token ${token}`;
  }
  if (requestOptions.isFormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  return headers;
};

const getResourceUrl = (resource: string, params: object | string = {}, id: string | null) => {
  let paramsString = params;
  if (typeof params === 'object') {
    paramsString = getParamsString(params);
  }
  const url = resource.match(/^https?:\/\//) ? resource : ApiBaseUrl + resource;
  return id ? `${url}${id}${paramsString}` : `${url}${paramsString}`;
};

function* apiRequestGenerator(config: object) {
  try {
    // @ts-ignore
    const response = yield call(axios, config);
    if (response.headers['last-modified']) {
      response.data.lastModified = response.headers['last-modified'];
    }
    return response.data;
  } catch (err) {
    if (is401(err)) {
      yield put(authActions.delete.run());
    } else {
      handleNetworkError(err);
    }
  }
}

const apiRequestPromise = (config: object) => {
  return axios(config)
    .then(response => {
      if (response.headers['last-modified']) {
        response.data.lastModified = response.headers['last-modified'];
      }
      return response;
    })
    .catch(err => {
      if (is401(err)) {
        store.dispatch(authActions.delete.run());
      } else {
        handleNetworkError(err);
      }
    });
};

const getRequestConfig = (
  method: IHttpMethod,
  resource: string,
  dataOrUuid: object | string,
  urlParams = {},
  requestOptions?: IRequestOptions
) => {
  let id;
  let data = {};
  if (typeof dataOrUuid === 'string') {
    id = dataOrUuid;
  } else {
    data = dataOrUuid;
  }
  const url = getResourceUrl(resource, urlParams, id);

  return {
    method,
    url,
    headers: getHeaders(requestOptions),
    data,
  };
};

const createRequestGenerator = (method: IHttpMethod) =>
  function*(
    resource: string,
    dataOrUuid: object | string = {},
    requestOptions: IRequestOptions = { isAuth: true },
    urlParams = {}
  ) {
    return yield apiRequestGenerator(getRequestConfig(method, resource, dataOrUuid, urlParams, requestOptions));
  };

const createRequestPromise = (method: IHttpMethod) => (
  resource: string,
  dataOrUuid: object | string = {},
  requestOptions: IRequestOptions = { isAuth: true },
  urlParams = {}
) => apiRequestPromise(getRequestConfig(method, resource, dataOrUuid, urlParams, requestOptions));

export interface IRequests {
  [key: string]: (
    resource: string,
    dataOrUuid?: object | string,
    requestOptions?: IRequestOptions,
    urlParams?: object | string
  ) => any;
}

// returns a generator for each method
export const http: IRequests = HttpMethods.reduce(
  (result, method) => ({
    ...result,
    [method]: createRequestGenerator(method),
  }),
  {}
);

// non-generator version, returns a promise for each method
export const httpPromise: IRequests = HttpMethods.reduce(
  (result, method) => ({
    ...result,
    [method]: createRequestPromise(method),
  }),
  {}
);
