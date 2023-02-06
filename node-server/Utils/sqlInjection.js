
const sqlInjection = (req,res,next) => {
  let input = '';
  
  for (let k of Object.keys(req.params))
    input += req.params[k];
  for (let k of Object.keys(req.body))
    input += req.body[k];

  input = input.toLocaleLowerCase();
  const tags = ["select","drop","delete","alter","update","insert"];

  for (let tag of tags){
    if (input.includes(tag))
      return res.status(400).json({message : "Might be SQL injection"});
  }
  next();
}

module.exports = sqlInjection;