const { q } = require('./fauna.js');

const Collections = [
  {
    name: 'apis'
  },
  {
    name: 'pastes'
  },
  {
    name: 'users'
  }
];
const Indexes = [
  {
    name: 'apiByUserSub',
    unique: true,
    serialized: true,
    source: q.Collection('apis'),
    terms: [
      {
        field: ['data', 'user']
      }
    ]
  },
  {
    name: 'latestPublicPastesByDate',
    serialized: true,
    source: q.Collection('pastes'),
    terms: [
      {
        field: ['data', 'isPrivate']
      }
    ],
    values: [
      {
        field: ['data', 'createdDate'],
        reverse: true
      },
      {
        field: ['ref']
      }
    ]
  },
  {
    name: 'pasteByID',
    unique: true,
    serialized: true,
    source: q.Collection('pastes'),
    terms: [
      {
        field: ['data', 'pasteId']
      }
    ]
  },
  {
    name: 'pasteByID_onlyContent',
    unique: true,
    serialized: true,
    source: q.Collection('pastes'),
    terms: [
      {
        field: ['data', 'pasteId']
      }
    ],
    values: [
      {
        field: ['data', 'content']
      }
    ]
  },
  {
    name: 'pastes_by_userRef',
    serialized: true,
    source: q.Collection('pastes'),
    terms: [
      {
        field: ['data', 'user']
      }
    ],
    values: [
      {
        field: ['data', 'createdDate'],
        reverse: true
      },
      {
        field: ['ref']
      }
    ]
  },
  {
    name: 'user_by_id',
    unique: true,
    serialized: true,
    source: q.Collection('users'),
    terms: [
      {
        field: ['data', 'user']
      }
    ]
  }
];

const Roles = [
  {
    name: 'NormalUser',
    privileges: [
      {
        resource: q.Collection('pastes'),
        actions: {
          read: true,
          write: true,
          create: true,
          delete: true
        }
      },
      {
        resource: q.Collection('apis'),
        actions: {
          read: true,
          create: true
        }
      },
      {
        resource: q.Collection('users'),
        actions: {
          read: true,
          write: true
        }
      },
      {
        resource: q.Index('user_by_id'),
        actions: {
          read: true
        }
      },
      {
        resource: q.Index('pasteByID'),
        actions: {
          read: true
        }
      },
      {
        resource: q.Index('pasteByID_onlyContent'),
        actions: {
          read: true
        }
      },
      {
        resource: q.Index('apiByUserSub'),
        actions: {
          read: true
        }
      },
      {
        resource: q.Index('pastes_by_userRef'),
        actions: {
          read: true
        }
      },
      {
        resource: q.Index('latestPublicPastesByDate'),
        actions: {
          read: true
        }
      }
    ],
    membership: [
      {
        resource: q.Collection('users')
      }
    ]
  },
  {
    name: 'PublicUser',
    privileges: [
      {
        resource: q.Collection('pastes'),
        actions: {
          read: true,
          create: true
        }
      },
      {
        resource: q.Index('pasteByID'),
        actions: {
          read: true
        }
      },
      {
        resource: q.Index('pasteByID_onlyContent'),
        actions: {
          read: true
        }
      },
      {
        resource: q.Collection('users'),
        actions: {
          read: true
        }
      },
      {
        resource: q.Index('latestPublicPastesByDate'),
        actions: {
          read: true
        }
      }
    ]
  }
];

module.exports = { Collections, Indexes, Roles };
