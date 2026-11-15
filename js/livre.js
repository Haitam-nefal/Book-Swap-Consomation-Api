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
      <article class="bg-white border border-[#E5E2D9] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group">
          <div class="aspect-[3/4] w-full overflow-hidden bg-slate-100 relative">
              <img src="http://127.0.0.1:8000${b.image_url}" alt="${b.title}/${b.author}" class="w-full h-full object-cover">
          </div>
          <div class="p-4 flex-1 flex flex-col justify-between">
              <div>
                  <span class="text-xs font-semibold text-[#E38B29] block mb-1">${b.author}</span>
                  <h3 class="text-base font-bold text-[#17385B] line-clamp-1 mb-1.5" title="${b.title}">${b.title}</h3>
                  <p class="text-xs text-slate-500 line-clamp-2 mb-3 leading-relaxed">${b.description}</p>
              </div>
              <div class="tags flex flex-wrap gap-1.5 pt-2 border-t border-[#E5E2D9]/60" id="tags">
                  ${bookTags(b.tags)}
              </div>
          </div>
      </article>
      `;
  });
};

search_input.addEventListener("input", (e) => AffichageBooks(e.target.value));