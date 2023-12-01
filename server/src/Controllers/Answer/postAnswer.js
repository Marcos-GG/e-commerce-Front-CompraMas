const { Answer } = require("../../db");

const postAnswerController = async ({ userId, commentId, answer }) => {
  const createAnswer = await Answer.create({
    userId,
    commentId,
    answer,
  });
  if (!createAnswer) throw new Error("No se pudo crear el comentario");

  return createAnswer;
};

module.exports = postAnswerController;
