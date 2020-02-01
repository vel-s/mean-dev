const
    express         = require('express'), // создаёт сервер
    cors            = require('cors'), //Модуль для соединения нашей страницы с разными API
    bodyParser      = require('body-parser'), //парсит JSON
    mongoose        = require('mongoose'), // модуль для работы с БД Монго
    passport        = require('passport'), // что-то там с безопасностью
    path            = require('path'), //корневой путь к папке
    config          = require('./config/db'), // подключение к самой БД Монго
    account         = require('./routes/account'), // пути к страничкам сайта
    app             = express(),
    port            = process.env.PORT || 8080;

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('connected', () => console.log("Connection to DB => OK"));
mongoose.connection.on('error', (err) => console.log("DB => Failed " + err));

app.get('/', (req, res) => res.send('Hello world!!! You 1231412'));
app.use('/account', account);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public, index.html')));
app.listen(port, () => console.log('Server ' +port+ ' => OK'));
