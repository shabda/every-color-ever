const colorUtils = require('./colorUtils');
const colorNaming = require('./colorNaming');
const colorData = require('./colorData');

module.exports = {
    ...colorUtils,
    ...colorNaming,
    ...colorData
};
