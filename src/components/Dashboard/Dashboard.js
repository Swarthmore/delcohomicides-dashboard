import React, { useEffect, useState, useContext } from "react";
import { VictimsByAge, VictimsByRace, HomicidesOverTime, VictimsMap } from "./Visualizations";
import { getUniqueVictimRacesFromIncidents, getUniqueYearsFromIncidents, getUniqueWeaponsFromIncidents, filterIncidents } from "../../processors";
import { fillYearsArray, getPercentageChange } from "../../helpers";
import { Drawer } from "@material-ui/core";
import { FilterButton } from "./FilterButton";
import { Filters } from "./Filters";
import { useStyles } from "./useStyles"
import { WordpressContext } from "../../contexts/Wordpress";

const initialFormState = {
    toYear: 2018,
    fromYear: 2005,
    maleChecked: true,
    femaleChecked: true,
    victimRaces: ["Black", "White", "Unknown", "Asian/Pacific Islander","Missing","Hispanic", "missing"],
    weaponTypes: ["Knife/Cutting Instrument", "Handgun", "Firearm", "Missing", "Blunt Object", "Other", "Rifle", "Asphyxiation", "Strangulation", "Drugs/Narcotics/Sleeping Pills", "Unknown", "Other Gun", "Shotgun", "Personal Weapons", "Not Applicable", "Fire/Incendiary Device", "Handgun"],
    activeLayer: ["No active layer"],
    allGunsCbox: true 
}

export const Dashboard = () => {
    
    const { isLoading, isLoaded, incidents, formatted: allIncidents } = useContext(WordpressContext);
    
    const [filteredIncidents, setFilteredIncidents] = useState([]);
    const [filtersOpen, setFiltersOpen] = useState(false)
    
    // Form filters
    const [toFilter, setToFilter] = useState(2018);
    const [fromFilter, setFromFilter] = useState(2017);
    const [gendersFilter, setGendersFilter] = useState([]);
    const [victimRacesFilter, setVictimRacesFilter] = useState([]);
    const [weaponTypesFilter, setWeaponTypesFilter] = useState([]);
    const [activeLayer, setActiveLayer] = useState(undefined);
    const [years, setYears] = useState([]);
    
    const [formState, setFormState] = useState(initialFormState)
    
    // return the array of incidents occuring in given year
    const incidentsInYear = (arr, yr) => arr.filter(
        (inc) => inc.year === yr.toString()
        ).length;
        
        const getLayerValues = () => [
            "No active layer",
            "Median income",
            "Homicide rates",
            "% non-white",
            "Pop. density",
            "Municipalities"
        ];
        
        // note: this will run once when the filters drawer is open
        const handleFilterChange = ({
            toYear,
            fromYear,
            maleChecked,
            femaleChecked,
            victimRaces,
            weaponTypes,
            activeLayer,
            allGunsCbox
        }) => {
            setToFilter(toYear);
            setFromFilter(fromYear);
            
            const genders = [];
            
            if (femaleChecked) {
                genders.push("Female");
            }
            
            if (maleChecked) {
                genders.push("Male");
            }
            
            setFormState({
                toYear,
                fromYear,
                maleChecked,
                femaleChecked,
                victimRaces,
                weaponTypes,
                activeLayer,
                allGunsCbox
            })
            
            setGendersFilter(genders);
            setVictimRacesFilter(victimRaces);
            setWeaponTypesFilter(weaponTypes);
            setActiveLayer(activeLayer);
        };
        
        // When any part of the filters changes, update the filtered incidents
        useEffect(() => {
            const filtered = filterIncidents({
                incidents: allIncidents,
                years: years,
                races: victimRacesFilter,
                genders: gendersFilter,
                weapons: weaponTypesFilter,
            });
            setFilteredIncidents(filtered);
        }, [gendersFilter, victimRacesFilter, weaponTypesFilter]);
        
        // When all incidents changes, get the unique parts from it, and set it in the state
        useEffect(() => {
            const yearValues = getUniqueYearsFromIncidents(allIncidents);
            const raceValues = getUniqueVictimRacesFromIncidents(allIncidents);
            const weaponTypeValues = getUniqueWeaponsFromIncidents(allIncidents);
            setYears(yearValues);
            setVictimRacesFilter(raceValues);
            setWeaponTypesFilter(weaponTypeValues);
        }, [allIncidents]);
        
        // When the from and to filter changes, fill the years array and set it in the state
        useEffect(() => {
            const ys = fillYearsArray(fromFilter, toFilter);
            setYears(ys);
        }, [fromFilter, toFilter]);
        
        const allYears = getUniqueYearsFromIncidents(allIncidents);
        const allRaces = getUniqueVictimRacesFromIncidents(allIncidents);
        const allWeapons = getUniqueWeaponsFromIncidents(allIncidents);
        const allLayers = getLayerValues();
        
        // when allIncidents changes, make sure the filtered incidents get updated
        useEffect(() => {
            const filtered = filterIncidents({
                incidents: allIncidents,
                years: years,
                races: victimRacesFilter,
                genders: gendersFilter,
                weapons: weaponTypesFilter,
            });
            setFilteredIncidents(filtered);
        }, [allIncidents])
        
        // makeStyles hooks
        const classes = useStyles();
        
        // close the filters drawer
        const closeFilters = () => {
            setFiltersOpen(false)
        }
        
        // open the filters drawer
        const openFilters = () => {
            setFiltersOpen(true)
        }
        
        return (
            <React.Fragment>
            
            <div className={classes.dashboard}>
        
            <Drawer className={classes.drawer} anchor="right" open={filtersOpen} onClose={closeFilters}>
                <Filters
                    years={allYears}
                    layers={allLayers}
                    races={allRaces}
                    weapons={allWeapons}
                    handleFormChange={handleFilterChange}
                    formState={formState}
                />
            </Drawer>
            
            {/* Show some stats about the current filters */}
            <div className={classes.flexRow}>
                <div className={classes.stats}>
                    Showing <span className={classes.bigStat}>{filteredIncidents.length}</span> total incidents from <span className={classes.bigStat}>{fromFilter}</span> to <span className={classes.bigStat}>{toFilter}</span>
                </div>
            </div>
            
            {/* Show the top row which should contain small cards indicating a singular point of data, such as total number of homicides in 2020 */}
            <div className={classes.flexRow}>
            
                <div className={classes.smallCard}>
                    <div className={classes.smallCardTitle}>{`${fromFilter} Total Homicides`}</div>
                    <div className={classes.smallCardValue}>{filteredIncidents.length === 0 ? "NA" : incidentsInYear(filteredIncidents, fromFilter)}</div>
                </div>
            
                <div className={classes.smallCard}>
                    <div className={classes.smallCardTitle}>{`${toFilter} Total Homicides`}</div>
                    <div className={classes.smallCardValue}>{filteredIncidents.length === 0 ? "NA" : incidentsInYear(filteredIncidents, toFilter)}</div>
                </div>
            
                <div className={classes.smallCard}>
                    <div className={classes.smallCardTitle}>{`% Change from ${fromFilter} to ${toFilter}`}</div>
                    <div className={classes.smallCardValue}>
                        {getPercentageChange(incidentsInYear(filteredIncidents, fromFilter), incidentsInYear(filteredIncidents, toFilter)) > 0 && "+"}{getPercentageChange(incidentsInYear(filteredIncidents, fromFilter), incidentsInYear(filteredIncidents, toFilter))}%
                    </div>
                </div>
            
                <div className={classes.actionsContainer}>
                    <FilterButton onClick={openFilters} variant="contained" color="secondary" />
                </div>
            </div>
            
            <div className={classes.mainChart}>
                <VictimsMap
                    incidents={filteredIncidents}
                    activeLayer={activeLayer}
                    className={classes.gmap}
                />
            </div>
            
            <div className={classes.secondaryCharts}>
                <div className={classes.secondaryChart}>
                    <HomicidesOverTime
                        incidents={filteredIncidents}
                        years={years}
                        races={victimRacesFilter}
                        weapons={weaponTypesFilter}
                        genders={gendersFilter}
                        isDarkMode={false}
                    />
                </div>
                <div className={classes.secondaryChart}>
                    <VictimsByAge
                        incidents={filteredIncidents}
                        years={years}
                        races={victimRacesFilter}
                        weapons={weaponTypesFilter}
                        genders={gendersFilter}
                        isDarkMode={false}
                    />
                </div>
                <div className={classes.secondaryChart}>
                    <VictimsByRace
                        incidents={filteredIncidents}
                        years={years}
                        races={victimRacesFilter}
                        weapons={weaponTypesFilter}
                        genders={gendersFilter}
                        isDarkMode={false}
                    />
                </div>
            </div>
            
            </div>
            
            </React.Fragment>
            );
        };