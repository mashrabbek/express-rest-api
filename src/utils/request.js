async function updateBody(body, ...exludedKeys) {
  let updatingBody = {};
  for (const [key, value] of Object.entries(body)) {
    if (!exludedKeys.includes(key)) {
      updatingBody[key] = value;
    }
  }
  return updatingBody;
}

module.exports.updateBody = updateBody;
