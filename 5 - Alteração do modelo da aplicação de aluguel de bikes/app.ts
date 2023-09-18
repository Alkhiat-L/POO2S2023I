import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'


export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    find_user(email: string): User {
        return this.users.find(user => user.email == email)
    }
    add_user(user: User): string {
        if (this.users.some(registered_user => {
          return registered_user.email === user.email })) {
            throw new Error('User with same email already registered.')
        }
        const newId = crypto.randomUUID()
        user.id = newId
        this.users.push(user)
        return newId
    }
    remove_user(email: string): void {
        const user_index = this.users.findIndex(user => user.email === email)
        if (user_index !== -1) {
            this.users.splice(user_index, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    add_rent(bike_plate: string, user_email: string, start_date: Date): void {
        const bike = this.bikes.find(bike => bike.plate == bike_plate)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        if (bike.disponible == false) {
          throw new Error('Bike not avaible.')
        }
        const user = this.find_user(user_email)
        if (!user) {
            throw new Error('User not found.')
        }
        const new_rent = Rent.create(bike, user, start_date)
        bike.disponible = false
        this.rents.push(new_rent)
    }
    add_bike(bike: Bike): string {
        const new_id = crypto.randomUUID()
        bike.id = new_id
        this.bikes.push(bike)
        return new_id
    }
    return_bike(bike_plate: string, user_email: string): number {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.plate == bike_plate &&
            rent.user.email == user_email &&
            !rent.returned
        )
        if (rent) {
            rent.date_returned = today
            rent.bike.disponible = true
            return rent.bike.rate * (rent.date_returned - rent.start_date)
        }
        throw new Error('Rent not found.')
    }
    list_bikes(): void {
      console.log(this.bikes)
    }
    list_users(): void {
      console.log(this.users)
    }
    list_rents(): void {
      console.log(this.rents)
    }
    authenticate(email: string, password: string): void {
      const user = this.users.find(user => 
            user.email == email
      )
      if(!user) {
        throw new Error('User not found.')
      }
      if(user.password == password) {
        user.verified = true
        console.log("User authenticated.")
        return
      }
      throw new Error('wrong password.')

    }
}
