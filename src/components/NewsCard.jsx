import React from "react";
import PropTypes from "prop-types";

export const NewsCard = ({ title, summary, date, onClick }) => {
  return (
    <article
      className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
      onClick={onClick}
      role="article"
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="mt-2">{summary}</p>
      <time className="text-sm text-gray-500">{date}</time>
    </article>
  );
};
NewsCard.propTypes = {
  title: PropTypes.string,
  summary: PropTypes.string,
  date: PropTypes.string,
  onClick: PropTypes.func,
};
