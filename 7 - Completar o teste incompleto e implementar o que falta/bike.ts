import { Location } from "./location";
export class Bike {
    constructor(
        public plate: string,
        public name: string,
        public type: string,
        public body_size: number,
        public max_load: number,
        public rate: number,
        public description: string,
        public ratings: number,
        public image_urls: string[],
        public available: boolean = true,
        public location: Location = new Location(0.0, 0.0),
        public id?: string
    ) {}
}
