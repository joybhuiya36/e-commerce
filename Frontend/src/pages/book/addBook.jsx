import React from "react";
import axiosIntance from "../../utils/axiosInstance";
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addBook.style.scss";

export default function AddBook() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      author: "",
      price: "",
      genre: "",
      year: "",
      pages: "",
      stock: "",
      image: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axiosIntance.post("/book/create", data);

      if (response.data.success) {
        console.log("New Book added successfully!");
        toast("New Book is Added Successfully!");
      } else {
        toast("Failed to Add New Book!");
        console.error("Error adding book:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div className="addDiv">
      <form className="addBook" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="title">Title</label> <br />
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Title is required",
            minLength: {
              value: 3,
              message: "Minimum length must be 3",
            },
            maxLength: {
              value: 25,
              message: "Maximum length must be 25",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" id="title" placeholder="Book Name" />
          )}
        />
        {errors.title && <p style={{ color: "red" }}>{errors.title.message}</p>}
        <br />
        <label htmlFor="author">Author</label> <br />
        <Controller
          name="author"
          control={control}
          rules={{
            required: "Author is required",
            minLength: {
              value: 3,
              message: "Minimum length must be 3",
            },
            maxLength: {
              value: 15,
              message: "Maximum length must be 15",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              id="author"
              placeholder="Author Name"
            />
          )}
        />
        {errors.author && (
          <p style={{ color: "red" }}>{errors.author.message}</p>
        )}{" "}
        <br />
        <label htmlFor="price">Price</label> <br />
        <Controller
          name="price"
          control={control}
          rules={{
            required: "Price is required",
            min: {
              value: 1,
              message: "Price must be at least 1",
            },
            max: {
              value: 1000,
              message: "Price must be at most 1000",
            },
            validate: {
              isInteger: (value) => {
                const isInteger = /^\d+$/.test(value);
                return isInteger || "Price must be an integer";
              },
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" id="price" placeholder="0" />
          )}
        />
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}{" "}
        <br />
        <label htmlFor="genre">genre</label> <br />
        <Controller
          name="genre"
          control={control}
          rules={{
            required: "Genre is required",
            minLength: {
              value: 3,
              message: "Minimum length must be 3",
            },
            maxLength: {
              value: 15,
              message: "Maximum length must be 15",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" id="genre" placeholder="Genre" />
          )}
        />
        {errors.genre && <p style={{ color: "red" }}>{errors.genre.message}</p>}{" "}
        <br />
        <label htmlFor="year">Year</label> <br />
        <Controller
          name="year"
          control={control}
          rules={{
            required: "Year is required",
            min: {
              value: 1800,
              message: "Year must be at least 1800",
            },
            max: {
              value: 2023,
              message: "Year must be at most 2023",
            },
            validate: {
              isInteger: (value) => {
                const isInteger = /^\d+$/.test(value);
                return isInteger || "Year must be an integer";
              },
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" id="year" placeholder="1900" />
          )}
        />
        {errors.year && <p style={{ color: "red" }}>{errors.year.message}</p>}{" "}
        <br />
        <label htmlFor="pages">Pages</label> <br />
        <Controller
          name="pages"
          control={control}
          rules={{
            required: "Pages is required",
            min: {
              value: 10,
              message: "Pages must be at least 10",
            },
            max: {
              value: 1000,
              message: "Pages must be at most 1000",
            },
            validate: {
              isInteger: (value) => {
                const isInteger = /^\d+$/.test(value);
                return isInteger || "Pages must be an integer";
              },
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" id="pages" placeholder="20" />
          )}
        />
        {errors.pages && <p style={{ color: "red" }}>{errors.pages.message}</p>}{" "}
        <br />
        <label htmlFor="stock">Stock</label> <br />
        <Controller
          name="stock"
          control={control}
          rules={{
            required: "Stock is required",
            min: {
              value: 0,
              message: "Stock must be at least 0",
            },
            max: {
              value: 1000,
              message: "Stock must be at most 1000",
            },
            validate: {
              isInteger: (value) => {
                const isInteger = /^\d+$/.test(value);
                return isInteger || "Stock must be an integer";
              },
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" id="stock" placeholder="0" />
          )}
        />
        {errors.stock && <p style={{ color: "red" }}>{errors.stock.message}</p>}
        <br />
        <label htmlFor="image">Image Link</label> <br />
        <Controller
          name="image"
          control={control}
          rules={{
            required: "Image is required",
            minLength: {
              value: 3,
              message: "Minimum length must be 3",
            },
            maxLength: {
              value: 500,
              message: "Maximum length must be 500",
            },
          }}
          defaultValue=""
          render={({ field }) => (
            <input {...field} type="text" id="image" placeholder="Image Link" />
          )}
        />
        {errors.image && <p style={{ color: "red" }}>{errors.image.message}</p>}
        <br />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}
