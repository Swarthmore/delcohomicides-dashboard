import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { MultiSelect } from './MultiSelect'
import { YearSelect } from './YearSelect'

import {
  Box,
  Select,
  Checkbox,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Button,
} from "@material-ui/core";
import { useStyles } from './common/styles'

export const Filters = ({
  years,
  layers,
  races,
  weapons,
  handleFormChange,
  formState
}) => {

  const [fromYear, setFromYear] = useState(formState.fromYear);
  const [toYear, setToYear] = useState(formState.toYear);
  const [maleChecked, setMaleChecked] = useState(formState.maleChecked);
  const [femaleChecked, setFemaleChecked] = useState(formState.femaleChecked);
  const [victimRaces, setVictimRaces] = useState(formState.victimRaces);
  const [weaponTypes, setWeaponTypes] = useState(formState.weaponTypes);
  const [activeLayer, setActiveLayer] = useState(formState.activeLayer);
  
  const [allGunsCbox, setAllGunsCbox] = useState(formState.allGunsCbox);

  const classes = useStyles();

  const handleLayersChange = (event) => {
    setActiveLayer(event.target.value);
  };

  // Enables all filters
  const enableAllFilters = () => {
    const maxYear = Math.max.apply(Math, years);
    const minYear = Math.min.apply(Math, years);
    setFromYear(minYear);
    setToYear(maxYear);

    setVictimRaces(races);
    setFemaleChecked(true);
    setMaleChecked(true);
    setWeaponTypes(weapons);
  };

  // Clear all filters and reset back to initial state
  const clearAllFilters = () => {
    const maxYear = Math.max.apply(Math, years);
    setToYear(maxYear);
    setFromYear(parseInt(maxYear) - 1);
    
    setVictimRaces([]);
    setFemaleChecked(false);
    setMaleChecked(false);
    setActiveLayer(undefined);
    setWeaponTypes([]);
  };

  const handleDeleteRaceChip = (chipToDelete) => {
    setVictimRaces((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleDeleteWeaponChip = (chipToDelete) => {
    setWeaponTypes((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  // When the props change, call the handleFormChange function
  useEffect(() => {
    const form = {
      fromYear,
      toYear,
      maleChecked,
      femaleChecked,
      victimRaces,
      weaponTypes,
      activeLayer,
      allGunsCbox
    };
    handleFormChange(form);
  }, [
    fromYear,
    toYear,
    maleChecked,
    femaleChecked,
    victimRaces,
    weaponTypes,
    activeLayer,
    allGunsCbox
  ]);


  // pass in the current form value for weapon types and ADD all guns to it
  // duplicates will not be returned
  const selectAllGuns = arr => {
    // This is the list of weapon types that will be enabled when the useAllGuns filter is checked
    const allGunsList = ['Handgun', 'Firearm', 'Rifle', 'Other Gun', 'Shotgun', 'Handun']
    return Array.from(new Set([...arr, ...allGunsList]))
  }

  // pass in the current form value for weapon types and REMOVE all guns from it
  const removeAllGuns = arr => {
    // This is the list of weapon types that will be enabled when the useAllGuns filter is checked
    const allGunsList = ['Handgun', 'Firearm', 'Rifle', 'Other Gun', 'Shotgun', 'Handun']
    return arr.filter(item => !allGunsList.includes(item)).filter(i => i === i)
  }

  // create an effect so that if allGunsCbox is checked, select all the guns
  // in the weapon types section of the form
  useEffect(() => {
    // if allGunsCbox is checked then select all guns
    if (allGunsCbox) {
      setWeaponTypes(
        selectAllGuns(weaponTypes)
      )
    }

    // if allGunsCbox is NOT checked then de-select all guns
    if (!allGunsCbox) {
      setWeaponTypes(
        removeAllGuns(weaponTypes)
      )
    }
  }, [allGunsCbox])

  return (
    <Box display={"flex"} className={classes.root}>
      
      <Button
        className={classes.button}
        onClick={enableAllFilters}
        variant="contained"
        color="secondary"
      >
        Select all filters
      </Button>

      <Button
        className={classes.button}
        onClick={clearAllFilters}
        variant="contained"
        color="default"
      >
        Clear all filters
      </Button>

      <YearSelect label="From" options={years} year={formState.fromYear} onChange={e => setFromYear(e.target.value)} />
      <YearSelect label="Until" options={years} year={formState.toYear} onChange={e => setToYear(e.target.value)} />

      <MultiSelect
        label="Victim Race"
        onChange={e => setVictimRaces(e.target.value)}
        onDelete={handleDeleteRaceChip}
        options={races}
        selected={victimRaces}
      />
      
      <MultiSelect
        label="Weapon Type"
        onChange={e => setWeaponTypes(e.target.value)}
        onDelete={handleDeleteWeaponChip}
        options={weapons}
        selected={weaponTypes}
      />
          
      <FormControlLabel
        control={
          <Checkbox
            id={"use-all-guns-cbox"}
            checked={allGunsCbox}
            onChange={(event) => setAllGunsCbox(event.target.checked)}
          />
        }
        label={"Select all firearms"}
      />

      <FormControl component={"fieldset"} className={classes.formControl}>
        <FormLabel component={"legend"}>Victim Sex</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                id={"sex-male-checkbox"}
                checked={maleChecked}
                onChange={(event) => setMaleChecked(event.target.checked)}
              />
            }
            label={"M"}
          />

          <FormControlLabel
            control={
              <Checkbox
                id={"sex-female-checkbox"}
                checked={femaleChecked}
                onChange={(event) => setFemaleChecked(event.target.checked)}
              />
            }
            label={"F"}
          />
        </FormGroup>
      </FormControl>
      
      <FormControl className={classes.formControl}>
        <InputLabel id="map-layers-label">Active map layer</InputLabel>
        <Select
          labelId="map-layers-label"
          id="map-layers-select"
          value={activeLayer}
          onChange={handleLayersChange}
        >
          {layers.map((layer) => (
            <MenuItem key={layer} value={layer}>
              {layer}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

    </Box>
  );
};

Filters.propTypes = {
  years: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  handleFormChange: PropTypes.func.isRequired,
  layers: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  races: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  weapons: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};
