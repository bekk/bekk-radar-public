module.exports = {
  MD002: false, //first header should be a level 1 header (h1 is inserted from radar.yml)
  MD006: false, //start list at beginning of line
  MD007: false, //unordered list indentation
  MD009: false, //trailing spaces
  MD012: false, //multiple blank lines
  MD013: false, //long lines
  MD026: false, //punctuation in headers
  MD029: false, //ordered list item prefix (this rule is buggy, disabling)
  MD034: false, //bare url (switch this when approaching release, right now it's just noise)
  MD041: false  //first line is header
};
