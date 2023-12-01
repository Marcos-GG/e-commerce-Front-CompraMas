const { User, Comment, Answer } = require("../../db");

const getCommentController = async (id) => {
  if (id) {
    const idComment = await Comment.findByPk(id, {
      include: [
        { model: User, attributes: ["name", "lastname"] },
        {
          model: Answer,
          include: { model: User, attributes: ["name", "lastname"] },
        },
      ],
    });

    return idComment;
  }

  const allComments = await Comment.findAll({
    include: [
      { model: User, attributes: ["name", "lastname"] },
      {
        model: Answer,
        include: { model: User, attributes: ["name", "lastname"] },
      },
    ],
  });

  return allComments;
};

module.exports = getCommentController;
