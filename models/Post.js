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
    body: { type: String, required: true, trim: true },
    comments: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
    votes: { type: Number, default: 0 }
  },
  schemaOptions
);

Schema.pre('findOne', autoPopulateComments);
Schema.pre('find', autoPopulateComments);

function autoPopulateComments(next) {
  this.populate('comments').populate('author');
  next();
}

module.export = mongoose.model('Post', PostSchema);
