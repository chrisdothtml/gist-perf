import Benchmark from 'benchmark'

function strToFunc (str) {
  return new Function(str)
}

function getOptions (gist) {
  const result = {
    async: true
  }

  if (gist.setup) {
    result.setup = gist.setup.content
  }

  return result
}

export function create (gist) {
  const options = getOptions(gist)
  const suite = new Benchmark.Suite(options)

  gist.tests.forEach(test => {
    suite.add(
      test.filename,
      test.content
    )
  })

  return suite
}
