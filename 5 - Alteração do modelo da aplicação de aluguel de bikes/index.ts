import { Rent } from "./rent";
import { Bike } from "./bike";
import { User } from "./user";
import { App } from "./app"



const bike = new Bike('mountain bike', 'mountain', 123, 130, '', 'ABC-0001', 10)
const bike2 = new Bike('road bike', 'road', 123, 130, '', 'ABC-0002', 20)
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
app.list_users()
app.add_bike(bike)
app.add_bike(bike2)
console.log("BIKES:")
app.list_bikes()
console.log("RENTS:")
app.add_rent('ABC-0001', 'maria@mail.com', today)
app.list_rents()
app.add_rent('ABC-0002', 'maria2@mail.com', today)
app.list_rents()
app.return_bike('ABC-0001', 'maria@mail.com')
app.list_rents()
app.return_bike('ABC-0002', 'maria2@mail.com')
app.list_rents()
app.authenticate('maria@mail.com', '1234')
