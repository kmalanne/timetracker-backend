const PORT = process.env.PORT || 3000;

module.exports = {
  google: {
    clientID: '724693274614-qb4klb27ouhe756lckh21j6t1n4an9vr.apps.googleusercontent.com',
    clientSecret: 't5nDh8BYHuAoVpWj8tNqTSFG',
    callbackURL: `http://127.0.0.1:${PORT}/auth/google/callback`,
  },
};
