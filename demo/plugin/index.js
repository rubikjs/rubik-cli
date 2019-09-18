module.exports = ({ BaseCommand }, options) => {
  class SubCommand extends BaseCommand {
    async run () {
      console.log(options)
    }
    get description () {
      return 'hello word'
    }
  }
  return SubCommand
}
