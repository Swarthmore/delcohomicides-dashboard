/**
 * Returns a subset of incidents based on the given filters
 *
 * @param {{ incidents: any[], years: number[], races: string[], genders: string[], weapons: string[] }} args
 * @returns
 */
export const filterIncidents = ({
  incidents,
  years,
  races,
  genders,
  weapons,
}) => {
  const yearStrings = years.map((year) => year.toString());

  return incidents
    .filter((i) => races.includes(i["victim_race"]))
    .filter((i) => yearStrings.includes(i["year"]))
    .filter((i) => genders.includes(i["victim_sex"]))
    .filter((i) => weapons.includes(i["weapon_type_pa_ucr"]));
};

/**
 * Groups incident data by year and race.
 * @param incidents
 * @param years string[] The years to group
 * @param races string[] The victim races to group
 * @return {{
 *     [year]: {
 *         [race]: any[]
 *     }
 * }}
 */
export const groupIncidentsByYearAndVictimRace = ({
  incidents,
  years,
  races
}) => {
  // The placeholder for the grouped data
  let data = {};

  // For each year
  for (let y = 0; y < years.length; y++) {
    // If the year key isn't set, define it
    if (data[years[y]] === undefined) {
      data[years[y]] = {};
    }

    // For each race
    for (let r = 0; r < races.length; r++) {
      // If the race key for the year isn't set, set it to an empty array
      // This array is what we will push data to
      if (data[years[y]][races[r]] === undefined) {
        data[years[y]][races[r]] = [];
      }

      // For each incident
      for (let i = 0; i < incidents.length; i++) {
        if (
            years[y].toString() === incidents[i]["year"] &&
            races[r] === incidents[i]["victim_race"]
        ) {
            data[years[y]][races[r]].push(incidents[i]);
        }
      }
    }
  }

  return data;
};

/**
 * Generates the data for the homicides over time chart
 * @param grouped
 * @return {[]}
 */
export const victimsByRaceByYearChartData = ({ grouped }) => {
  const data = [];
  for (const year in grouped) {
    const item = { name: year };
    let totalForYear = 0
    for (const race in grouped[year]) {
      totalForYear += grouped[year][race].length
      item[race] = grouped[year][race].length;
    }
    item['total'] = totalForYear
    data.push(item);
  }
  return data;
};

/**
 * Generates the data for the victims by age chart
 * @param grouped
 * @return {[]}
 */
export const victimsByAgeBarChartData = (grouped) => {
  const data = [];

  for (const key in grouped) {
    const dataItem = {
      name: key,
      victims: grouped[key].length,
    };
    data.push(dataItem);
  }

  return data;
};

/**
 * Groups incidents data by the victim's age group
 * @param incidents
 * @return {{"50+": [], "20-29": [], "30-39": [], "40-49": [], "0-12": [], "13-19": []}}
 */
export const groupIncidentsByAgeGroups = (incidents) => {
  // set up the incident age groups
  const parsed = {
    "0-12": [],
    "13-19": [],
    "20-29": [],
    "30-39": [],
    "40-49": [],
    "50+": []
  };

  for (let i = 0; i < incidents.length; i++) {
    if (!incidents[i]["victim_age"]) {
      continue;
    }

    // try to parse the victim_age out of the data
    const victimAge = parseInt(incidents[i]["victim_age"], 10);

    // determine the age group and push it to the parsed object

    // if the victim age can't be parsed as a number, push the incident to the unknown ages group
    if (0 <= victimAge && victimAge <= 12) {
      parsed["0-12"].push(incidents[i]);

    // 13-19
    } else if (13 <= victimAge && victimAge <= 19) {
      parsed["13-19"].push(incidents[i]);

    // 20-29
    } else if (20 <= victimAge && victimAge <= 29) {
      parsed["20-29"].push(incidents[i]);

    // 30-39
    } else if (30 <= victimAge && victimAge <= 39) {
      parsed["30-39"].push(incidents[i]);

    // 40-49
    } else if (40 <= victimAge && victimAge <= 49) {
      parsed["40-49"].push(incidents[i]);

    // 50+
    } else if (victimAge >= 50) {
      parsed["50+"].push(incidents[i]);
    }
  }

  return parsed;
};

/**
 * @param incidents the incident data
 * @return {any[]} an array of years
 */
export const getUniqueYearsFromIncidents = (incidents) =>
  [...new Set(incidents.map((incident) => parseInt(incident["year"])))].sort(
    (a, b) => a - b
  );

/**
 * @param incidents the incident data
 * @return {any[]} an array of victim races
 */
export const getUniqueWeaponsFromIncidents = (incidents) => {
  const weapons = [
    ...new Set(incidents.map((incident) => incident["weapon_type_pa_ucr"])),
  ];
  return weapons.filter((weapon) => weapon !== "").sort((a, b) => a - b);
};

/**
 * Returns the unique victim ages from the incident data, tries to parse it to a number, then filters out all NaN entries
 * @param incidents the incident data
 * @return {any[]} an array of victim ages
 */
export const getUniqueVictimAgesFromIncidents = (incidents) => {
  const ages = [
    ...new Set(incidents.map((incident) => incident["victim_age"])),
  ];
  return ages
    .map((age) => parseInt(age))
    .filter((age) => !isNaN(age))
    .sort((a, b) => a - b);
};

/**
 * Returns the unique victim races from the incident data, and filters out all empty string entries
 * @param incidents the incident data
 * @return {any[]} an array of victim races
 */
export const getUniqueVictimRacesFromIncidents = (incidents) => {
  const races = [
    ...new Set(incidents.map((incident) => incident["victim_race"])),
  ];
  return races.filter((race) => race !== "").sort((a, b) => a - b);
};

/**
 * Filters the grouped by age raw data
 * @param groupedData
 * @param years number[]
 * @param races string[]
 * @param genders string[]
 * @returns The same structure as groupedData, but with the data filters active
 */
export const filterGroupedByAgeData = ({
  groupedData,
  years,
  races,
  genders,
  weapons,
}) => {
  const yearStrings = years.map((year) => year.toString());
  const ageGroups = Object.keys(groupedData);
  let buffer = groupedData;

  ageGroups.forEach((ageGroup) => {
    buffer[ageGroup] = groupedData[ageGroup]
      .filter((incident) => yearStrings.includes(incident["year"]))
      .filter((incident) => races.includes(incident["victim_race"]))
      .filter((incident) => genders.includes(incident["victim_sex"]))
      .filter((incident) => weapons.includes(incident["weapon_type_pa_ucr"]));
  });

  return buffer;
};

/**
 * Filters the grouped by year and victim race data
 * @param groupedData
 * @param years number[]
 * @param races string[]
 * @param genders string[]
 * @returns [
 *   { name: Year, black: number, white, number, asian, number, ...etc }
 * ]
 */
export const filterGroupedByYearAndVictimRaceData = ({
  groupedData,
  years,
  races,
  genders,
  weapons,
}) => {
  const yearStrings = years.map((year) => year.toString());
  const dataYears = Object.keys(groupedData);
  const buffer = {};

  dataYears.forEach((year) => {
    // If the year should be included, add it to the buffer
    if (yearStrings.includes(year)) {
      buffer[year] = {};

      // Iterate through the given races, so that they can be added to the buffer
      races.forEach((race) => {
        // Check if the filters yeild any incidents, we don't want to include empty arrays
        const hasIncidents = groupedData[year][race].length > 0;

        if (hasIncidents) {
          buffer[year][race] = groupedData[year][race]
            .filter((incident) => yearStrings.includes(incident["year"]))
            .filter((incident) => races.includes(incident["victim_race"]))
            .filter((incident) => genders.includes(incident["victim_sex"]))
            .filter((incident) =>
              weapons.includes(incident["weapon_type_pa_ucr"])
            );
        }
      });
    }
  });

  Object.keys(buffer).forEach((yearKey) => {
    Object.keys(buffer[yearKey]).forEach((raceKey) => {
      buffer[yearKey][raceKey] = buffer[yearKey][raceKey].length;
    });
  });

  // Transpose the result
  const data = [];

  for (const year in groupedData) {
    const item = { name: year };
    for (const race in groupedData[year]) {
      item[race] = groupedData[year][race].length;
    }
    data.push(item);
  }

  return data;
};
