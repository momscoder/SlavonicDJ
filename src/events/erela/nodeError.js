module.exports = (node, error) => {
  console.log(
    `Node "${node.options.identifier}" encountered an error: ${error.message}.`
  );
};
