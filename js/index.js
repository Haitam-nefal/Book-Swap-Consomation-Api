import { bookTags } from "./BookTags.js";

const demande_dechange = document.getElementById("demande_dechange");
const loader = document.getElementById("loader");
const Selectedcategories = document.getElementById("categories");

const getCategories = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/categories");
  const data = await res.json();
  console.log(data.data);
  AffichageCategories(data.data);
};

const AffichageCategories = (categories) => {
  Selectedcategories.innerHTML = ``;
  categories.forEach((c) => {
    Selectedcategories.innerHTML += `
            <option value="${c.slug}">${c.name}</option>
        `;
  });
};

const getData = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/exchange-requests");
  const data = await res.json();
  console.log(data.data);
  AffichageDemandeLivre(data.data);
};

getCategories();
getData();

// Affichage =>
const AffichageDemandeLivre = async (data) => {
  loader.style.display = "none";
  demande_dechange.innerHTML = ``;
  data.forEach((book) => {
    demande_dechange.innerHTML += `
    <article class="bg-gray-400 py-2 px-4 rounded-xl">
        ${ToopBook(book.exchange_type, book.start_date, book.end_date)}
        ${BookInfo(book.book, book.offers_count, book.offers)}
        ${FooterBook(book.owner)}
    </article>
    `;
  });
};

// TOP BOOK =>
const ToopBook = (exchange_type, start, end) => {
  //   console.log(start);
  //   console.log(end);
  //   console.log("exchange :", exchange_type);

  const styleExchange =
    exchange_type === "permanent"
      ? "bg-green-100 text-green-500"
      : "bg-orange-100 text-orange-500";

  return `
        <div class="top-book border-b border-black mb-2 flex justify-between items-center pb-2">
            <b class="${styleExchange} py-1 px-3 rounded-xl">Echange ${exchange_type}</b>
            <div>
                <i class="fa-solid fa-calendar"></i>
                <span>il y a 2 heures</span>
            </div>
        </div>
    `;
};

// INFROMATION ABOUT BOOK =>
const BookInfo = (book, offers_count, offers) => {
  return `
    <div class="info-book flex justify-between items-center my-2">
        <!-- book -->
        ${firstBook(book)}

        <i class="fa-solid fa-arrow-right-arrow-left"></i>

        <!-- Book -->
        ${offers_count !== 0 ? secondeBook(offers) : "<span>No Offre</span>"}
    </div>
    `;
};

const firstBook = (book) => {
  return `
        <div class="flex">
            <div class="image max-w-20">
                <img class="h-full w-full" src="http://127.0.0.1:8000${book.image_url}"
                    alt="${book.title}/${book.author}">
            </div>
            <div class="ps-3">
                <h2 class="font-bold text-[19px]">${book.title}</h2>
                <p class="text-light text-[14px] line-clamp-2">${book.author}</p>
                <span class="text-red-700 bg-green-300 rounded-md py-1 px-2 block my-1">${book.category.name}</span>
                <div class="tags space-x-2" id="tags">
                    ${bookTags(book.tags)}
                </div>
            </div>
        </div>
    `;
};

const secondeBook = (offres) => {
  let book = "";
  console.log(offres);
  offres.forEach((offre) => {
    if (offre.status === "accepted") {
      const { offered_book } = offre;
      console.log(offered_book);

      return `
          <div class="flex">
              <div class="image max-w-20">
                  <img class="h-full w-full" src="http://127.0.0.1:8000${offered_book.image_url}"
                      alt="">
              </div>
              <div class="ps-3">
                  <h2 class="font-bold text-[19px]">${offered_book.title}</h2>
                  <p class="text-light text-[14px]">${offered_book.author}</p>
                  <span
                      class="text-red-700 bg-green-300 rounded-md py-1 px-2 block my-1">${offered_book.category.name}</span>
                      <div class="tags">
                            ${bookTags(offered_book.tags)}
                      </div>
                  </div>
              </div>
          </div>
          `;
    }
  });
  //   return book;
};

// FOOTER BOOK =>
const FooterBook = (infoOwner) => {
  return `
    <div class="footer-book border-t border-black flex justify-between items-center">
        <div class="info-owner py-1 flex items-center">
            <div class="image max-w-10">
                <img src="http://localhost:8000${infoOwner.avatar}" alt="${infoOwner.name}/${infoOwner.group_name}">
            </div>
            <div class="content ps-4">
                <h3 class="font-bold">${infoOwner.name}</h3>
                <p class="">Apprenant ${infoOwner.group_name}</p>
            </div>
        </div>
        <button class="bg-green-400 text-red-500 py-1 px-5 cursor-pointer rounded-md">Voir les details</button>
    </div>
    `;
};
