function GenerateList(data) {
  const trackList = [];
  for (const item of data) {
    trackList.push({
      id: item.id,
      trackName: item.name,
      artistName: item.album.artists[0].name,
      albumPicture: item.album.images[0].url,
      albumName: item.album.name,
      previewUrl: item.preview_url,
      trackUri: item.uri,
    });
  }
  return trackList;
}

export default GenerateList;
