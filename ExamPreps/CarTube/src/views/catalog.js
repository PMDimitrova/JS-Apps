import {html} from '../../node_modules/lit-html/lit-html.js';
import {getAllListings, getCollectionSize} from "../api/data.js";

const catalogTemplate = (cars) => html`
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">

            ${cars.length === 0 ? html`<p class="no-cars">
                No cars in database.
            </p>` : cars.map(carTemplate)}

        </div>
    </section>`;

const carTemplate = (data) => html`
    <div class="listing">
        <div class="preview">
            <img src="${data.imageUrl}">
        </div>
        <h2>${data.brand} ${data.model}</h2>
        <div class="info">
            <div class="data-info">
                <h3>Year: ${data.year}</h3>
                <h3>Price: ${data.price} $</h3>
            </div>
            <div class="data-buttons">
                <a href="/details/${data._id}" class="button-carDetails">Details</a>
            </div>
        </div>
    </div>`;

export async function catalogPage(ctx){
    const cars = await getAllListings();

    ctx.render(catalogTemplate(cars))
}

/* Pagination
const catalogTemplate = (cars, page, pages) => html`
    <section id="car-listings">
        <h1>Car Listings</h1>
        <div class="listings">
            <div>
                Page ${page} / ${pages}  
                ${page > 1 ? html`<a class="button-list" href="/all-listings?page=${page-1}">&lt; Prev</a>` : ''}
                ${page < pages ? html`<a class="button-list" href="/all-listings?page=${page+1}">Next &gt;</a>` : ''}
            </div>
            ${cars.length === 0 ? html`<p class="no-cars">
                No cars in database.
            </p>` : cars.map(carTemplate)}

        </div>
    </section>`;

export async function catalogPage(ctx){
    const page = Number(ctx.querystring.split('=')[1]) || 1;

    const count = await getCollectionSize();
    const pages = Math.ceil(count/3); //3 because we want 3 items per page
    const cars = await getAllListings(page);

    ctx.render(catalogTemplate(cars,page, pages))
}

 */