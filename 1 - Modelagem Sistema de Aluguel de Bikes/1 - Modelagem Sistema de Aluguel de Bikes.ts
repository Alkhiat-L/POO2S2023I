class User {
  price: number = 0
  subscriber: boolean = false

  rent(time: number): void {
    if(this.subscriber == true) {
      if(time < 30) {
            
      }else {
        time -= 30
        this.price = time/15
      }
    }else {
      this.price = time/15
    }
  }
  subscribe() {
    this.subscriber = true
  }
  unsubscribe() {
    this.subscriber = false
  }

}
const jonas = new User()
jonas.rent(60)
console.log(`R$${jonas.price},00`)
jonas.subscribe()
jonas.rent(60)
console.log(`R$${jonas.price},00`)
