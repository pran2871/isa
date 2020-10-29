import Fuse from 'fuse.js';

export const filterArray = (options, filterValue, keyArray) => {

    let filterConfig = {
        includeScore: true,
        minMatchCharLength: 1,
        threshold: 0.5,
    };

    if (typeof options[0] !== 'string' && keyArray) {
        filterConfig = {
            ...filterConfig,
            keys: keyArray,
        }
    }

    const filteredRowsFuse = new Fuse(options, filterConfig);
    const filteredRowsData = filteredRowsFuse.search(filterValue);

    return filteredRowsData.map((filterRowDataObject) => filterRowDataObject.item);
}