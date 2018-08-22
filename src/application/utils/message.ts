export const myMail = 'okaforechezona1992@gmail.com';

export const new_user_message = (username) => {
    return '<h2>Your Profile link</h2><br> <p>https://checkmyprofile.herokuapp.com/' + username + '</p>';
};

export const password_reset_message = (message) => {
    return '<html><body><h2>This link will be inactive after 24 hours </h2><a href="' + message + '">Click here to recover  password</a></body></html>';
};

export const subject = 'Profile Link';
export const resetSubject = 'Password Reset';
