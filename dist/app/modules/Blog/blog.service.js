"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogServices = void 0;
const blog_model_1 = require("./blog.model");
const createBlogIntoDB = (payload, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    // set authorId to payload
    payload.author = authorId;
    const result = yield blog_model_1.Blog.create(payload);
    return result;
});
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObj = Object.assign({}, query);
    let search = '';
    if (query === null || query === void 0 ? void 0 : query.search) {
        search = query === null || query === void 0 ? void 0 : query.search;
    }
    const searchableFields = ['title', 'content'];
    //   filtering
    const excludeFields = ['search', 'content', 'sortBy', 'sortOrder', 'filter'];
    excludeFields.forEach((el) => delete queryObj[el]);
    let filter = '';
    if (query.filter) {
        filter = query === null || query === void 0 ? void 0 : query.filter;
    }
    const searchQuery = blog_model_1.Blog.find(Object.assign({ $or: searchableFields.map((field) => ({
            [field]: { $regex: search, $options: 'i' },
        })) }, (filter && { author: filter })));
    const filterQuery = searchQuery
        .find(queryObj)
        .select('_id title content author')
        .populate('author');
    let sortBy = 'createdAt';
    if (query.sortBy) {
        sortBy = query.sortBy;
    }
    if (query === null || query === void 0 ? void 0 : query.sortOrder) {
        if ((query === null || query === void 0 ? void 0 : query.sortOrder) === 'desc')
            sortBy = `-${sortBy}`;
    }
    // console.log(`-${sortBy}`);
    const sortQuery = yield filterQuery.sort(sortBy);
    return sortQuery;
});
const getSingleBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.Blog.findById(id);
    return result;
});
const updateBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findByIdAndUpdate(id, payload, {
        new: true,
    });
    return blog;
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const blog = yield blog_model_1.Blog.findByIdAndDelete(id);
    return blog;
});
exports.blogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    getSingleBlogFromDB,
    deleteBlogFromDB,
    updateBlogIntoDB,
};
