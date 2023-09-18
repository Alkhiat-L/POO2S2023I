import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import { Crypt } from "./crypt";
import crypto from 'crypto'


export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt: Crypt = new Crypt()

    find_user(email: string): User {
        return this.users.find(user => user.email == email)
    }
    async add_user(user: User): Promise<string> {
        for (const registered_user of this.users) {
            if (registered_user.email == user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const new_id = crypto.randomUUID()
        user.id = new_id
        const encrypted_password = await this.crypt.encrypt(user.password)
        user.password = encrypted_password
        this.users.push(user)
        return new_id
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
            !rent.end_date
        )
        if (rent) {
            rent.end_date = today
            rent.bike.disponible = true
            //const hours = diff_hours(rent.end, rent.start)
            //return hours * rent.bike.rate
            return 1
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
    async authenticate(userEmail: string, password: string): Promise<boolean> {
        const user = this.find_user(userEmail)
        if (!user) throw new Error('User not found.')
        return await this.crypt.compare(password, user.password)
    }
}
function diff_hours(dt2: Date, dt1: Date) {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(diff);
}
