export namespace WP {
    export interface User {
        ID: number
        user_firstname: string
        user_lastname: string
        nickname: string
        user_nicename: string
        display_name: string
        user_email: string
        user_url: string
        user_registered: string
        user_description: string
        user_avatar: string 
    }
}

export namespace DGVField {
    
    export type HomicideType = "Manslaughter by Negligence" | "Murder and Nonnegligent Manslaughter"
    
    export type SituationType = "Multiple Victims/Multiple Offenders"
    | "Multiple Victims/Single Offender"
    | "Multiple Victims/Unknown Offender or Offenders"
    | "Single Victim/Multiple Offenders" 
    | "Single Victim/Single Offender"
    | "Single Victim/Unknown Offender or Offenders"
    
    export type InsideOutside = "Inside" | "Outside"
    
    export type HomeRuleMunicipality = "Chester Township"
    | "Haverford Township"
    | "Middletown Township"
    | "Radnor Township"
    | "Upper Darby Township"
    | "Upper Providence Township"
    
    export type Borough = "Aldan"
    | "Brookhaven"
    | "Chester Heights"
    | "Clifton Heights"
    | "Collingdale"
    | "Colwyn"
    | "Darby"
    | "East Lansdowne"
    | "Eddystone"
    | "Folcroft"
    | "Glenolden"
    | "Lansdowne"
    | "Marcus Hook"
    | "Media"
    | "Millbourne"
    | "Morton"
    | "Norwood"
    | "Parkside"
    | "Prospect Park"
    | "Ridley Park"
    | "Rose Valley"
    | "Rutledge"
    | "Sharon Hill"
    | "Swarthmore"
    | "Trainer"
    | "Upland"
    | "Yeadon"
    
    export type Township = 
    | "Aston Township"
    | "Bethel Township"
    | "Chadds Ford Township"
    | "Chester Township"
    | "Concord Township"
    | "Darby Township"
    | "Edgmont Township"
    | "Haverford Township"
    | "Lower Chichester Township"
    | "Marple Township"
    | "Middletown Township"
    | "Nether Providence Township"
    | "Newton Township"
    | "Radnor Township"
    | "Ridley Township"
    | "Springfield Township"
    | "Thornbury Township"
    | "Tinicum Township"
    | "Upper Chichester Township"
    | "Upper Darby Township"
    | "Upper Providence Township"
    
    export type CensusPlace = 
    | "Ardmore"
    | "Boothwyn"
    | "Broomall"
    | "Drexel Hill"
    | "Folsom"
    | "Haverford College"
    | "Lima"
    | "Linwood"
    | "Village Green-Green Ridge"
    | "Woodlyn"
    
    export type UnincorporatedCommunity = 
    | "Garrett Hill"
    | "Riddlewood"
    | "Rosemont"
    | "Villanova"
    | "Wallingford"
    | "Wawa"
    | "Wayne"
    | "Havertown"
    | "Glen Mills"
    | "Moylan"
    
    export type VictimRace = 
    | "Asian/Pacific Islander"
    | "Black"
    | "Hispanic"
    | "White"
    | "Other"
    | "Unknown"
    | "missing"
    
    export type VictimEthnicity = 
    | "Hispanic"
    | "Not of Hispanic Origin"
    | "Unknown"
    
    export type VictimSex = 
    | "Female"
    | "Male"
    
    export type RelationshipType = 
    | "Unknown Relationship"
    | "Acquaintance"
    | "Boyfriend"
    | "Brother"
    | "Common-Law wife"
    | "Daughter"
    | "Employee"
    | "Ex-Wife"
    | "Father"
    | "Friend"
    | "Girlfriend"
    | "Husband"
    | "Mother"
    | "Neighbor"
    | "Other-Known to Victim"
    | "Other Family"
    | "Son"
    | "Stepdaughter"
    | "Stepson"
    | "Stranger"
    | "Unknown"
    | "Victim Was Offender"
    | "Wife"
    
    export type VictimRelationshipToOffender =
    | "Girl/Boyfriend/Ex"
    | "Wife/Husband"
    | "Parent"
    | "Cousin"
    | "Sister"
    | "Brother"
    | "Friend"
    | "Daughter/Son"
    | "Police"
    | "Other"
    
    export type DeathCircumstance = 
    | "All Suspected Felony Type"
    | "Argument Over Money or Property"
    | "Arson"
    | "Brawl Due to Influence of Alcohol"
    | "Burglary"
    | "Child Killed by Babysitter"
    | "Children Playing with Gun"
    | "Felon Killed by Police"
    | "Felon Killed by Private Citizen"
    | "Gangland Killings"
    | "Lover's Triangle"
    | "Narcotic Drug Laws"
    | "Other"
    | "Other - Not Specified"
    | "Other Arguments"
    | "Other Manslaughter by Neg. Except Traffic"
    | "Other neg. Handling of Gun Results in Death"
    | "Other Sex Offense"
    | "Rape"
    | "Robbery"
    | "Unknown"
    
    export type Justified = 
    | "Default"
    | "Killed in Commission of a Crime"
    | "Criminal Attacked a Civilian"
    | "Criminal Attacked Police Officer and That Officer Killed Criminal"
    | "Crim. Attacked Police Off. and Crim. Killed by Another Off."
    
    export type Motive = 
    | "Drugs"
    | "Domestic"
    | "Argument"
    | "Sexual"
    | "Residential Robbery"
    | "Commercial Robbery"
    | "Highway Robbery"
    | "Child Abuse"
    | "Other"
    | "Retaliation"
    | "Suicide by Cop"
    | "Unknown"
    
    export type CauseOfDeath = 
    | "Narcotics"
    | "Blunt Force Trauma"
    | "Physical Assault"
    | "Knife/Edged Weapon"
    | "Strangle"
    | "Gunshot"
    | "Vehicle"
    | "Other"
    
    export type WeaponType = 
    | "Asphyxiation"
    | "Blunt Object"
    | "Drugs/Narcotics/Sleeping Pills"
    | "Fire/Incendiary Device"
    | "Firearm"
    | "Handgun"
    | "Knife/Cutting Instrument"
    | "Other"
    | "Other Gun"
    | "Personal Weapons"
    | "Rifle"
    | "Shotgun"
    | "Strangulation"
    | "Unknown"
    
    export type GunshotWoundLocation = 
    | "Abdomen"
    | "Back"
    | "Chest"
    | "Head Only"
    | "Head and Additional Area(s)"
    | "Multi Areas"
    | "No Head - Neck"
    | "Side"
    | "Shoulder"
    
    export type GunPurchase = "Legal" | "Illegal"
    
}

export interface IncidentFields {
    year: string
    date: string
    time: string
    location: string
    address: string
    homicide_type_pa_ucr: string
    situation_type_pa_ucr: string
    inside_outside: string
    city: string
    home_rule_municipality: string
    borough: string
    township: string
    census_place: string
    unincorporated_community: string
    police_district: string
    victims_pa_ucr: string
    victim: string
    victim_race: DGVField.VictimRace 
    victim_ethnicity: DGVField.VictimEthnicity
    victim_age: string
    victim_sex: string
    offenders_pa_ucr: string
    defendant: string
    defendant_2: string
    defendant_3: string
    defendant_race: string
    defendant_2_race: string
    defendant_3_race: string
    defendant_age: string
    defendant_2_age: string
    defendant_3_age: string
    defendant_sex: string
    defendant_2_sex: string
    defendant_3_sex: string
    relationship_type_pa_ucr: DGVField.RelationshipType
    victim_relationship_to_offender: DGVField.VictimRelationshipToOffender
    death_circumstance_pa_ucr: DGVField.DeathCircumstance
    justified_pa_ucr: DGVField.Justified
    motive: DGVField.Motive
    criminal_charges: string
    cause_of_death: DGVField.CauseOfDeath
    weapon_type_pa_ucr: DGVField.WeaponType
    automatic_weapon_pa_ucr: boolean 
    gunshot_wound: DGVField.GunshotWoundLocation
    caliber: string
    gun_purchase: DGVField.GunPurchase 
    data_entry?: WP.User 
    data_cleanup?: WP.User 
    comment: string
    source: string
    missing_data: string
    story_url_1: string
    story_url_2: string
    story_url_3: string
    story_url_4: string
    story_url_5: string
    story_url_6: string 
    photo_url_1: string 
    photo_url_2: string 
    citation: string 
}

export interface FormattedIncident extends IncidentFields {
    id: number
}

export interface RawIncident {
    id: number
    date: string
    date_gmt: string
    guid: {
        rendered: string
    }
    modified: string
    modified_gmt: string
    slug: string
    status: string
    type: "incident"
    link: string
    title: {
        rendered: string
    }
    template: string
    meta: string[]
    categories: string[]
    tags: string[]
    acf: IncidentFields
    _links: any
}