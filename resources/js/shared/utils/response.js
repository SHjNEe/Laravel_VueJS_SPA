export const is404 = function(error) {
    return (
        error.response && error.response.status && 404 === error.response.status
    );
};
