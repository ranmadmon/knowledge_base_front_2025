import React, {useState, useEffect} from 'react';
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import PropTypes from 'prop-types';
import {getCourses} from "../../API/CoursesAPI.jsx";
import {Autocomplete, Box, CircularProgress, IconButton, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../../Utils/Constants.jsx";

function Search({onSelect}) {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [searchIconColor, setSearchIconColor] = useState('inherit');

    const handleSearch = () => {
        navigate(SERVER_URL + "/search");
        setSearchIconColor('primary');
        setTimeout(() => {
            setSearchIconColor('inherit');
        }, 200);
    }


    useEffect(() => {
        const fetchCourses = async () => {
            setLoading(true);
            const courses = await getCourses();
            setOptions(courses.map(course => ({name: course.name, ...course})));
            setLoading(false);
        };
        fetchCourses();
    }, []);

    useEffect(() => {
        if (inputValue.length > 0) {
            const filtered = options.filter(option => option.name.toLowerCase().includes(inputValue.toLowerCase()));
            setFilteredOptions(filtered);
        } else {
            setFilteredOptions([]);
        }
    }, [inputValue, options]);

    return (
        <div className={"upper-container"}>
            <div className={"search"}>
                <h1 style={{display: "flex"}}>Search the knowledge base</h1>
                <div className={"search-bar-container"}>
                    <Autocomplete
                        id="asynchronous-demo"
                        sx={{width: '100%', padding: "10px"}}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                        getOptionLabel={(option) => option.name}
                        options={filteredOptions}
                        loading={loading}
                        inputValue={inputValue}
                        onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                        onChange={(event, newValue) => {
                            if (onSelect && newValue) {
                                onSelect(newValue);
                            }
                        }}
                        renderOption={(props, option) => (
                            <li {...props} key={option.courseId || option.name}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    {option.name}
                                </Box>
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="search..."
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20}/> : null}
                                            <IconButton
                                                onClick={handleSearch}
                                                sx={{ padding: 0, minWidth: 0 }}
                                            >
                                            <SearchRoundedIcon fontSize={"large"} color={searchIconColor}/>
                                            </IconButton>
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

Search.propTypes = {
    onSelect: PropTypes.func, // onSelect must be a function
};
export default Search;