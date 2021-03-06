const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
    {
      username: {
        type: String,
        trim: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      passwordResetToken: String,
      passwordResetExpires: Date,

      startOfStudy: {
        type: Schema.Types.ObjectId,
        ref: "Semester",
      },
      studyPlan: { type: Schema.Types.ObjectId, ref: "StudyPlan" },

      accessToken: {
        type: String,
      },
      isVerified: { type: Boolean, default: false },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("User", userSchema);
