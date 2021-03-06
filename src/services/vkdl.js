require("dotenv").config();

const { fetchBuilder, MemoryCache } = require("node-fetch-cache");
const fetch = fetchBuilder.withCache(new MemoryCache({ ttl: 1200000 })); // 20 min

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
  //let t1 = performance.now();
  const response = await fetch(
    `https://api.vk.com/method/audio.search?access_token=${
      process.env.VK_TOKEN
    }&q="${encodeURIComponent(title)}"&count=1&v=5.95`
  );
  //let t2 = performance.now();
  //console.log(t2 - t1);
  const json = await response.json();
  return {
    title: json.response?.items?.[0]?.title,
    duration: +json.response?.items?.[0]?.duration * 1000,
    id: json.response?.items?.[0]?.ads?.content_id,
  };
}

async function getById(id, createObject = false) {
  if (!id) return null;

  const response = await fetch(
    `https://api.vk.com/method/audio.getById?access_token=${
      process.env.VK_TOKEN
    }&audios=${encodeURIComponent(id)}&v=5.95`
  );
  const json = await response.json();
  return createObject
    ? {
        title: json.response?.[0]?.title,
        url: json.response?.[0]?.url,
        duration: +json.response?.[0]?.duration * 1000,
      }
    : json.response?.[0]?.url;
}
