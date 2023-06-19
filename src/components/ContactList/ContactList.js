import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import styles from './contactList.module.css';
import {
  useGetContactsQuery,
  useDeleteContactsMutation,
} from 'redux/materialSlice';
import { selectFilter } from 'redux/selectors';

export const ContactList = () => {
  const { data: contacts, error, isLoading } = useGetContactsQuery();

  const [deleteContacts] = useDeleteContactsMutation();

  const { filter } = useSelector(state => selectFilter(state));

  const filtredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return (
      contacts &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      )
    );
  };

  const filteredContactList = filtredContacts();

  return (
    <div>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      <ul className={styles.list}>
        {contacts &&
          filteredContactList.map(contact => (
            <li className={styles.item} key={contact.id}>
              <span className={styles.name}>{contact.name}: </span>
              <span className={styles.phone}>{`tel: ${contact.phone}`} </span>

              <button
                className={styles.button}
                type="button"
                onClick={() => deleteContacts(contact.id)}
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};
