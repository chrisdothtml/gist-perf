const { keys } = Object

function getSetup (files) {
  return false
}

function getConfig (files) {
  const config = files['config.json']
  let result

  if (config) {
    result = JSON.parse(config.content)
  } else {
    result = false
  }

  return result
}

function getTests (files) {
  return keys(files)
    .filter(filename => {
      return /^test-.+\.js$/.test(filename)
    })
    .map(filename => {
      return files[filename]
    })
}

export function parse (gist) {
  const files = gist.files
  const tests = getTests(files)
  let result = {}

  if (tests.length > 1) {
    const specialFiles = {
      config: getConfig(files),
      setup: getSetup(files)
    }

    keys(specialFiles).forEach(key => {
      const file = specialFiles[key]

      if (!result.error && file) {
        if (file.error) {
          result = { error: file.error }
        } else {
          result[key] = file
        }
      }
    })

    if (!result.error) {
      result.tests = tests
    }
  } else {
    result = { error: 'need at least 2 tests' }
  }

  return result
}
