export const is404 = function(error) {
    return isErrorWithResponseAndStatus(error) && 404 === error.response.status;
};

export const is422 = function(error) {
    return isErrorWithResponseAndStatus(error) && 422 === error.response.status;
};

export const isErrorWithResponseAndStatus = function(error) {
    return error.response && error.response.status;
};
