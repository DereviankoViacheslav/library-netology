const UserDB = process.env.DB_USERNAME || 'root';
const PasswordDB = process.env.DB_PASSWORD || 'qwerty12345';
const NameDB = process.env.DB_NAME || 'library-netology';
const HostDb =
  process.env.DB_HOST ||
  'mongodb+srv://root:qwerty12345@netology.vvtgu.mongodb.net/library-netology';
//const UrlDB = `mongodb+srv://${UserDB}:${PasswordDB}@cluster0.grfrs.mongodb.net/${NameDB}`;
//const UrlDB = `mongodb://localhost:27017/mydb`;
//const UrlDB = `mongodb://${UserDB}:${PasswordDB}@localhost:27017/mydb`;

module.exports = {
  host: HostDb,
  // user: UserDB,
  // pass: PasswordDB,
  dbName: NameDB,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};
