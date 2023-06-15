import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { selectFilter } from 'redux/selectors';
import { setFilter } from 'redux/filterSlice';
import styles from './filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  return (
    <div className={styles.div}>
      <label className={styles.label}>
        Find contact by name
        <input
          className={styles.input}
          type="text"
          name="filter"
          value={filter}
          onChange={event => dispatch(setFilter(event.target.value.trim()))}
        ></input>
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string,
};
