import { DGVField, FormattedIncident } from "./types";

interface Filters {
    years: string[]
    races: DGVField.VictimRace[]
    genders: DGVField.Sex[]
    weapons: DGVField.WeaponType[] 
}

export function filterIncidents(incidents: FormattedIncident[], filters: Filters) {
    return incidents
        .filter(i => filters.years.includes(i.year))
        .filter(i => filters.races.includes(i.victim_race))
        .filter(i => filters.genders.includes(i.victim_sex))
        .filter(i => filters.weapons.includes(i.weapon_type_pa_ucr))
}

/**
 * @note
 * @important
 * 
 * Metric should be one of the properties defined in the IncidentFields interface.
 */
type IncidentField = "year" | "victim_race" | "victim_ethnicity" | "victim_sex" | "weapon_type_pa_ucr";

export function groupBy(data: FormattedIncident[], field: IncidentField) {
    const fields = data.map(row => row[field]).filter(r => r)
    const output = {};
    fields.forEach(metric => {
        output[metric] = data.filter(row => row[field] === metric);
    });
    return output;
}

export function flatten(arr: any[]) {
    return arr.reduce(function (flat,  toFlatten) {
        return flat.concat(
        Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        );
    }, []);
};

export function fillYearsArray(start: string, end: string): number[] {
    let s = parseInt(start);
    const e = parseInt(end);
    const filled = [];
    while (s < e) {
      filled.push(s);
      s++;
    }
    filled.push(e);
    return filled;
  };

// parses the longitude and latitude from a coordinates string
export const parseCoordinates = (coordinates: string): number[] => {
    return coordinates
        .split(",")
        .map((c) => c.trim())
        .map((c) => parseFloat(c));
};
    
// calculates in percent, the change between 2 numbers.
export const getPercentageChange = (oldNumber: number, newNumber: number): number => {
    const decreaseValue = oldNumber - newNumber;
    const num = ((decreaseValue / oldNumber) * 100).toFixed(2);
    return parseFloat((+num * -1).toString());
};