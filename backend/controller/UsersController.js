const User = require('../models/index')

const findAllUser = async (req, res) => {
  try {
    const data = await User.findAll()

    const result = {
        status : 'ok',
        data : data
    }

    res.send(result)
  } catch (error) {
    console.log(error)
  }
//   res.send('hahahah')
};

module.exports = { findAllUser };
