// TAGS =>
export const bookTags = (tags) => {
  let div = "";
  tags.forEach((tag) => {
    div += `<span class="inline-block bg-[#17385B]/10 text-[#17385B] font-semibold px-2 py-0.5 rounded-md text-[11px]">#${tag}</span>`;
  });
  return div;
};