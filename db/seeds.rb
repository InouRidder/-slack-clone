puts "Refreshing chat rooms"

ChatRoom.destroy_all
ChatRoom.create(name: "general")
ChatRoom.create(name: "javascript")
puts "Refreshing users"

User.destroy_all
User.create(email: "a@a.a", password: 'password', first_name: 'inou', last_name: 'ridder')
User.create(email: "b@b.b", password: 'password', first_name: 'ellyn', last_name: 'bouscasse')
User.create(email: "c@c.c", password: 'password', first_name: 'ollie', last_name: 'senduk')


puts "Bye"
