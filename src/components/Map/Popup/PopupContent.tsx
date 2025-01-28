import {FC, JSX} from 'react';
import { PopupContentProps } from '../types';
import styles from './PopupContent.module.scss';

const PopupContent: ({data}: { data: any }) => JSX.Element = ({ data }) => {
    const sortedEntries = Object.entries(data).sort(([keyA], [keyB]) => {
        if (keyA === 'Sample Score') return -1;
        if (keyB === 'Sample Score') return 1;
        return 0;
    });

    return (
        <div className={styles.popupContent}>
            {sortedEntries.map(([key, value]) => (
                <div key={key} className={styles.row}>
                    <span className={styles.key}>{key}:</span>
                    <span className={styles.value}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </span>
                </div>
            ))}
        </div>
    );
};

export default PopupContent;