import React, {useImperativeHandle, useState } from 'react';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
import { BsX } from 'react-icons/bs';
import { BsSearch } from "react-icons/bs";
export interface SearchInputRef {
    clear: () => void;
}
interface SearchInputProps {
    onSearch?: (searchValue: string) => void;
    onChange?: (searchValue: string) => void;
  }

export const SearchInput = React.forwardRef<SearchInputRef, SearchInputProps>((
    props, ref) => {
 
    const [searchValue, setSearchValue] = useState('');

    const clear = () => {
        setSearchValue('');
        console.log("Child method invoked!");
    };

    useImperativeHandle(ref, () => ({
        clear
    }));

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && props.onSearch) {
            props.onSearch(event.currentTarget.value);
        }
    };

    const handleChange = (value: string) => {
        setSearchValue(value);
        if (props.onChange)
            props.onChange(searchValue);
    };

    const handleSearch = () => {
        if (props.onSearch)
            props.onSearch(searchValue)!;
    };

    const handleClear = () => {
        clear();
        if (props.onSearch)
            props.onSearch('')!;
    };

    return (
        <>
            <InputGroup>
                <FormControl
                    placeholder="Search..."
                    value={searchValue}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => handleChange(e.target.value)}
                />

            </InputGroup>
            {(
                <Button size="sm" variant="outline-secondary" onClick={handleSearch}>
                   <BsSearch />
                </Button>
            )}
            {searchValue && (
                <Button size="sm" variant="outline-secondary" onClick={handleClear}>
                    <BsX />
                </Button>
            )}

        </>
    );
});

