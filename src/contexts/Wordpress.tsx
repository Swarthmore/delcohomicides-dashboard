import * as React from "react";
import { FormattedIncident, RawIncident } from "../types/index";
import { flatten } from "../helpers";

interface WPContextData {
    isLoading: boolean
    incidents: RawIncident[]
    formatted: FormattedIncident[]
    isLoaded: boolean
}

export const WordpressContext = React.createContext<WPContextData>({
    isLoaded: false,
    isLoading: false,
    incidents: [],
    formatted: []
});

interface Props {
    children: React.ReactChild | React.ReactChildren
}

export default function WordpressContextProvider({ children }: Props) {

    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [incidents, setIncidents] = React.useState<RawIncident[]>([]);
    const [formatted, setFormatted] = React.useState<FormattedIncident[]>([]);
    const [isLoaded, setIsLoaded] = React.useState<boolean>(true);

    const baseURL = "https://delcohomicides.swarthmore.edu/wp-json/wp/v2/incidents";

    React.useEffect(() => {

        // gets the number of pages of records that can be returned from the API
        // perPage should be a number 
        async function getPaginationMeta(perPage: string) {

            if (+perPage < 1 || +perPage > 100) {
                throw new Error("perPage must be in between 1 and 100")
            }

            const url = new URL(baseURL);
            url.searchParams.set("page", "1");
            url.searchParams.set("per_page", perPage);
            const res = await fetch(url.toString());
            const headers = res.headers;
            const records = headers.get("X-WP-Total");
            const pages = headers.get("X-WP-TotalPages");

            //console.log({ records, pages });

            return { records, pages }
        }

        // get a page of data
        async function getPage(pageNumber: string, perPage: string) {
            const url = new URL(baseURL);
            url.searchParams.set("page", pageNumber);
            url.searchParams.set("per_page", perPage);

            const res = await fetch(url.toString());

            if (!res.ok) {
                console.error("Something is broken");
                return;
            }

            return await res.json();
        }

        // Load the posts asynchronously
        ; (async () => {

            setIsLoaded(false);
            setIsLoading(true);

            // get 10 records per page
            const perPage = "10";

            // get the number of records and pages
            const { pages } = await getPaginationMeta(perPage);

            // create a placeholder for all of the fetch calls that we will need to make
            // to get all of the incidents
            const promises = [];

            if (!pages) throw new Error('Could not determine the pagination metadata while attempting to fetch all incidents.');

            // iterate through each page of incidents, creating a promise during each
            // iteration. This promise gets pushed to the promises array
            for (let page = 1; page <= parseInt(pages); page++) {
                const promise = getPage(page.toString(), perPage);
                promises.push(promise);
            }

            // get all of the promised data in one call. Once the promises have resolved,
            // the data is flattened so that there is one array element per record
            // ie. [ {...record1}, {...record2}, {...record3} ]
            const incidents = flatten((await Promise.all(promises))) as RawIncident[];

            // format the incidents
            const formatted = incidents.map((incident: RawIncident) => ({
                id: incident.id,
                ...incident.acf
            }))

            //console.log({ name: 'Wordpress Context Provider', incidents, formatted });

            setFormatted(formatted);
            setIncidents(incidents);
            setIsLoading(false);
            setIsLoaded(true);
        })()

    }, [])

    return (
        <WordpressContext.Provider value={{ incidents, formatted, isLoading, isLoaded }}>
            {children}
        </WordpressContext.Provider>
    )

}