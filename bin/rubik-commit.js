#!/usr/bin/env node
'use strict'

// const { formatResult } = require('@commitlint/format')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')
const read = require('@commitlint/read')

const CONFIG = {
  extends: ['@commitlint/config-conventional']
}
// load(CONFIG)
// .then(opts => lint('foo: bar', opts.rules, opts.parserPreset ? {parserOpts: opts.parserPreset.parserOpts} : {}))
// .then(report => {
//   const results = formatResult(report)
//   console.log(report, formatResult(report))
//   results.forEach(v => console.log(v))
// })
Promise.all([load(CONFIG), read({ from: 'HEAD~1' })])
  .then(tasks => {
    const [{ rules, parserPreset }, [commit]] = tasks
    return lint(commit, rules, parserPreset ? { parserOpts: parserPreset.parserOpts } : {})
  })
  .then(result => console.log(result))
