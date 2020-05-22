import { parse } from 'https://deno.land/std@0.50.0/flags/mod.ts';
import { TrackerData } from './types.ts';
const { args } = Deno;

type TrackerCallback = (data: TrackerData) => Promise<void>;

const appData: TrackerData = {country: null, limiter: null};
let usedHelp: boolean = false;

const helpMsg = (): string => {
    return `
        Covid19 Tracker v1.0
        -> Help <-
        -----------------------------------------------

        Available cli arguments:
            -h, --help:     "display this help message"
            -c, --country:  "show a country's data (USA, France, Italy, etc)"
            -l, --limit:    "this will limit amount of data being returned"
    `;
}

export const errMsg = (err: any): string => {
    return `
        Covid19 Tracker v1.0
        -> Error <-
        (This may mean an argument passed was invalid!)
        -----------------------------------------------

        An error occurred with the follow response:
        ${err}
    `;
};

export const CLI = async (callback: TrackerCallback): Promise<void> => {
    const parsed = parse(args);
    try {
        switch (Object.keys(parsed)[1]) {
            case 'h':
            case 'help':
                usedHelp = true;
                console.log(helpMsg());
                break;
    
            case 'c':
            case 'country':
                if (Object.keys(parsed).length > 1) {
                    appData.country = parsed.c || parsed.country;
                }
    
            case 'l':
            case 'limit':
                if (Object.keys(parsed).length > 1) {
                    appData.limiter = parseInt(parsed.l) || parseInt(parsed.limit);
                }

            default:
                break;
        }
        if (appData.country !== '' && appData.country !== null && appData.country !== undefined) {
            await callback(appData);
        } else {
            if (!usedHelp) {
                console.log(helpMsg());
            }
        }
    } catch(e) {
        console.log(errMsg(e));
    }
};