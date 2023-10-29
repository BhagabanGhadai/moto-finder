import { Storage } from ("@google-cloud/storage");

let projectId = "videoupload-3d6b2";
let keyFilename = "myKey.json";
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("videoupload-3d6b2.appspot.com");
export async function uploadVideo(originalname){
    let blob= bucket.file(originalname);
    const blobStream = blob.createWriteStream();
    blobStream.on("finish", async() => {
                 let video_url = "https://oauth2.googleapis.com"+originalname;
                  console.log(video_url);
                });
                blobStream.end(req.file.buffer);
}
