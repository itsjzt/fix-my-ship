const mongoose = require('mongoose');
const slug = require('slug');

const schemaOptions = {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
};

const PostSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: 'You need the slug of post',
      unique: 'slug already exists'
    },
    title: {
      type: String,
      required: 'You need the title of post',
      trim: true
    },
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: 'There must be a author'
    },
    tags: [{ type: String, trim: true }],
    body: { type: String, required: 'Body of post needed!', trim: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
  },
  schemaOptions
);

PostSchema.pre('findOne', autoPopulateComments);
PostSchema.pre('find', autoPopulateComments);

// generate slug before save
PostSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

PostSchema.methods.slugify = function () {
  this.slug =
    slug(this.title) +
    '-' +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

function autoPopulateComments(next) {
  this.populate('comments').populate('author');
  next();
}

PostSchema.virtual('comments', {
  ref: 'Comment',         // what model to link
  localField: '_id',     // which field on the post
  foreignField: 'post' // which field on the comment
})

const Post = mongoose.model('Post', PostSchema);
module.exports = Post;
