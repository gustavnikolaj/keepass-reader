module.exports = {}

module.exports.flattenedList = function flattenedList (database, path) {
  var entries = []

  if (database.entries) {
    database.entries.forEach(function (entry) {
      entry.meta = {
        path: path
      }
      entries.push(entry)
    })
  }

  if (database.groups) {
    database.groups.map(function (group) {
      return flattenedList(group, (path ? path + '/' + group.name : group.name))
    }).forEach(function (group) {
      entries = entries.concat(group)
    })
  }

  return entries
}

module.exports.flagUniqueEntries = function flagUniqueEntries (entries) {
  var titles = entries.reduce(function (result, entry) {
    result[entry.title] = result[entry.title] || 0
    result[entry.title] += 1
    return result
  }, {})

  entries.forEach(function (entry) {
    entry.meta.unique = titles[entry.title] === 1
  })
}

module.exports.parseRawDatabase = function parseRawDatabase (rawDatabase) {
  function databaseWalker (node) {
    var result = {}

    result.uuid = node.UUID

    if (node.Name) {
      result.name = node.Name
    }

    if (node.Entry) {
      var entry = node.Entry
      if (!Array.isArray(entry)) { entry = [entry] }
      result.entries = entry.map(databaseWalker)
    }

    if (node.Group) {
      var group = node.Group
      if (!Array.isArray(group)) { group = [group] }
      result.groups = group.map(databaseWalker)
    }

    if (node.String) {
      node.String.forEach(function (item) {
        var key = item.Key.toLowerCase()
        if (key === 'password') {
          result[key] = item.Value._
        } else {
          result[key] = item.Value
        }
      })
    }

    return result
  }

  var db = rawDatabase.KeePassFile.Root.Group
  return databaseWalker(db)
}
