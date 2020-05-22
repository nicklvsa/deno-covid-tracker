import { WebView } from 'https://deno.land/x/webview/mod.ts';

export default class GUI {
    private width: number = 800;
    private height: number = 600;
    private title: string = '';

    constructor(width: number, height: number, title: string) {
        this.width = width;
        this.height = height;
        this.title = title;
    }

    public async showData(byCountry: any, totals: any): Promise<void> {
        const countryData: string = this.convToTable(byCountry.data);
        const totalsData: string = this.convToTable(totals.data);
        const view: WebView = new WebView({
            title: this.title,
            height: this.height,
            width: this.width,
            resizable: false,
            frameless: false,
            debug: true,
            url: `data:text/html,
                ${encodeURIComponent(`
                    <html>
                        <head>
                            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                            <title>${this.title}</title>
                        </head>
                        <body>
                            <div style="margin: 15px;">
                                <h3><strong>Latest</strong> Total Covid19 Data</h3>
                                ${totalsData}
                            </div>
                            <div style="margin: 15px">
                                <h3><strong>${byCountry.data[0].country}'s</strong> Covid19 Data</h3>
                                ${countryData}
                            </div>
                        </body>
                    </html>
                `)}
            `,
        });
        await view.run();
    }

    private convToTable(content: any) {
        const capitalize = (str: string): string => {
            return str.charAt(0).toUpperCase() + str.slice(1);
        };
        const cols = Object.keys(content[0]);
        let headerRow = '';
        let bodyRows = '';
        cols.map((col: any) => {
            headerRow += `<th>${capitalize(col)}</th>`;
            
        });
        content.map((row: any) => {
            bodyRows += '<tr>';
            cols.map((colName) => {
                bodyRows += `<td>${row[colName]}</td>`;
            });
            bodyRows += '</tr>';
        });
        return `<div class="table-responsive">
        <table class="table"><thead><tr>
            ${headerRow}
         '</tr></thead><tbody>
            ${bodyRows}
         '</tbody></table>
        </div>`;
    }
}