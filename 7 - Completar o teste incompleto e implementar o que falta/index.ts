import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import sinon from 'sinon'

async function main() {
    const clock = sinon.useFakeTimers();
    const app = new App()
    const user1 = new User('Jose', 'jose@mail.com', '1234')
    await app.register_user(user1)
    const bike = new Bike('ABC-0001','caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
    app.register_bike(bike)
    app.list_bikes()
    app.rent_bike(bike.plate, user1.email)
    app.list_bikes()
    clock.tick(1000 * 60 * 65)
    console.log(app.return_bike(bike.plate, user1.email))
    app.list_bikes()
}

main()
