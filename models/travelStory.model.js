import mongoose, { Schema } from "mongoose"

const travelStorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    story: {
      type: String,
      required: true,
    },

    visitedLocations: {
      type: [String],
      default: [],
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    visitedDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
)

const TravelStory = mongoose.model("TravelStory", travelStorySchema)

export default TravelStory
