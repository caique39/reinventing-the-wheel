/**
 * Inspired by: https://caolan.github.io/async/v3/docs.html#waterfall
 */

function waterfall(fns, callback) {
  function wrapper(tasks) {
    return function(err, ...params) {
      const [task, ...leftTasks] = tasks

      if (err) return callback(err, ...params)

      if (leftTasks.length) {
        return task(...params, wrapper(leftTasks))
      }

      return task(...params, callback)
    }
  }

  return wrapper(fns)()
}

function taskOne(callback) {
  callback(null, 1)
}

function taskTwo(value, callback) {
  callback(null, value + 1)
}

function taskThree(value, callback) {
  callback(null, value + 1)
}

waterfall([taskOne, taskTwo, taskThree], function(err, result) {
  console.log({
    err,
    result
  })
})
