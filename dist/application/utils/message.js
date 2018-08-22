"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myMail = 'okaforechezona1992@gmail.com';
exports.new_user_message = (username) => {
    return '<h2>Your Profile link</h2><br> <p>https://checkmyprofile.herokuapp.com/' + username + '</p>';
};
exports.password_reset_message = (message) => {
    return '<html><body><h2>This link will be inactive after 24 hours </h2><a href="' + message + '">Click here to recover  password</a></body></html>';
};
exports.subject = 'Profile Link';
exports.resetSubject = 'Password Reset';
//# sourceMappingURL=message.js.map