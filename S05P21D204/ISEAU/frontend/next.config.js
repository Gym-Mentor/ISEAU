const withVideos = require("next-videos");

module.exports = withVideos({
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://j5d204.p.ssafy.io:8000/:path*",
      },
    ];
  },
  images: {
    domains: [
      "loading.io",
      "mblogthumb-phinf.pstatic.net",
      "blog.hmgjournal.com",
      "c4.wallpaperflare.com",
      "img1.daumcdn.net",
      "www.junggi.co.kr",
      "highnoonsportfishing.com",
      "www.williamsonrealty.com",
    ],
  },
  env: {
    map_key:
      "pk.eyJ1IjoiamFlZGVuaXN0IiwiYSI6ImNrdGhldjUyZjAxcngydW1zejU2bWs1dnMifQ.K3Ijqq6Vi7UKKrZSwWT-uw",
  },
});
