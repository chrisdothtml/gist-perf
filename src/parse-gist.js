const { keys } = Object
const PATTERNS = {
  config: /^config\.json$/,
  setup: /^setup\.js$/,
  tests: /^test-.+\.js$/
}

function validateConfig (file) {
  let result

  try {
    result = JSON.parse(file.content)
  } catch (error) {
    result = { error: 'invalid config file' }
  }

  return result
}

function getFileType (filename) {
  let result = false

  for (let key in PATTERNS) {
    const pattern = PATTERNS[key]

    if (pattern.test(filename)) {
      result = key
      break
    }
  }

  return result
}

export default function parse (gist) {
  const files = gist.files
  // only keep files with types
  const validFiles = keys(files).filter(getFileType)
  const result = {
    config: null,
    errors: [],
    raw: gist,
    setup: null,
    tests: []
  }

  // process files
  validFiles.forEach(filename => {
    const type = getFileType(filename)
    const fileObj = files[filename]

    switch (type) {
      case 'config':
        const validation = validateConfig(fileObj)

        if (validation.error) {
          result.errors.push(validation.error)
        } else {
          result.config = fileObj
        }

        break
      case 'setup':
        result.setup = fileObj
        break
      case 'tests':
        result.tests.push(fileObj)
        break
    }
  })

  if (result.tests.length < 2) {
    result.errors.push('need at least 2 tests')
  }

  return result
}
