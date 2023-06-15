import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectVisibleContacts,
  selectError,
  selectIsLoading,
} from 'redux/selectors';
import styles from './contactList.module.css';
import { fetchContacts, deleteContact } from 'redux/operations';

export const ContactList = () => {
  const dispatch = useDispatch();

  const filteredContacts = useSelector(selectVisibleContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <div>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>{error}</p>}
      <ul className={styles.list}>
        {filteredContacts.map(contact => (
          <li className={styles.item} key={contact.id}>
            <span className={styles.name}>{contact.name}: </span>
            <span className={styles.phone}>{`tel: ${contact.phone}`} </span>

            <button
              className={styles.button}
              type="button"
              onClick={() => onDeleteContact(contact.id)}
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
