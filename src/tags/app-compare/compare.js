import { highlight } from 'prism'

function processFile (file) {
  if (file.highlighted) {
    return file
  } else {
    const { content, filename } = file
    const language = filename === 'config.json' ? 'json' : 'javascript'
    const highlighted = highlight(content, Prism.languages[language])

    return { ...file, highlighted }
  }
}

export function highlightCode (gist) {
  let { config, setup, tests } = gist

  if (config) config = processFile(config)
  if (setup) setup = processFile(setup)

  tests = tests.map(test => {
    return processFile(test)
  })

  return { ...gist, config, setup, tests }
}
