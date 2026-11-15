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
  Selectedcategories.innerHTML = `<option value="" selected disabled>Toutes les catégories</option>`;
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
          <article class="bg-white border border-[#E5E2D9] rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#E38B29]/50 transition-all duration-300 flex flex-col justify-between">
              <div>
                ${ToopBook(book.exchange_type, book.start_date, book.end_date)}
                ${BookInfo(book.book, book.offers_count, book.offers)}
              </div>
              ${FooterBook(book.owner)}
          </article>
          `;
  });
};

// TOP BOOK =>
const ToopBook = (exchange_type, start, end) => {
  const isPermanent = exchange_type === "permanent";
  const styleExchange = isPermanent
    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
    : "bg-amber-50 text-amber-700 border border-amber-200";
  const iconExchange = isPermanent ? "fa-infinity" : "fa-clock";

  return `
        <div class="top-book border-b border-[#E5E2D9] pb-3 mb-4 flex justify-between items-center">
            <span class="${styleExchange} text-xs font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 capitalize">
                <i class="fa-solid ${iconExchange}"></i>
                Échange ${exchange_type}
            </span>
            <div class="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                <i class="fa-regular fa-clock"></i>
                <span>il y a 2 heures</span>
            </div>
        </div>
    `;
};

// INFORMATION ABOUT BOOK =>
const BookInfo = (book, offers_count, offers) => {
  return `
    <div class="info-book my-3 grid grid-cols-1 sm:grid-cols-11 gap-3 items-center">
        <div class="firstBook sm:col-span-5">
            ${firstBook(book)}
        </div>

        <div class="sm:col-span-1 flex justify-center items-center my-1 sm:my-0">
            <div class="w-8 h-8 rounded-full bg-[#F8F7F4] border border-[#E5E2D9] text-[#E38B29] flex items-center justify-center shadow-xs">
                <i class="fa-solid fa-arrow-right-arrow-left text-xs"></i>
            </div>
        </div>

        <div class="secondeBook sm:col-span-5 h-full flex items-center">
            ${offers_count !== 0 ? secondeBook(offers) : `
                <div class="w-full h-full min-h-[110px] border-2 border-dashed border-[#E5E2D9] rounded-xl bg-[#F8F7F4] flex flex-col justify-center items-center p-3">
                    <i class="fa-solid fa-book-medical text-slate-300 text-lg mb-1"></i>
                    <span class="text-xs font-semibold text-slate-400">Aucune offre reçue</span>
                </div>
            `}
        </div>
    </div>
    `;
};

const firstBook = (book) => {
  return `
        <div class="flex gap-3 items-start bg-[#F8F7F4]/50 p-2.5 rounded-xl border border-[#E5E2D9]/60">
            <div class="w-16 h-24 shrink-0 rounded-lg overflow-hidden shadow-xs bg-slate-200">
                <img class="h-full w-full object-cover" src="http://127.0.0.1:8000${book.image_url}"
                    alt="${book.title}">
            </div>
            <div class="min-w-0 flex-1">
                <span class="inline-block text-[10px] font-bold uppercase tracking-wider text-[#E38B29] bg-[#E38B29]/10 rounded px-2 py-0.5 mb-1">
                    ${book.category.name}
                </span>
                <h2 class="font-bold text-sm text-[#17385B] line-clamp-1" title="${book.title}">${book.title}</h2>
                <p class="text-slate-500 text-xs line-clamp-1 mb-2">${book.author}</p>
                <div class="tags flex flex-wrap gap-1" id="tags">
                    ${bookTags(book.tags)}
                </div>
            </div>
        </div>
    `;
};

const secondeBook = (offres) => {
  const acceptedOffre = offres.find((of) => of.status === "accepted");

  if (!acceptedOffre) {
    return `
        <div class="w-full h-full min-h-[110px] border-2 border-dashed border-amber-200 rounded-xl bg-amber-50/40 flex flex-col justify-center items-center p-3 text-center">
            <i class="fa-solid fa-hourglass-half text-amber-400 text-base mb-1"></i>
            <span class="text-xs font-semibold text-amber-700">En attente d'acceptation</span>
        </div>
    `;
  }

  const offered_book = acceptedOffre.offered_book;

  return `
    <div class="flex gap-3 items-start bg-emerald-50/40 p-2.5 rounded-xl border border-emerald-200/70 w-full">
      <div class="w-16 h-24 shrink-0 rounded-lg overflow-hidden shadow-xs bg-slate-200">
          <img class="h-full w-full object-cover" src="http://127.0.0.1:8000${offered_book.image_url}"
              alt="${offered_book.title}">
      </div>
      <div class="min-w-0 flex-1">
          <span class="inline-block text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 rounded px-2 py-0.5 mb-1">
              ${offered_book.category.name}
          </span>
          <h2 class="font-bold text-sm text-[#17385B] line-clamp-1" title="${offered_book.title}">${offered_book.title}</h2>
          <p class="text-slate-500 text-xs line-clamp-1 mb-2">${offered_book.author}</p>
          <div class="tags flex flex-wrap gap-1">
              ${bookTags(offered_book.tags)}
          </div>
      </div>
    </div>
  `;
};

// FOOTER BOOK =>
const FooterBook = (infoOwner) => {
  return `
    <div class="footer-book border-t border-[#E5E2D9] pt-3 mt-3 flex justify-between items-center gap-2">
        <div class="info-owner flex items-center gap-3">
            <div class="w-9 h-9 rounded-full overflow-hidden border border-[#E5E2D9] bg-[#17385B] shrink-0">
                <img class="w-full h-full object-cover" src="http://localhost:8000${infoOwner.avatar}" alt="${infoOwner.name}">
            </div>
            <div>
                <h3 class="font-bold text-xs text-[#17385B]">${infoOwner.name}</h3>
                <p class="text-[11px] text-slate-500">Apprenant • ${infoOwner.group_name}</p>
            </div>
        </div>
        <button class="bg-[#E38B29] hover:bg-[#c9761c] text-white text-xs font-bold py-2 px-4 rounded-xl shadow-xs transition-colors cursor-pointer">
            Voir détails
        </button>
    </div>
    `;
};

AffichageDemandeLivre();

// FILTRAGE PAR CATEGORY =>
document.getElementById("categories").addEventListener("change", (e) => {
  if (e.target.value === "") {
    AffichageLivre(dataExchangeRequest);
  } else {
    dataExchangeRequest = dataExchangeRequest.filter(
      (d) => d.book.category.slug === e.target.value,
    );
    AffichageLivre();
  }
});

// FILTRAGE PAR TYPE D'ECHANGE =>
document.querySelectorAll('input[type="checkbox"]').forEach((inp) => {
  inp.addEventListener("click", (e) => {
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