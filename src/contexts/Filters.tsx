import * as React from "react";
import { DGVField, ActiveMapLayer } from "../types/index";
export interface Filters {
    values: {
        startYear: number
        endYear: number
        maleCbox: boolean
        femaleCbox: boolean
        allGunsCbox: boolean
        genders: DGVField.Sex[]
        victimRaces: DGVField.VictimRace[]
        weaponTypes: DGVField.WeaponType[]
        activeLayer: ActiveMapLayer 
    }
    setters: {
        startYear: React.Dispatch<React.SetStateAction<number>>
        endYear: React.Dispatch<React.SetStateAction<number>>
        maleCbox: React.Dispatch<React.SetStateAction<boolean>>
        femaleCbox: React.Dispatch<React.SetStateAction<boolean>>
        allGunsCbox: React.Dispatch<React.SetStateAction<boolean>>
        victimRaces: React.Dispatch<React.SetStateAction<DGVField.VictimRace[]>>
        weaponTypes: React.Dispatch<React.SetStateAction<DGVField.WeaponType[]>>
        activeLayer: React.Dispatch<React.SetStateAction<ActiveMapLayer>>
    }
    defaultValues: {
        startYear: number
        endYear: number
        maleCbox: boolean
        femaleCbox: boolean
        genders: DGVField.Sex[]
        allGunsCbox: boolean
        victimRaces: DGVField.VictimRace[]
        weaponTypes: DGVField.WeaponType[]
        activeLayer: ActiveMapLayer 
    }
}

// default values
const START = 2005;
const END = 2019;
const MCBOX = true;
const FCBOX = true;
const GENDERS: DGVField.Sex[] = ["Male", "Female"];
const AGCBOX = false;
const RACES: DGVField.VictimRace[] = ["Black", "White", "Unknown", "Asian/Pacific Islander","Missing","Hispanic"];
const WEPS: DGVField.WeaponType[] = ["Knife/Cutting Instrument", "Firearm", "Missing", "Blunt Object", "Other", "Rifle", "Asphyxiation", "Strangulation", "Drugs/Narcotics/Sleeping Pills", "Unknown", "Other Gun", "Shotgun", "Personal Weapons", "Fire/Incendiary Device", "Handgun"];
const LAYER = "No active layer";

export const FiltersContext = React.createContext<Filters>({
    values: {
        startYear: START,
        endYear: END,
        maleCbox: MCBOX,
        femaleCbox: FCBOX,
        genders: GENDERS,
        allGunsCbox: AGCBOX,
        victimRaces: RACES,
        weaponTypes: WEPS,
        activeLayer: LAYER
    },
    setters: {
        startYear: (value: number) => {},
        endYear: (value: number) => {},
        maleCbox: (value: boolean) => {},
        femaleCbox: (value: boolean) => {},
        allGunsCbox: (value: boolean) => {},
        victimRaces: (races: DGVField.VictimRace[]) => {},
        weaponTypes: (weapons: DGVField.WeaponType[]) => {},
        activeLayer: (value: ActiveMapLayer) => {}
    },
    defaultValues: {
        startYear: START,
        endYear: END,
        maleCbox: MCBOX,
        femaleCbox: FCBOX,
        genders: GENDERS,
        allGunsCbox: AGCBOX,
        victimRaces: RACES,
        weaponTypes: WEPS,
        activeLayer: LAYER
    },
});

interface Props {
    children: React.ReactChild | React.ReactChildren
}

export default function FiltersContextProvider({ children }: Props) {
    
    const [start, setStart] = React.useState(START);
    const [end, setEnd] = React.useState(END);
    const [maleCbox, setMaleCbox] = React.useState(MCBOX);
    const [femaleCbox, setFemaleCbox] = React.useState(FCBOX);
    const [genders, setGenders] = React.useState<DGVField.Sex[]>(GENDERS);
    const [allGunsCbox, setAllGunsCbox] = React.useState(AGCBOX);
    const [victimRaces, setVictimRaces] = React.useState<DGVField.VictimRace[]>(RACES);
    const [weaponTypes, setWeaponTypes] = React.useState<DGVField.WeaponType[]>(WEPS);
    const [activeLayer, setActiveLayer] = React.useState<ActiveMapLayer>(LAYER);

    // when maleCbox or femaleCbox changes, make sure to populate genders[]
    // TODO: this runs twice
    React.useEffect(() => {
        const g = [];
        if (maleCbox) g.push("Male");
        if (femaleCbox) g.push("Female");
        setGenders(g); 
    }, [])

    return (
        <FiltersContext.Provider value={{ 
            values: {
                startYear: start,
                endYear: end,
                maleCbox,
                femaleCbox,
                genders,
                allGunsCbox,
                victimRaces,
                weaponTypes,
                activeLayer
            },
            setters: {
                startYear: setStart,
                endYear: setEnd,
                maleCbox: setMaleCbox,
                femaleCbox: setFemaleCbox,
                allGunsCbox: setAllGunsCbox,
                victimRaces: setVictimRaces,
                weaponTypes: setWeaponTypes,
                activeLayer: setActiveLayer
            },
            defaultValues: {
                startYear: START,
                endYear: END,
                maleCbox: MCBOX,
                femaleCbox: FCBOX,
                genders: GENDERS,
                allGunsCbox: AGCBOX,
                victimRaces: RACES,
                weaponTypes: WEPS,
                activeLayer: LAYER
            }
        }}>
            {children}
        </FiltersContext.Provider>
    )

}
