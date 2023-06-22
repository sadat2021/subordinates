let roles = []
let users = []

function setRoles(roleData) {
  roles = roleData
}

function setUsers(userData) {
  users = userData
}

function getSubordinates(id) {
  const givenUser = users.find((user) => user.Id === id)
  if (!givenUser) {
    return [] // User not found
  }
  const selectedRole = roles.find((role) => role.Id === givenUser.Role)

  const subordinates = []
  users.forEach((user) => {
    if (
      roles.find((role) => role.Id === user.Role).Parent === selectedRole.Id
    ) {
      subordinates.push(user) // Add the user as a subordinate
      subordinates.push(...getSubordinates(user.Id)) // Recursively get the subordinates of the user
    }
  })

  return subordinates
}

module.exports = { setUsers, setRoles, getSubordinates }
