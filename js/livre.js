import { bookTags } from "./BookTags.js";

let Books = [];

const affichage_books = document.getElementById("affichage_books");
const loader = document.getElementById("loader");
const search_input = document.getElementById("search_input");

const getBooks = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/books");
  const data = await res.json();
  Books = data.data;
  AffichageBooks();
};

getBooks();

const AffichageBooks = (filtrage = "") => {
  loader.style.display = "none";
  affichage_books.innerHTML = "";

    Books.filter((book) =>
      book.title.toLowerCase().includes(filtrage.toLowerCase()),
    ).forEach((b) => {
      affichage_books.innerHTML += `
        <article class="rounded-lg">
            <div class="iamge">
                <img src="http://127.0.0.1:8000${b.image_url}" alt="" class="w-full h-full">
            </div>
            <div class="info-book mt-5 px-3">
                <h3 class="text-[22px] font-bold">${b.title}</h3>
                <p class="text-[18px] font-semibold line-clamp-2">${b.description}</p>
                <span>${b.author}</span>
                <div class="tags space-x-2" id="tags">
                    ${bookTags(b.tags)}
                </div>
            </div>
        </article>
        `;
  })
};

search_input.addEventListener("input", (e) => AffichageBooks(e.target.value));
