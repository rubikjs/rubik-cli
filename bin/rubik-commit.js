#!/usr/bin/env node
'use strict'

const { formatResult } = require('@commitlint/format')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')
const read = require('@commitlint/read')

const CONFIG = {
  extends: ['@commitlint/config-conventional']
}
Promise.all([load(CONFIG), read({ from: 'HEAD~1' })]).then(tasks => {
  const [{ rules, parserPreset }, [commit]] = tasks
  console.log(333, commit)
  return lint(commit, rules,
    parserPreset ? { parserOpts: parserPreset.parserOpts } : {})
}).then(result => {
  if (!result.valid) {
    console.log(555, result, formatResult(result))
    throw new Error()
  }
}).catch(err => {
  console.log(444)
  throw err
})
