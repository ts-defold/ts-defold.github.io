import lzstring from "lz-string";

const compress = (data) => {
  const compressed = lzstring.compressToEncodedURIComponent(data);
  postMessage({
    type: "compressed",
    data: compressed
  });
}

const decompress = (data) => {
  let err, decompressed;
  try {
    decompressed = lzstring.decompressFromEncodedURIComponent(data);
  } catch (e) {
    err = e;
  }

  postMessage({
    type: "decompressed",
    data: decompressed,
    err
  });
}

onmessage = (e) => {
  const { type, data } = e.data;
  if (type === "compress") {
    compress(data);
  } else if (type === "decompress") {
    decompress(data);
  }
}
