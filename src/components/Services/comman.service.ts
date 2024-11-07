/**CREATE URL FOR API CALL WITH PARAMS */
export const formatUrl = (url: any, params: any) => {
    params =
      params && Object.keys(params).length > 0
        ? `?${new URLSearchParams(params)?.toString()}`
        : ``;
    return `${url}${params}`;
  };