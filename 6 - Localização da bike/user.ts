export class User {
    constructor(
        public name: string,
        public email: string,
        public password: string,
        public subscriber: boolean = false,
        public id?: string,
        public verified?: boolean
    ) {}
}
