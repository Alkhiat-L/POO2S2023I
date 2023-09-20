import { Bike } from "./bike";
import { User } from "./user";

export class Rent {
    public end_date?: Date = undefined
    public constructor(
        public bike: Bike,
        public user: User,
        public start_date: Date,
        
    ) {}
}
