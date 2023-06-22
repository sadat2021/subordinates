const { expect } = require('chai')
const { setRoles, setUsers, getSubordinates } = require('./subordinates')

const roles = [
  { Id: 1, Name: 'System Administrator', Parent: 0 },
  { Id: 2, Name: 'Location Manager', Parent: 1 },
  { Id: 3, Name: 'Supervisor', Parent: 2 },
  { Id: 4, Name: 'Employee', Parent: 3 },
  { Id: 5, Name: 'Trainer', Parent: 3 },
]

const users = [
  { Id: 1, Name: 'Adam Admin', Role: 1 },
  { Id: 2, Name: 'Emily Employee', Role: 4 },
  { Id: 3, Name: 'Sam Supervisor', Role: 3 },
  { Id: 4, Name: 'Mary Manager', Role: 2 },
  { Id: 5, Name: 'Steve Trainer', Role: 5 },
]

describe('getSubordinates', () => {
  before(() => {
    setRoles(roles)
    setUsers(users)
  })

  it('should return correct subordinates for user with ID 3', () => {
    const result = getSubordinates(3)
    const expected = [
      { Id: 2, Name: 'Emily Employee', Role: 4 },
      { Id: 5, Name: 'Steve Trainer', Role: 5 },
    ]

    expect(result).to.have.deep.members(expected)
  })

  it('should return correct subordinates for user with ID 1', () => {
    const result = getSubordinates(1)
    const expected = [
      { Id: 3, Name: 'Sam Supervisor', Role: 3 },
      { Id: 2, Name: 'Emily Employee', Role: 4 },
      { Id: 4, Name: 'Mary Manager', Role: 2 },
      { Id: 5, Name: 'Steve Trainer', Role: 5 },
    ]

    expect(result).to.have.deep.members(expected)
  })

  it('should return an empty array for a user with no subordinates', () => {
    const result = getSubordinates(2) // User with ID 2 has no subordinates
    const expected = []

    expect(result).to.deep.equal(expected)
  })

  it('should return an empty array for an invalid user ID', () => {
    const result = getSubordinates(6) // User with ID 6 does not exist
    const expected = []

    expect(result).to.deep.equal(expected)
  })
})
