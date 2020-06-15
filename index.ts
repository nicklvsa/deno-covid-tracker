import { CLI } from './cli.ts';
import { TrackerData } from './types.ts';
import Container from './container.ts';
import GUI from './gui.ts';

// TODO: should load these values in from environment

const container: Container = new Container('YOUR_API_KEY', 'covid-19-data.p.rapidapi.com');
const gui: GUI = new GUI(1200, 400, 'Covid Tracker');

const tracker = async (data: TrackerData): Promise<void> => {
    if (data.country == null || data.country == '' || typeof data.country !== 'string') {
        data.country = 'USA'; // default to USA
    }

    const country: any = await container.getLatestByCountry(data.country);
    setTimeout(async () => { // had to bypass rate limiting by adding more than a second of delay :)
        const totals = await container.getLatestTotals();
        await gui.showData(country, totals);
    }, 1500);
};  

// initialize the cli with the tracker function as its callback
CLI(tracker);