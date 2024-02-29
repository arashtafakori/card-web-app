import React, { useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { BsSearch, BsX } from 'react-icons/bs'; // Importing search and X icons from react-icons library

function SearchInput() {
    const [searchValue, setSearchValue] = useState('');

    const handleClearSearch = () => {
        setSearchValue('');
    };

    return (

        <>
            <InputGroup>
                <FormControl
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />

            </InputGroup>
            {searchValue && (
                <Button size="sm" variant="outline-secondary">
                    <BsSearch />
                </Button>
            )}
            {searchValue && (
                <Button size="sm" variant="outline-secondary" onClick={handleClearSearch}>
                    <BsX />
                </Button>
            )}

        </>
    );
}

export default SearchInput;
