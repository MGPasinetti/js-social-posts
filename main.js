/*
Descrizione
Ricreiamo un feed social aggiungendo al layout di base fornito, il nostro script JS in cui:
Nel file js avete un array di oggetti che rappresentano ciascun post.
Ogni post contiene le informazioni necessarie per stampare la relativa card:
id del post (numero progressivo da 1 a n),
nome autore,
foto autore,
data in formato americano (mm-gg-yyyy),
testo del post,
immagine (non tutti i post devono avere una immagine),
numero di likes.

Milestone 1 - Prendendo come riferimento il layout di esempio presente nell'html, stampiamo i post del nostro feed.

Milestone 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.

BONUS
1. Formattare le date in formato italiano (gg/mm/aaaa)
2. Gestire l'assenza dell'immagine profilo con un elemento di fallback che contiene le iniziali dell'utente (es. Luca Formicola > LF).
3. Al click su un pulsante "Mi Piace" di un post, se abbiamo già cliccato dobbiamo decrementare il contatore e cambiare il colore del bottone.

Consigli del giorno:
Ragioniamo come sempre a step.
Prima scriviamo nei commenti la logica in italiano e poi traduciamo in codice.
console.log() è nostro amico (provate anche la variante console.table() per array e oggetti, o ancora meglio con array di oggetti).
Quando un pezzo di codice funziona, chiediamoci se possiamo scomporlo in funzioni più piccole.
*/

// CONSTANTS
// creo un array di oggetti in cui ogni oggetto rappresenterà un post
const arrPosts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "06-25-2021"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": null,
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "09-03-2021"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "05-15-2021"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "04-03-2021"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": null,
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "03-05-2021"
    }
];

const eleContainer = document.querySelector(`.posts-list`);
const arrLikedPosts = [];

// creo un post per ciascun oggetto presente nell'array
for (let i = 0; i < arrPosts.length; i++) {
    renderPost(arrPosts[i]);
};

function renderPost(objPost) {
    const elePost = document.createElement(`div`);
    elePost.classList.add(`post`);
    elePost.innerHTML = `
                        <div class="post__header">
                            <div class="post-meta">                    
                                <div class="post-meta__icon">
                                    <img class="profile-pic" src="${objPost.author.image}" alt="${objPost.author.name}">                    
                                </div>
                                <div class="post-meta__data">
                                    <div class="post-meta__author">${objPost.author.name}</div>
                                    <div class="post-meta__time">${objPost.created}</div>
                                </div>                    
                            </div>
                        </div>
                        <div class="post__text">${objPost.content}</div>
                        <div class="post__image">
                            <img src="${objPost.media}" alt="">
                        </div>
                        <div class="post__footer">
                            <div class="likes js-likes">
                                <div class="likes__cta">
                                    <a class="like-button  js-like-button" href="#!" data-postid="${objPost.id}">
                                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                                        <span class="like-button__label">Mi Piace</span>
                                    </a>
                                </div>
                                <div class="likes__counter">
                                    Piace a <b id="like-counter-1" class="js-likes-counter">${objPost.likes}</b> persone
                                </div>
                            </div> 
                        </div> 
    `;

    eleContainer.append(elePost);
    /*
    MILESTONE 2 - Se clicchiamo sul tasto "Mi Piace" cambiamo il colore al testo del bottone e incrementiamo il counter dei likes relativo.
    Salviamo in un secondo array gli id dei post ai quali abbiamo messo il like.
    */

    const btnLike = elePost.querySelector(`.like-button`);
    const likeCounter = elePost.querySelector(`.js-likes-counter`);

    btnLike.addEventListener(`click`, likedPost);

    // fai funzione al click sul bottone
    function likedPost() {
        // cambio colore al bottone
        btnLike.classList.add(`like-button--liked`);

        // incremento il counter dei likes
        likeCounter.innerHTML = `${parseInt(objPost.likes + 1)}`;

        // salvo in un nuovo array gli id dei post piaciuti
        arrLikedPosts.push(objPost.id)
    };
};

console.log(arrLikedPosts);





