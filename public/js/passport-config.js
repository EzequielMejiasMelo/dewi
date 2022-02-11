const localStrategy = require('passport-local')
.Strategy
const bcrypt = require('bcrypt')

 function initialize(passport, getUserByEmail, getUserById) {
const authenticateUser = async (email, password, done) => {
const user = getUserByEmail(email)
if (user == null) {
    return done(null, false, {message: 'No user with that email'})
}
try {
if (await bcrypt.compare(password, user.password)) {
return done(null, user)
} else {
    return done(null, false, { message: 'password incorrect'})
}
} catch (e) {
return done(e)
}
}
passport.use(new localStrategy({usernameField: 'email'}), 
authenticateUser)
passport.serialUser((user, done) => done(null, user.id))
passport.serialUser((id, done) => {
 return   done(null, getUserbyId(id))
})
}

module.exports = initialize