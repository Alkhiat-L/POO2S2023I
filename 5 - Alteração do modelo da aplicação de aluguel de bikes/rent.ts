import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    public date_returned?: Date = undefined
    private constructor(
        public bike: Bike,
        public user: User,
        public start_date: Date,
        
    ) {}

    static create(bike: Bike, user: User, start_date: Date): Rent {
        const can_create = Rent.can_rent(bike)
        if (can_create) return new Rent(bike, user, start_date)
        throw new Error('Overlapping dates.')
    }

    static can_rent(bike: Bike): boolean {
        if (bike.disponible == false) {
          throw new Error("Date used!")
        }
        return true
    }
}
