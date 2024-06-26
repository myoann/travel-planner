import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || "",
});

export const getPhoto = async (searchQuery: string) => {
  const res = await unsplash.search.getPhotos({
    query: searchQuery,
    perPage: 1,
    orientation: "landscape",
  });

  return res.response?.results[0];
};
