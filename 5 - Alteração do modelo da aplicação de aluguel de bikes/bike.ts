export class Bike {
  public disponible: boolean = true
    constructor(
        public name: string,
        public type: string,
        public body_size: number,
        public max_load: number,
        public description: string,
        public plate: string, 
        public rate: number,
        public id?: string
    ) {}
}
