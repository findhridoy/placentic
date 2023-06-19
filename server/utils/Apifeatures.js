class Apifeatures {
  constructor(query, queryStr, countsQuery) {
    this.query = query;
    this.queryStr = queryStr;
    this.countsQuery = countsQuery;
  }

  //** FILTER LOGIC ~ filter by price, ratings and categories
  filter() {
    let queryString = JSON.stringify(this.queryStr);
    queryString = queryString.replace(
      /\b(lt|lte|gt|gte)\b/g,
      (match) => `$${match}`
    );
    const queryObj = JSON.parse(queryString);

    this.countsQuery = this.countsQuery.countDocuments(queryObj);
    this.query = this.query.find(queryObj);

    if (this.queryStr.category) {
      const category = this.queryStr.category.split(",");
      console.log(category);
      this.countsQuery = this.countsQuery.countDocuments({
        category: { $in: category },
      });
      this.query = this.query.find({ category: { $in: category } });
    }

    return this;
  }

  //** SORT LOGIC ~ sort by price, time, name...
  sort() {
    if (this.queryStr.sort) {
      //   const sortBy = this.queryStr.sort.split(",").join(" ");
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
      const skip = (page - 1) * size;
      this.query = this.query.limit(size).skip(skip);
    }
    return this;
  }
}
module.exports = Apifeatures;
