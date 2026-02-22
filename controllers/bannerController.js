export async function getBanner(req, res) {
  try {
    res.setHeader('Cache-Control', 'no-store');

    const banner = await getBannerModel();
    return res.status(200).json(banner);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}