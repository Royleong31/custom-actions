const core = require("@actions/core");
const exec = require("@actions/exec");
const github = require("@actions/github");

function main() {
  const bucket = core.getInput("bucket", { required: true });
  const bucketRegion = core.getInput("bucket-region", { required: true });
  const distFolder = core.getInput("dist-folder", { required: true });

  const s3Uri = `s3://${bucket}`;
  exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);
  core.notice("Hello from my custom Javascript action");
  const websiteUrl = `https://${bucket}.s3.${bucketRegion}.amazonaws.com/index.html`;
  console.log('website url', websiteUrl);
  core.setOutput("website-url", websiteUrl);
}

main();
