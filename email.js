// email.js

// Задание 1
class Email {
	constructor(email) {
		this.email = String(email)
	}

	get isValid() {
		let emailFormat = /([^@]+)@([^.]+).(.+)/
		let emailParts = this.email.match(emailFormat)
		let checkEmailLogin = /[#$%^]/ // RegExp для поиска этих символов в логине
		let checkDomenLength = /^.{1,3}$/ // RegExp для проверки длины домена
		
		if(checkEmailLogin.test(emailParts[1]) || !checkDomenLength.test(emailParts[3])) {
			return false
		} else {
			return true
		}
	}

	set setEmail(array) {
		this.email = `${array[0]}@${array[1]}.${array[2]}`
	}
}

let example1 = new Email("ex$ample@ex.com")
console.log(example1.email)
console.log(example1.isValid)
example1.setEmail = ["newEmail", "gmail", "com"]
console.log(example1.email)
console.log(example1.isValid)

console.log("\n")

let example2 = new Email("validemail@yahoo.dotcom")
console.log(example2.email)
console.log(example2.isValid)
example2.setEmail = ["validemail", "mail", "ru"]
console.log(example2.email)
console.log(example2.isValid)


// Задание 2
class Contact extends Email {
	constructor(email, phone) {
		super(email)
		this.phone = String(phone)
	}

	get phoneType() {
		if(this.phone[0] == "+") {
			if(this.phone.length == 13) {return "Мобильный"}
			if(this.phone.length == 19) {return "Городской"}
		} else {
			return "Неизвестный"
		}
	}
}

console.log("\n")

example3 = new Contact(null, "+796520279385")
console.log(example3.phone)
console.log(example3.phoneType)

console.log("\n")

example4 = new Contact(null, "+239296174543884727")
console.log(example4.phone)
console.log(example4.phoneType)


// Задание 3
let url = "https://jsonplaceholder.typicode.com/comments"
fetch(url).then(response => response.json())
.then(data => {
	let filteredData = data.filter(item => item.email.length > 20)
	console.log(filteredData)
})


// Задание 4
async function getCommentByUser(nick) {
	let usersUrl = "https://jsonplaceholder.typicode.com/users"
	let commentsUrl =  "https://jsonplaceholder.typicode.com/comments"

	let usersResponse = await fetch(usersUrl)
	let usersData = await usersResponse.json()

	let user = usersData.find(user => user.username == nick)

	if(user) {
		let commentResponse = await fetch(commentsUrl)
		let commentsData = await commentResponse.json()

		let userComments = commentsData.filter(comment => comment.email.split('@')[0] == user.email.split('@')[0])

		console.log(userComments)
	} else {
		console.log("User не найден")
	}
}

getCommentByUser("Samantha")
