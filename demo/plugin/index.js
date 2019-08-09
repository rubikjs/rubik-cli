module.exports = (Command, options) => {
  class SubCommand extends Command {
    async run () {
      console.log(options)
    }
    get description () {
      return 'hello word'
    }
  }
  return SubCommand
}
