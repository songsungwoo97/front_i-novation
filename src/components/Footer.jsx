import React from "react";
import PropTypes from "prop-types";

export const Footer = ({ title }) => {
  return (
    <footer className="p-4 bg-blue-500 text-white">
      <h1 className="text-2xl font-bold">{title}</h1>
    </footer>
  );
};

Footer.propTypes = {
  title: PropTypes.string,
};
