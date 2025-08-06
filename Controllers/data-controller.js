const Datas = require('../db/Models/data-schema');

module.exports.getDatas = async (req, res) => {
  try {
    const response = await Datas.find();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
};
module.exports.getDatasLatest = async (req, res) => {
  try {
    const datas = await Datas.find().sort({ createdAt: -1 });
    res.status(200).json(datas);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch Datas' });
  }
};

module.exports.postDatas = async (req, res) => {
  try {
    const { body } = req;
    const response = await Datas.create(body);
    res.status(200).json({ message: 'DatasAdded SuccessFully', error: false });
  } catch (e) {
    res.status(500).json({ message: 'error' });
  }
};

module.exports.getDatasById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Datas.findById(id);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await Datas.findByIdAndDelete(id);
    return res.status(200).json({ message: 'Deleted successfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

module.exports.updateDatas = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    await Datas.findByIdAndUpdate(id, body, { new: true });

    return res.status(200).json({ message: 'Updated Successfully' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
