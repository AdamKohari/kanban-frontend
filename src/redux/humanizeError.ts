export const humanizeError = (error: string) => {
    switch (error) {
        case 'EMAIL_OR_PASSWORD_INVALID': return 'Invalid e-mail or password!';
        case 'USER_EXISTS': return 'There is a registered user with this e-mail address!';
        case 'UNAUTHORIZED': return 'Your access token is not valid. Please login again.';
        case 'INVALID_EMAILS': return 'Some of the e-mail addresses you provided are not valid user e-mails.';
        default: return error;
    }
};