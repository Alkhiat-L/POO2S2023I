import sinon from "sinon"
import { App } from "./app"
import { Bike } from "./bike"
import { User } from "./user"
import { Location } from "./location"

describe('App', () => {
    it('should correctly calculate the rent amount', async () => {
        const app = new App()
        const user = new User('Jose', 'jose@mail.com', '1234')
        await app.register_user(user)
        const bike = new Bike('ABC-0001','caloi mountainbike', 'mountain bike',
            1234, 1234, 100.0, 'My bike', 5, [])
        app.register_bike(bike)
        const clock = sinon.useFakeTimers();
        app.rent_bike(bike.plate, user.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        const rentAmount = app.return_bike(bike.plate, user.email)
        expect(rentAmount).toEqual(200.0)
    })

    it('should be able to move a bike to a specific location', () => {
        const app = new App()
        const bike = new Bike('ABC-0001','caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
        app.register_bike(bike)
        const newYork = new Location(40.753056, -73.983056)
        app.move_bike_to(bike.plate, newYork)
        expect(bike.location.latitude).toEqual(newYork.latitude)
        expect(bike.location.longitude).toEqual(newYork.longitude)
    })

    it('should throw an exception when trying to move an unregistered bike', () => {
      const app = new App()
      const bike = new Bike('ABC-0001','caloi mountainbike', 'mountain bike', 1234, 1234, 100.0, 'My bike', 5, [])
      const newYork = new Location(40.753056, -73.983056)
      expect(() => {app.move_bike_to(bike.plate, newYork)}).toThrow("Bike not found") 
    })
})
