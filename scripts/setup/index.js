require('dotenv').config({ path: './.env.local' });

const { q, client, FaunaSecret } = require('./fauna.js');
const { Collections, Indexes, Roles } = require('./stuff.js');

async function createCollections() {
  /* CREATE THE COLLECTONS */
  console.log('Creating Collections...');
  await client
    .query(q.Map(Collections, q.Lambda('col', q.CreateCollection(q.Var('col')))))
    .then(() => {
      console.log(`Successfully created the following collections: ${Collections}\n`);
    })
    .catch((e) => {
      console.log('error collections');
      console.error(e);
    });
}

async function createIndexes() {
  /* CREATE THE INDEXES */
  console.log('Creating Indexes...');
  await client
    .query(q.Map(Indexes, q.Lambda('index', q.CreateIndex(q.Var('index')))))
    .then(() => {
      console.log('Sucessfully created the INDEXES...\n');
    })
    .catch((e) => {
      console.log('error indexes');
      console.error(e);
    });
}

async function createRoles() {
  /* CREATE THE ROLES */
  console.log('Creating Roles...');
  await client
    .query(q.Map(Roles, q.Lambda('role', q.CreateRole(q.Var('role')))))
    .then(() => {
      console.log('Successfully created the ROLES...\n');
    })
    .catch((e) => {
      console.log('error roles');
      console.error(e);
    });
}

async function setup() {
  // check if secret is blank or not
  if (!FaunaSecret || FaunaSecret.includes(' ')) {
    console.error('KeyError! Invalid `FAUNADB_SECRET_KEY`');
  }

  await createCollections();

  await createIndexes();

  await createRoles();

  // FINISHING
  console.log('-- SETUP DONE!-- ');
  console.log(`
Create a Public Token
- Go to Security > Keys > New Key
- Select the PublicUser as the role
- Paste the key in your .env.local in the field 'FAUNADB_LCLPASTE_PUBLIC_KEY'
  `);
}

(async () => {
  await setup();
})();
