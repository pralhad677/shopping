export const Subscription = {
  count: {
    subscribe(parent:any,args:any,{pubsub}:any,info:any) {
      let count = 0
      setInterval(() => {
        ++count
        pubsub.publish('count', {
          count
        })
      },1000)
      return pubsub.asyncIterator('count')
  }
}
}