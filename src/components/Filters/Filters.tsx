import * as React from "react";
import VictimRacesField from "./fields/VictimRacesField/VictimRacesField";
import StartYearField from "./fields/StartYearField/StartYearField";
import EndYearField from "./fields/EndYearField/EndYearField";
import WeaponsField from "./fields/WeaponsField/WeaponsField";
import FemaleCheckboxField from "./fields/FemaleCheckboxField/FemaleCheckboxField";
import MaleCheckboxField from "./fields/MaleCheckboxField/MaleCheckboxField";
import AllGunsCheckboxField from "./fields/AllGunsCheckboxField/AllGunsCheckboxField";
import MapLayerField from "./fields/MapLayerField/MapLayerField";
import ClearAllButton from "./common/ClearAllButton/ClearAllButton";
import SelectAllButton from "./common/SelectAllButton/SelectAllButton";
import { useStyles } from "./useStyles";

export default function Filters() {

    const classes = useStyles();

    return (
        <div className={classes.root}> 
            <form noValidate onSubmit={e => e.preventDefault}>
                <div className={classes.fieldContainer} style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
                    <SelectAllButton color="primary" />
                    <ClearAllButton color="secondary" />
                </div>
                <div className={classes.fieldContainer}>
                    <div className={classes.yearFields}>
                        <StartYearField />
                        <EndYearField />
                    </div>
                </div>
                <div className={classes.fieldContainer}>
                    <WeaponsField />
                </div>
                <div className={classes.fieldContainer}>
                    <AllGunsCheckboxField />
                </div>
                <div className={classes.fieldContainer}>
                    <FemaleCheckboxField />
                    <MaleCheckboxField />
                </div>
                <div className={classes.fieldContainer}>
                    <VictimRacesField />
                </div>
                <div className={classes.fieldContainer}>
                    <MapLayerField />
                </div>
            </form>
        </div>
    );

}