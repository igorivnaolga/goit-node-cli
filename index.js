import { program } from 'commander';
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from './contacts.js';
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, ...data }) {
  switch (action) {
    case 'list':
      const contacts = await listContacts();
      return console.log(contacts);

    case 'get':
      const oneContact = await getContactById(id);
      return console.log(oneContact);

    case 'add':
      const newContact = await addContact(data);
      return console.log(newContact);

    case 'remove':
      const removedContact = await removeContact(id);
      return console.log(removedContact);

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(options);
