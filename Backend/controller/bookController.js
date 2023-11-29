const bookModel = require("../model/bookModel");
const { validationResult } = require("express-validator");
const { failure, success } = require("../util/common");

class Book {
  async create(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length) {
        return res.status(422).send(
          failure(
            "Failed to Add Book",
            validation.map((x) => x.msg)
          )
        );
      }
      const { title, author, price, genre, year, pages, rating, stock, image } =
        req.body;
      // console.log(image);
      const check = await bookModel.findOne({ title: title });
      // console.log(check);
      if (check) {
        return res
          .status(200)
          .send(failure("Book with Same Name Already Exists"));
      }
      const book = await bookModel.create({
        title,
        author,
        price,
        genre,
        year,
        pages,
        rating,
        stock,
        image,
      });
      return res.status(201).send(success("Book is Added Successfully", book));
    } catch (err) {
      console.log("create catch");
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async getAll(req, res) {
    try {
      const book = await bookModel.find({});
      if (book.length) {
        return res
          .status(200)
          .send(success("All Books Data are Fetched!", book));
      } else {
        return res.status(404).send(failure("No Books are Found!"));
      }
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const deleteResult = await bookModel.deleteOne({ _id: id });
      if (deleteResult.deletedCount) {
        return res.status(200).send(success("Book is Deleted Successfully!"));
      } else {
        return res.status(404).send(failure("Failed to Delete Book!"));
      }
    } catch (err) {
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async editBook(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length) {
        return res.status(422).send(
          failure(
            "Failed to Edit Book",
            validation.map((x) => x.msg)
          )
        );
      }
      const { id, title, author, price, genre, year, pages, stock, image } =
        req.body;
      const book = await bookModel.findOne({ _id: id });
      if (title != undefined) book.title = title;
      if (author != undefined) book.author = author;
      if (price != undefined) book.price = price;
      if (genre != undefined) book.genre = genre;
      if (year != undefined) book.year = year;
      if (pages != undefined) book.pages = pages;
      if (stock != undefined) book.stock = stock;
      if (image != undefined) book.image = image;
      if (
        title == undefined &&
        author == undefined &&
        price == undefined &&
        genre == undefined &&
        year == undefined &&
        pages == undefined &&
        stock == undefined &&
        image == undefined
      ) {
        return res.status(204).send(success("No Data is Updated!"));
      }
      await book.save();
      return res
        .status(200)
        .send(success("Book Data is Updated Successfully", book));
    } catch (err) {
      console.log("edit controller catch");
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
  async getAllByFilter(req, res) {
    try {
      const {
        page,
        limit,
        sortBy,
        sortParam,
        price,
        priceFilter,
        year,
        yearFilter,
        rating,
        ratingFilter,
        stock,
        stockFilter,
        search,
        category,
      } = req.query;
      if (
        (sortParam && !sortBy) ||
        (!sortParam && sortBy) ||
        (sortParam && sortBy != "asc" && sortBy != "desc") ||
        (sortParam &&
          sortParam != "price" &&
          sortParam != "stock" &&
          sortParam != "rating" &&
          sortParam != "title" &&
          sortParam != "author" &&
          sortParam != "year" &&
          sortParam != "pages") ||
        (price && !priceFilter) ||
        (!price && priceFilter) ||
        (priceFilter && priceFilter != "low" && priceFilter != "high") ||
        (stock && !stockFilter) ||
        (!stock && stockFilter) ||
        (stockFilter && stockFilter != "low" && stockFilter != "high") ||
        (year && !yearFilter) ||
        (!year && yearFilter) ||
        (yearFilter && yearFilter != "low" && yearFilter != "high") ||
        (rating && !ratingFilter) ||
        (!rating && ratingFilter) ||
        (ratingFilter && ratingFilter != "low" && ratingFilter != "high")
      ) {
        return res.status(401).send(failure("Invalid Parameters"));
      }

      if (page < 1 || limit < 1) {
        return res
          .status(401)
          .send(failure("Page and Limit value must be at least 1"));
      }
      const filters = {};
      if (price) {
        if (priceFilter === "low") filters.price = { $lt: parseInt(price) };
        else filters.price = { $gt: parseInt(price) };
      }
      if (year) {
        if (yearFilter === "low") filters.year = { $lt: parseInt(year) };
        else filters.year = { $gt: parseInt(year) };
      }
      if (rating) {
        if (ratingFilter === "low")
          filters.rating = { $lt: parseFloat(rating) };
        else filters.rating = { $gt: parseFloat(rating) };
      }
      if (stock) {
        if (stockFilter === "low") filters.stock = { $lt: parseInt(stock) };
        else filters.stock = { $gt: parseInt(stock) };
      }
      if (search)
        filters.$or = [
          { title: { $regex: search, $options: "i" } },
          { author: { $regex: search, $options: "i" } },
        ];
      if (category) filters.genre = { $in: [category] };
      const count = await bookModel.find({}).count();
      // console.log(count);
      const allBook = await bookModel
        .find(filters)
        .sort({ [sortParam]: sortBy === "asc" ? 1 : -1 })
        .skip((page - 1) * limit)
        .limit(limit ? limit : 20);
      if (allBook.length > 0) {
        return res.status(200).send(
          success("All Data is Fetched!", {
            total: count,
            booksPerPage: allBook.length,
            pageNum: parseInt(page),
            limit: parseInt(limit),
            books: allBook,
          })
        );
      } else {
        return res.status(404).send(success("No Data is Found!"));
      }
    } catch (err) {
      console.log("filter catch");
      return res.status(500).send(failure("Internal Server Error!"));
    }
  }
}

module.exports = new Book();
