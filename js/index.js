import { bookTags } from "./BookTags.js";

let dataExchangeRequest = [];

const demande_dechange = document.getElementById("demande_dechange");
const loader = document.getElementById("loader");
const Selectedcategories = document.getElementById("categories");
const errorHandling = document.getElementById("error_handling");
const searchInvalide = document.getElementById("search-invalide");

const getCategories = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/categories");
  const data = await res.json();
  AffichageCategories(data.data);
};

const AffichageCategories = (categories) => {
  Selectedcategories.innerHTML = ``;
  Selectedcategories.innerHTML = `<option value="" selected disabled>--choisir-category--</option>`;
  categories.forEach((c) => {
    Selectedcategories.innerHTML += `
            <option value="${c.slug}">${c.name}</option>
        `;
  });
};

const getData = async () => {
  const res = await fetch("http://127.0.0.1:8000/api/v1/exchange-requests");
  if (!res.ok) throw new Error(res.statusText);
  const data = await res.json();
  dataExchangeRequest = data.data;
};

getCategories();

// Affichage =>
const AffichageDemandeLivre = async () => {
  try {
    await getData();
    AffichageLivre();
  } catch (err) {
    console.error(err);
    errorHandling.classList.remove("hidden");
    errorHandling.querySelector("#message_error").innerText = err.message;
  } finally {
    loader.style.display = "none";
  }
};

const AffichageLivre = () => {
  if (dataExchangeRequest.length === 0) {
    demande_dechange.innerHTML = ``;
    searchInvalide.classList.remove("hidden");
    return;
  }
  demande_dechange.innerHTML = ``;
  searchInvalide.classList.add("hidden");
  dataExchangeRequest.forEach((book) => {
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
    <div class="info-book my-2 grid grid-cols-2 gap-4 min-h-30">
        <!-- book -->
        <div class="firstBook">
        ${firstBook(book)}
        </div>

        <!-- Book -->
        <div class="secondeBook flex justify-center items-center">
        ${offers_count !== 0 ? secondeBook(offers) : "<span>No Offre</span>"}
        </div>
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
                <h2 class="font-bold text-[19px] line-clamp-2">${book.title}</h2>
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
  const acceptedOffre = offres.find((of) => of.status === "accepted");
  console.log("accepted offre : ", acceptedOffre);

  if (!acceptedOffre) {
    return `<span>No Accepted Offre !</span>`;
  }

  const offered_book = acceptedOffre.offered_book;

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

AffichageDemandeLivre();

// FILTRAGE PAR CATEGORY =>
document.getElementById("categories").addEventListener("change", (e) => {
  if (e.target.value === "") {
    AffichageLivre(dataExchangeRequest);
  } else {
    console.log(e.target.value);
    dataExchangeRequest = dataExchangeRequest.filter(
      (d) => d.book.category.slug === e.target.value,
    );
    console.log("new Array : ", dataExchangeRequest);
    AffichageLivre();
  }
});

// FILTRAGE PAR TYPE D'ECHANGE =>
document.querySelectorAll('input[type="checkbox"]').forEach((inp) => {
  inp.addEventListener("click", (e) => {
    console.log(e.target.value);
    if (e.target.value === "all") {
      AffichageLivre();
    } else {
      dataExchangeRequest = dataExchangeRequest.filter(
        (d) => d.exchange_type === e.target.value,
      );
      AffichageLivre();
    }
  });
});

// FILTARGE PAR TITRE =>
document.getElementById("input_rechreche").addEventListener("input", (e) => {
  console.log(e.target.value);
  dataExchangeRequest = dataExchangeRequest.filter((d) =>
    d.book.title.toLowerCase().includes(e.target.value.toLowerCase()),
  );
  AffichageLivre();
});

document.getElementById("btn-actualiser").addEventListener("click", (e) => {
  e.preventDefault();
  document.forms["rechreche"].reset();
  AffichageDemandeLivre();
});

// <i class="fa-solid fa-arrow-right-arrow-left"></i>
