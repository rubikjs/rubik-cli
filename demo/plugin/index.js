module.exports = ({ TakeVersionCommand }, options) => {
  class SubCommand extends TakeVersionCommand {
    async run () {
      console.log(options)
    }
    get description () {
      return 'hello word'
    }
  }
  return SubCommand
}
