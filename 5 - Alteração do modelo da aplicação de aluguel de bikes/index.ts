import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import sinon from 'sinon'

async function main() {
    const clock = sinon.useFakeTimers();
    const app = new App()
    const user1 = new User('Jose', 'jose@mail.com', '1234')
    await app.add_user(user1)
    const bike = new Bike('0000-A01','caloi mountainbike', 'mountain bike',
        1234, 1234, 100.0, 'My bike', 5, [])
    app.add_bike(bike)
    app.list_bikes()
    app.add_rent(bike.plate, user1.email)
    app.list_bikes()
    clock.tick(1000 * 60 * 65)
    console.log(app.return_bike(bike.plate, user1.email))
    app.list_bikes()
}

main()
