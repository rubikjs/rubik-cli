module.exports = (Command, options) => {
  class C extends Command {
    async run () {
      console.log(options)
    }
    get description () {
      return 'hello word'
    }
  }
  return C
}
