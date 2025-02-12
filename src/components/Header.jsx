import React from "react";
import PropTypes from "prop-types";

export const Header = ({ title }) => {
  return (
    <header className="p-4 bg-blue-500 text-white">
      <h1 className="text-2xl font-bold">{title}</h1>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
};
