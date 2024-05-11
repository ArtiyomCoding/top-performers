import { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Chip from "@mui/material/Chip";
import Checkbox from "@mui/material/Checkbox";
import { useGetFiltersMutation } from "../slices/api/itemsApiSlice.js";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const DiagramFilters = ({
  selectedFilters,
  setSelectedFilters,
  handleApply,
}) => {
  const [filters, setFilters] = useState({
    categories: [],
    types: [],
    brands: [],
    price_bounds: [],
    genders: [{ name: "female" }, { name: "male" }, { name: "diverse" }],
  });

  const [valid, setValid] = useState(true);

  const [getFilters] = useGetFiltersMutation();

  useEffect(() => {
    (async () => {
      const result = await getFilters({
        selectedFilters,
      }).unwrap();
      setFilters({ ...filters, ...result });
    })();
  }, []);

  const filterHandler = (event, values, column) => {
    const selected = values.map((value) => value.name);
    setSelectedFilters((selectedFilters) => ({
      ...selectedFilters,
      [column]: selected,
    }));
  };

  const handleXAxisFilter = (event, value) => {
    setSelectedFilters((selectedFilters) => ({
      ...selectedFilters,
      comparee: event.target.value,
    }));
  };

  const handlYXAxisFilter = (event, value) => {
    setSelectedFilters((selectedFilters) => ({
      ...selectedFilters,
      xUnits: event.target.value,
    }));
  };

  const handleAgeTextField = (event, value) => {
    const reg = new RegExp(
      `^([0123456789]+-[0123456789]+,)*[0123456789]+-[0123456789]+$`
    );
    const v = reg.test(event.target.value);
    setValid(v);
    setSelectedFilters((selectedFilters) => ({
      ...selectedFilters,
      age_group: event.target.value,
    }));
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          <div>
            <div style={{ float: "left", margin: "0 5px 0 0" }}>
              <FormControl fullWidth>
                <InputLabel id="y-axis-select">X-Units</InputLabel>
                <Select
                  value={selectedFilters.xUnits}
                  label="y-Axis"
                  onChange={handlYXAxisFilter}
                  style={{ width: 102 }}
                >
                  <MenuItem value={"quarter"}>Quarter</MenuItem>
                  <MenuItem value={"month"}>Month</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ float: "left", margin: "0 5px 0 0" }}>
              <FormControl fullWidth>
                <InputLabel id="x-axis-select">Compare</InputLabel>
                <Select
                  value={selectedFilters.comparee}
                  label="Age"
                  onChange={handleXAxisFilter}
                  style={{ width: 102 }}
                >
                  <MenuItem value={"brand"}>Brands</MenuItem>
                  <MenuItem value={"type"}>Types</MenuItem>
                  <MenuItem value={"gender"}>Gender</MenuItem>
                  <MenuItem value={"age_group"}>Age</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ float: "left", margin: "0 5px 0 0" }}>
              {selectedFilters.comparee == "brand" ? (
                <Autocomplete
                  multiple
                  id="brands-filter"
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  options={filters.brands}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option, { selected }) => {
                    const { key, ...restProps } = props;
                    return (
                      <li {...restProps} key={key}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                        <span style={{ position: "absolute", right: "10px" }}>
                          {option.count}
                        </span>
                      </li>
                    );
                  }}
                  renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                      <div key={option.name} />
                    ));
                  }}
                  style={{ width: 240 }}
                  onChange={(event, values) =>
                    filterHandler(event, values, "brands")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Brands"
                      placeholder="Search ..."
                    />
                  )}
                />
              ) : (
                ""
              )}
              {selectedFilters.comparee == "type" ? (
                <Autocomplete
                  multiple
                  id="types-filter"
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  options={filters.types}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option, { selected }) => {
                    const { key, ...restProps } = props;
                    return (
                      <li {...restProps} key={key}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                        <span style={{ position: "absolute", right: "10px" }}>
                          {option.count}
                        </span>
                      </li>
                    );
                  }}
                  renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                      <div key={option.name} />
                    ));
                  }}
                  style={{ width: 240 }}
                  onChange={(event, values) =>
                    filterHandler(event, values, "types")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Types"
                      placeholder="Search ..."
                    />
                  )}
                />
              ) : (
                ""
              )}
              {selectedFilters.comparee == "gender" ? (
                <Autocomplete
                  multiple
                  id="gender-filter"
                  isOptionEqualToValue={(option, value) =>
                    option.name === value.name
                  }
                  options={filters.genders}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option, { selected }) => {
                    const { key, ...restProps } = props;
                    return (
                      <li {...restProps} key={key}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.name}
                      </li>
                    );
                  }}
                  renderTags={(tagValue, getTagProps) => {
                    return tagValue.map((option, index) => (
                      <div key={option.name} />
                    ));
                  }}
                  style={{ width: 240 }}
                  onChange={(event, values) =>
                    filterHandler(event, values, "genders")
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Gender"
                      placeholder="Search ..."
                    />
                  )}
                />
              ) : (
                ""
              )}
              {selectedFilters.comparee == "age_group" ? (
                <TextField
                  id="age-textfield"
                  label="Age Group"
                  variant="outlined"
                  value={selectedFilters.age_group}
                  onChange={handleAgeTextField}
                  error={!valid}
                  helperText={valid ? "" : "Incorrect, e.g. 18-24,25-35"}
                />
              ) : (
                ""
              )}
            </div>
            <div style={{ float: "left", margin: "0 5px 0 0" }}>
              <Button
                id="apply"
                style={{ height: 56, width: 100 }}
                variant="contained"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </Box>
      </div>
    </>
  );
};

export default DiagramFilters;
