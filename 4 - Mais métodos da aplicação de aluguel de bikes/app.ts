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
    add_rent(bike_plate: string, user_email: string, start_date: Date, end_date: Date): void {
        const bike = this.bikes.find(bike => bike.plate == bike_plate)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.find_user(user_email)
        if (!user) {
            throw new Error('User not found.')
        }
        const bike_rents = this.rents.filter(rent =>
            rent.bike.plate == bike_plate && !rent.date_returned
        )
        const new_rent = Rent.create(bike_rents, bike, user, start_date, end_date)
        this.rents.push(new_rent)
    }
    add_bike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }
    return_bike(bike_plate: string, user_email: string) {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.plate == bike_plate &&
            rent.user.email == user_email &&
            rent.date_returned == undefined &&
            rent.date_from <= today
        )
        if (rent) {
            rent.date_returned = today
            return
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
