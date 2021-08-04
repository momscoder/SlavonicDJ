require("dotenv").config();

const fetch = require("node-fetch");

exports.findByTitle = async function (title) {
  const song = await get(title);
  song.url = await getById(song.id);
  return song.url ? song : null;
};

exports.findById = async function (id) {
  const song = await getById(id, true);
  return song.url ? song : null;
};

async function get(title) {
  const response = await fetch(
    `https://api.vk.com/method/audio.search?access_token=${
      process.env.VK_TOKEN
    }&q="${encodeURIComponent(title)}"&count=1&v=5.95`
  );
  const json = await response.json();
  return {
    title: json.response?.items?.[0]?.title,
    id: json.response?.items?.[0]?.ads?.content_id,
  };
}

async function getById(id, createObject = false) {
  if (!id) return null;

  const response = await fetch(
    `https://api.vk.com/method/audio.getById?access_token=${process.env.VK_TOKEN}&audios=${id}&v=5.95`
  );
  const json = await response.json();
  return createObject
    ? { title: json.response?.[0]?.title, url: json.response?.[0]?.url }
    : json.response?.[0]?.url;
}
