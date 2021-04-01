import {html, render} from 'https://unpkg.com/lit-html?module';

const articleTemplate = (article) = html `
    <article>
        <header>
            <h3>${article.title}</h3>
        </header>
        <div class="article-content">
            <p>${article.content}
            </p>
        </div>
        <footer> Author: ${article.author}</footer>
    </article>`;

async function start(){
    const articles = await (await fetch('./articles.json')).json();
    const main = document.getElementById('content');

    console.log(articles[0]);

    const article = articleTemplate(articles[0]);
    render(article, main);
}


start();
//1:51:41