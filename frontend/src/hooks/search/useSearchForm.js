import { useState } from 'react';

const initialSearchData = { city: '', check_in: '', check_out: '', quantity: 0, people: 0 };

const useSearchForm = (initialData = initialSearchData) => {
    const [search, setSearch] = useState(initialData);

    const setSearchField = (field, value) => {
        setSearch((prev) => ({ ...prev, [field]: value }));
    };

    const resetSearch = () => {
        setSearch(initialSearchData);
    };

    return {
        search,
        setSearchField,
        setSearch,
        resetSearch,
    };
};

export default useSearchForm;
