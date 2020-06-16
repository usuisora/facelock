export enum ValueState {
    neverLoaded,
    loading,
    error,
  }
  
  // todo make props not enumerable
  export interface IValueState {
    _status: ValueState;
    _error?: any;
  }
  export const isValueState =( value  ) : boolean=>  value?._status 

  export const didNotStartLoading =( value) : boolean => value?._status === ValueState.neverLoaded;
  
  export const isLoading = (value) : boolean=> value?._status === ValueState.loading;
  
  export const isError = (value): boolean => value?._error;
  

  export const isReady = (value ) :boolean=> {
    return !(
      value &&
      (value._status === ValueState.neverLoaded ||
        value._status === ValueState.loading ||
        value._status === ValueState.error)
    );
  };
  
  export const isResolved = (value): boolean => isReady(value) || isError(value);
  
  export const notLoadedState = () => ({
    _status: ValueState.neverLoaded,
  });
  
  export const loadingState = () => ({
    _status: ValueState.loading,
  });
  
  export const commitState = (state, data) => {
    if (data instanceof Array) {
      return [...data];
    } else if (data instanceof Object) {
      return {
        ...data,
      };
    } else {
      return data;
    }
  };
  
  export const errorState = (state, error) => {
    console.error(error);
    return {
      ...state,
      _status: ValueState.error,
      _error: error,
    };
  };
  