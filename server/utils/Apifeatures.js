class Apifeatures {
  constructor(query, queryStr, countsQuery) {
    this.query = query;
    this.queryStr = queryStr;
    this.countsQuery = countsQuery;
  }

  // SEARCH LOGIG ~ search by title, category...
  search() {
    if (this.queryStr.keyword) {
      const keyword = this.queryStr.keyword;
      const searchRegExp = new RegExp(".*" + keyword + ".*", "i");
      const searchObj = {
        $and: [
          {
            $or: [
              { name: { $regex: searchRegExp } },
              { username: { $regex: searchRegExp } },
              { email: { $regex: searchRegExp } },
            ],
            $or: [
              { title: { $regex: searchRegExp } },
              { category: { $regex: searchRegExp } },
            ],
            $or: [{ title: { $regex: searchRegExp } }],
          },
        ],
      };

      this.countsQuery = this.countsQuery.countDocuments(searchObj);
      this.query = this.query.find(searchObj);
    }
    return this;
  }

  //** SORT LOGIC ~ sort by price, time, name...
  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort;
      this.countsQuery = this.countsQuery.countDocuments(sortBy);
      this.query = this.query.sort(sortBy);
    }
    return this;
  }

  //** PAGINATION LOGIC ~ paginate by size=limit, page
  paginate() {
    if (this.queryStr.page && this.queryStr.size) {
      const page = parseInt(this.queryStr.page);
      const size = parseInt(this.queryStr.size);
      const skip = page * size;
      this.query = this.query.limit(size).skip(skip);
    }
    return this;
  }

  //** FILTER LOGIC ~ filter by price, ratings and categories
  filter() {
    if (this.queryStr.price && this.queryStr.ratings) {
      let queryValue = {};
      (queryValue.price = this.queryStr.price),
        (queryValue.ratings = this.queryStr.ratings);

      let queryString = JSON.stringify(queryValue);
      queryString = queryString.replace(
        /\b(lt|lte|gt|gte)\b/g,
        (match) => `$${match}`
      );
      const queryObj = JSON.parse(queryString);

      this.countsQuery = this.countsQuery.countDocuments(queryObj);
      this.query = this.query.find(queryObj);
    }

    if (this.queryStr.category) {
      const category = { category: { $in: this.queryStr.category.split(",") } };
      this.countsQuery = this.countsQuery.countDocuments(category);
      this.query = this.query.find(category);
    }

    return this;
  }
}
module.exports = Apifeatures;
