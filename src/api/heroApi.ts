import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGetAllHeroes, IHero } from "../interfaces";

export const heroApi = createApi({
  reducerPath: "heroApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),
  tagTypes: ["Hero"],
  endpoints: (builder) => ({
    getAllHeroes: builder.query<IGetAllHeroes, number>({
      query: (page) => `get_all?page=${page}`,
      providesTags: ["Hero"],
    }),
    getOneHero: builder.query<IHero, string>({
      query: (slug: string) => `get_one/${slug}`,
      providesTags: ["Hero"],
    }),
    deleteHero: builder.mutation({
      query: (slug: string) => ({
        url: `delete/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Hero"],
    }),
    changeHero: builder.mutation({
      query: ({ slug, heroData }) => ({
        url: `change/${slug}`,
        method: "PUT",
        body: heroData,
      }),
      invalidatesTags: ["Hero"],
    }),
    create: builder.mutation({
      query: (createHeroData) => ({
        url: "create",
        method: "POST",
        body: createHeroData,
      }),
      invalidatesTags: ["Hero"],
    }),
    deleteImage: builder.mutation({
      query: ({ slug, imageName }) => ({
        url: `delete_image/${slug}`,
        method: "DELETE",
        body: { imageName },
      }),
      invalidatesTags: ["Hero"],
    }),
    addImages: builder.mutation({
      query: ({ slug, images }) => ({
        url: `add_images/${slug}`,
        method: "PUT",
        body: images,
      }),
      invalidatesTags: ["Hero"],
    }),
  }),
});

export const {
  useDeleteHeroMutation,
  useGetAllHeroesQuery,
  useLazyGetOneHeroQuery,
  useCreateMutation,
  useDeleteImageMutation,
  useAddImagesMutation,
  useChangeHeroMutation,
} = heroApi;
