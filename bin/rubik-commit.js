#!/usr/bin/env node
'use strict'

const { format } = require('@commitlint/format')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')
const read = require('@commitlint/read')

const CONFIG = {
  extends: ['@commitlint/config-conventional']
}

async function main () {
  const { rules, parserPreset } = await load(CONFIG)
  const [commit] = await read({ edit: true })
  const result = await lint(commit, rules, parserPreset ? { parserOpts: parserPreset.parserOpts } : {})
  const formatMessage = format({
    results: [result]
  }, {
    helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint'
  })
  console.log(formatMessage)
  if (!result.valid) {
    throw new Error()
  }
}
main().catch(() => {
  process.exit(1)
})
