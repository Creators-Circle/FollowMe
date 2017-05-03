module.exports = {
    "extends": "standard",
    "installedESLint": true,
    "plugins": [
        "standard",
        "promise"
    ],
    "rules": {
      "no-unused-vars":"off",
      "semi": [2, "always"],
      "no-undef": 1,
      "prefer-const":["error", {
        "ignoreReadBeforeAssign": false
      }],
      "prefer-arrow-callback": 2,
      "no-var": 2,
      "new-cap": 1
   }    
};

