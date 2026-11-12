// TAGS =>
export const bookTags = (tags) => {
  let div = "";
  tags.forEach((tag) => {
    div += `<span class="bg-gray-800 text-white px-1 font-light text-[12px]">#${tag}</span>`;
  });
  return div;
};

