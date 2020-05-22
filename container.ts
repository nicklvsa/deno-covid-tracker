import { soxa } from 'https://deno.land/x/soxa/mod.ts';
import { Nullable } from './types.ts';

export default class Container {
    private readonly BASE_URL: string = 'https://covid-19-data.p.rapidapi.com';
    private key: string = '';
    private host: string = '';

    constructor(rapidKey: string, rapidHost: string) {
        this.key = rapidKey;
        this.host = rapidHost;
    }

    public async getTodayByCountry(country: Nullable<string>): Promise<any> {
        const date: Date = new Date();
        const config = {
            baseURL: this.BASE_URL,
            headers: {
                'x-rapidapi-host': this.host,
                'x-rapidapi-key': this.key,
            },
            params: {
                'format': 'json',
                'data-format': '2020-01-01',
                'date': `${date.getFullYear()}-${date.getDay()}-${date.getDate()}`,
                'name': country,
            }
        };
        const response = await soxa.get('/report/country/name', config);
        return response;
    }

    public async getLatestByCountry(country: Nullable<string>): Promise<any> {
        const config = {
            baseURL: this.BASE_URL,
            headers: {
                'x-rapidapi-host': this.host,
                'x-rapidapi-key': this.key,
            },
            params: {
                'format': 'json',
                'name': country,
            }
        };
        
        const response = await soxa.get('/country', config);
        return response;
    }

    public async getLatestTotals(): Promise<any> {
        const config = {
            baseURL: this.BASE_URL,
            headers: {
                'x-rapidapi-host': this.host,
                'x-rapidapi-key': this.key,
            },
            params: {
                'format': 'json',
            }
        };

        const response = await soxa.get('/totals', config);
        return response;
    }
};