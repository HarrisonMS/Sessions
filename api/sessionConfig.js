const sessionConfig = {
  name: "monster",
  secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!",
  resave: false,
  saveUninitialized: process.env.SEND_COOKIES || true,
  store: new KnexSessionStore({
    knex,
    createtable: true,

    clearInterval: 1000 * 50 * 10,
    sidfieldname: "sid",
    tablename: "auth",
  }),
  cookie: {
    maxAge: 1000 * 60 * 10, // good for 10 mins in ms
    secure: process.env.USE_SECURE_COOKIES || false, // used over https only, set to true in production
    httpOnly: true, // true means JS on the client cannot access the cooke
  },
};

module.exports = {
  sessionConfig: sessionConfig,
};
