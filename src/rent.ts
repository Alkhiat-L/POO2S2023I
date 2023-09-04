import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    private constructor(
        public bike: Bike,
        public user: User,
        public date_from: Date,
        public date_to: Date,
        public date_returned?: Date
    ) {}

    static create(rents: Rent[], bike: Bike, user: User, start_date: Date, end_date: Date): Rent {
        const can_create = Rent.can_rent(rents, start_date, end_date)
        if (can_create) return new Rent(bike, user, start_date, end_date)
        throw new Error('Overlapping dates.')
    }

    static can_rent(rents: Rent[], start_date: Date, end_date: Date): boolean {
        if (rents.some( registered_rent => {
          return start_date <= registered_rent.date_to && end_date >= registered_rent.date_from})) {
          throw new Error("Date used!")
        }
        return true
    }
}