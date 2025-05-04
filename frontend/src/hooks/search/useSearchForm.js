import { useState } from 'react';
import { getDate } from '@/utils/dateUtil';

const initialSearchData = { city: '', check_in: getDate(0), check_out: getDate(1), quantity: 0, people: 0 };

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
