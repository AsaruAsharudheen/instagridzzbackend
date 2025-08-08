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
module.exports.likeDatas = async (req, res) => {
  try {
    const { id } = req.params;

    // Find post
    const post = await Datas.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Increment likes
    post.likes = (post.likes || 0) + 1;
    await post.save();

    return res
      .status(200)
      .json({ message: 'Liked successfully', likes: post.likes });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
module.exports.toggleLikeDatas = async (req, res) => {
  try {
    const { id } = req.params;
    const { unlike } = req.body; // send { unlike: true } for unlike

    const post = await Datas.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.likes = unlike
      ? Math.max(0, (post.likes || 0) - 1)
      : (post.likes || 0) + 1;
    await post.save();

    return res.status(200).json({ message: 'Like updated', likes: post.likes });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
