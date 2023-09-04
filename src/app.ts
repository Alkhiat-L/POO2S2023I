import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    add_user(user: User): void {
        if (this.users.some(rUser => {
          return rUser.email === user.email })) {
            throw new Error('User with same email already registered.')
        }
        this.users.push(user)
    }
    remove_user(user: User): void {
      if (this.users.indexOf(user, 1) != -1) {
        this.users.splice(this.users.indexOf(user, 1))
      }else {
        throw new Error("User not found")
      } 
    }
    add_rent(rent: Rent): void {
      if (this.rents.some(registered_rent => {
        return rent.date_from <= registered_rent.date_to && rent.date_to >= registered_rent.date_from})) {
        throw new Error("Date not avaible!")
        }
      this.rents.push(rent)
    }
    return_bike(bike: Bike, returned_date: Date): void {
      if (this.rents.some(registered_rent => {
        return bike == registered_rent.bike})) {
          this.rents.some(registered_rent => {
            if (bike == registered_rent.bike) {
              registered_rent.date_returned = returned_date
            }})
        }else {
          throw new Error("This bike does not exists or is not rent")
        }
    }
}