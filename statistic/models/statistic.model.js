import mongoose from 'mongoose';

const statisticSchema = new mongoose.Schema(
  {
    name: String,
  }, {
    timestamps: true,
    collection: 'statistics',
  },
);

const Model = mongoose.model('statistic', statisticSchema);
export default Model;
