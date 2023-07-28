const http = require('http')

const port = 3000

const quotes = [
	"Любишь медок — люби и холодок!",
	"Бери ношу по себе, чтоб не падать при ходьбе.",
	"Жизнь висит на нитке, а думает о прибытке.",
	"Не тот счастлив у кого много добра, а тот, у кого жена верна.",
	"Кто в Москве не бывал, красоты не видал.",
	"Ну че ты споришь? Тебе говорят – говно музыка, а ты споришь",
	"Поживешь подольше – увидишь побольше",
	"Тормозить ногами надо, а не головой! Козел!",
	"Что ж такое, были же люди как люди, и вдруг все сразу стали кретины. Парадокс",
	"Сэнк ю вери мач!.. Вот ур-р-роды…",
	"Молодой человек! Мы, русские, не обманываем друг друга!",
	"Деньги правят миром, и тот сильней, у кого их больше",
	"Мальчик, ты не понял. Водочки нам принеси, мы домой летим!"
]

const requestHandler = (_request, response) => {
    response.end(quotes[Math.floor(Math.random() * quotes.length)])
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
	
    if (err) {
        return console.log('Что-то пошло не так', err)
	}
	
	console.log(`Сервер запущен на порту ${port}`)

})