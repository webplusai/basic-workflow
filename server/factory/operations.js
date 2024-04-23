const _ = require("lodash");

module.exports.genExcludes = (req) => {
  if (!req.query) return ''
  let exclude = _.find(req.query, function (query, index) {
    return index == "$exclude";
  });
  if(!exclude) return "";
  if(typeof(exclude) == "string") exclude = [exclude];
  return _.map(exclude, function (entry) {
    return `-${entry}`;
  })?.join(" ")
}

module.exports.genQueryParams = (customName, query, req, callback) => {

  let orQueries = _.find(req.query, function (query, index) {
    return index == "$or";
  });
  let tempOr = [];
  if (orQueries) {
    if (typeof orQueries == "object") {
      _.forEach(orQueries, function (_query) {
        let queryOpt = _.split(_query, ":");
        let dummy = new Object();
        dummy[queryOpt[0]] = queryOpt[1];
        tempOr.push(dummy);
      });
    } else {
      let queryOpt = _.split(orQueries, ":");
      let dummy = new Object();
      dummy[queryOpt[0]] = queryOpt[1];
      tempOr.push(dummy);
    }
  }
  if (!_.isEmpty(query) && !_.isEmpty(query.$or))
    tempOr = _.concat(tempOr, query.$or);
  if (_.size(tempOr) > 0) query = { ...query, $or: tempOr };

  const paths = _.find(req.query, function (query, index) {
    return index == "$include";
  });
  let options = {
    populate: paths,
    select: '',//this.genExcludes(req),
    sort: { createdAt: "desc" },
    page:
      Number(
        _.find(req.query, function (query, index) {
          return index == "$page";
        })
      ) || 1,
    limit:
      Number(
        _.find(req.query, function (query, index) {
          return index == "$limit";
        })
      ) || 10,
    customLabels: {
      docs: customName,
    },
    lean: true,
  };
  let results = {
    query,
    options,
  };
  if (callback) return callback(results);
  return results;
};
