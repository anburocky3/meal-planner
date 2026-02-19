import fs from "node:fs";
import path from "node:path";

interface OpenverseImage {
  url: string;
  title?: string;
  creator?: string;
  license?: string;
  source?: string;
}

interface OpenverseResponse {
  results: OpenverseImage[];
}

const projectRoot = path.resolve(__dirname, "..");
const mealsFilePath = path.join(projectRoot, "src", "data", "meals.ts");
const southIndianDir = path.join(
  projectRoot,
  "public",
  "meals",
  "south-indian",
);
const southIndianUrlPrefix = "/meals/south-indian/";

const ensureFolder = () => {
  if (!fs.existsSync(southIndianDir)) {
    fs.mkdirSync(southIndianDir, { recursive: true });
  }
};

const readMealsFile = () => {
  if (!fs.existsSync(mealsFilePath)) {
    throw new Error(`meals.ts not found: ${mealsFilePath}`);
  }

  return fs.readFileSync(mealsFilePath, "utf8");
};

const collectSouthIndianImageUrls = (content: string) => {
  const imageRegex = /image:\s*"([^\"]+)"/g;
  const urls = new Set<string>();

  for (const match of content.matchAll(imageRegex)) {
    const imageUrl = match[1];

    if (imageUrl.startsWith(southIndianUrlPrefix)) {
      urls.add(imageUrl);
    }
  }

  return [...urls].sort((left, right) => left.localeCompare(right));
};

const collectMissingUrls = () => {
  const content = readMealsFile();
  const urls = collectSouthIndianImageUrls(content);

  const existingFiles = fs
    .readdirSync(southIndianDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);

  const existingExact = new Set(existingFiles);
  const existingLower = new Set(
    existingFiles.map((name) => name.toLowerCase()),
  );

  const missing: string[] = [];
  const caseMismatch: Array<{ expected: string; actual: string }> = [];

  for (const imageUrl of urls) {
    const fileName = imageUrl.slice(southIndianUrlPrefix.length);

    if (existingExact.has(fileName)) {
      continue;
    }

    const lowerName = fileName.toLowerCase();
    if (existingLower.has(lowerName)) {
      const actual = existingFiles.find(
        (name) => name.toLowerCase() === lowerName,
      );
      if (actual) {
        caseMismatch.push({ expected: fileName, actual });
      }
      continue;
    }

    missing.push(imageUrl);
  }

  return { missing, caseMismatch };
};

const toQuery = (fileName: string) => {
  const withoutExt = fileName.replace(/\.[a-zA-Z0-9]+$/, "");
  return `${withoutExt.replaceAll(/[-_]+/g, " ")} south indian food`;
};

const searchOpenverse = async (query: string) => {
  const endpoint = new URL("https://api.openverse.org/v1/images/");
  endpoint.searchParams.set("q", query);
  endpoint.searchParams.set("page_size", "10");
  endpoint.searchParams.set("license_type", "commercial");
  endpoint.searchParams.set("extension", "jpg,jpeg,png,webp");
  endpoint.searchParams.set("mature", "false");

  const response = await fetch(endpoint, {
    headers: {
      "User-Agent": "meal-planner-image-fetcher/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(`Openverse search failed (${response.status})`);
  }

  const data = (await response.json()) as OpenverseResponse;
  return data.results ?? [];
};

const downloadImage = async (url: string, filePath: string) => {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "meal-planner-image-fetcher/1.0",
    },
    redirect: "follow",
  });

  if (!response.ok) {
    throw new Error(`Image download failed (${response.status})`);
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.startsWith("image/")) {
    throw new Error(
      `Downloaded resource is not an image (${contentType || "unknown"})`,
    );
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const main = async () => {
  ensureFolder();

  const { missing, caseMismatch } = collectMissingUrls();

  console.log(`Missing South Indian images: ${missing.length}`);
  console.log(`Case mismatch entries: ${caseMismatch.length}`);

  if (missing.length === 0) {
    console.log("Nothing to fetch.");
    return;
  }

  const failed: Array<{ imageUrl: string; reason: string }> = [];

  for (const imageUrl of missing) {
    const fileName = imageUrl.slice(southIndianUrlPrefix.length);
    const query = toQuery(fileName);
    const destination = path.join(southIndianDir, fileName);

    try {
      console.log(`\nSearching: ${fileName}`);
      const results = await searchOpenverse(query);

      if (results.length === 0) {
        failed.push({ imageUrl, reason: "No Openverse result" });
        console.log("- No result found");
        continue;
      }

      let downloaded = false;

      for (const candidate of results) {
        try {
          await downloadImage(candidate.url, destination);
          downloaded = true;
          console.log(
            `- Saved: ${imageUrl} (license: ${candidate.license || "unknown"}, creator: ${candidate.creator || "unknown"})`,
          );
          break;
        } catch {
          continue;
        }
      }

      if (!downloaded) {
        failed.push({ imageUrl, reason: "All candidate downloads failed" });
        console.log("- Could not download any candidate image");
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown error";
      failed.push({ imageUrl, reason });
      console.log(`- Failed: ${reason}`);
    }

    await sleep(250);
  }

  console.log("\nFetch summary");
  console.log(`- Requested missing images: ${missing.length}`);
  console.log(`- Failed: ${failed.length}`);
  console.log(`- Downloaded: ${missing.length - failed.length}`);

  if (failed.length > 0) {
    console.log("\nStill missing:");
    for (const item of failed) {
      console.log(`- ${item.imageUrl} (${item.reason})`);
    }
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
