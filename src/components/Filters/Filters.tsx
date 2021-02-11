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

export default function Filters() {

    return (
        <form noValidate onSubmit={e => e.preventDefault}>
            <SelectAllButton color="primary" />
            <ClearAllButton color="secondary" />
            <StartYearField />
            <EndYearField />
            <VictimRacesField />
            <WeaponsField />
            <FemaleCheckboxField />
            <MaleCheckboxField />
            <AllGunsCheckboxField />
            <MapLayerField />
        </form>
    );

}