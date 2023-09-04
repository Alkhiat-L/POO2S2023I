import { Rent } from "./rent";
import { Bike } from "./bike";
import { User } from "./user";
import { App } from "./app"



const bike = new Bike('mountain bike', 'mountain', 123, 130, '', '01')
const bike2 = new Bike('road bike', 'road', 123, 130, '', '02')
const user = new User('Maria', 'maria@mail.com', '1234')
const today = new Date()
const twoDaysFromToday = new Date()
twoDaysFromToday.setDate(twoDaysFromToday.getDate() + 2)
const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
const sevenDaysFromToday = new Date()
sevenDaysFromToday.setDate(sevenDaysFromToday.getDate() + 7)



const user2 = new User('Maria Clara', 'maria2@mail.com', '3123')

const app = new App()
app.add_user(user)
app.add_user(user2)
console.log("USERS:")
console.log(app.users)
app.remove_user(user2)
console.log("NEW USERS:")
console.log(app.users)
app.add_bike(bike)
app.add_bike(bike2)
console.log("BIKES:")
console.log(app.bikes)
console.log("RENTS:")
app.add_rent(Rent.create(app.rents, bike, user, today, twoDaysFromToday))
console.log(app.rents)
app.add_rent(Rent.create(app.rents, bike2, user2, sevenDaysFromToday, sevenDaysFromToday))
console.log(app.rents)
app.return_bike(bike, sevenDaysFromToday)
console.log(app.rents)
app.return_bike(bike2, sevenDaysFromToday)
console.log(app.rents)
