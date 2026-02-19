import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(__dirname, "..");
const mealsFilePath = path.join(projectRoot, "src", "data", "meals.ts");
const southIndianDir = path.join(
  projectRoot,
  "public",
  "meals",
  "south-indian",
);
const southIndianUrlPrefix = "/meals/south-indian/";

const toPosixPath = (value: string) => value.replaceAll("\\", "/");

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

const collectAvailableFiles = () => {
  if (!fs.existsSync(southIndianDir)) {
    throw new Error(
      `South Indian image directory not found: ${southIndianDir}`,
    );
  }

  return fs
    .readdirSync(southIndianDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name);
};

const checkMissingImages = () => {
  const mealsFileContent = readMealsFile();
  const imageUrls = collectSouthIndianImageUrls(mealsFileContent);
  const availableFiles = collectAvailableFiles();

  const availableExact = new Set(availableFiles);
  const availableCaseInsensitive = new Map(
    availableFiles.map((file) => [file.toLowerCase(), file]),
  );

  const missing: string[] = [];
  const caseMismatch: Array<{ expected: string; actual: string }> = [];

  for (const imageUrl of imageUrls) {
    const fileName = imageUrl.slice(southIndianUrlPrefix.length);

    if (availableExact.has(fileName)) {
      continue;
    }

    const caseInsensitiveMatch = availableCaseInsensitive.get(
      fileName.toLowerCase(),
    );

    if (caseInsensitiveMatch) {
      caseMismatch.push({ expected: fileName, actual: caseInsensitiveMatch });
      continue;
    }

    missing.push(imageUrl);
  }

  return {
    totalUrls: imageUrls.length,
    totalFiles: availableFiles.length,
    missing,
    caseMismatch,
  };
};

const result = checkMissingImages();

console.log("South Indian image check");
console.log(`- URLs found in meals.ts: ${result.totalUrls}`);
console.log(`- Files found in public folder: ${result.totalFiles}`);
console.log(`- Missing URLs: ${result.missing.length}`);
console.log(`- Case-mismatch URLs: ${result.caseMismatch.length}`);

if (result.missing.length > 0) {
  console.log("\nMissing image URLs:");
  result.missing.forEach((url) => {
    console.log(`- ${toPosixPath(url)}`);
  });
}

if (result.caseMismatch.length > 0) {
  console.log("\nCase mismatches (works on Windows, may fail on Linux):");
  result.caseMismatch.forEach((mismatch) => {
    console.log(
      `- ${toPosixPath(southIndianUrlPrefix + mismatch.expected)} -> existing file: ${mismatch.actual}`,
    );
  });
}

if (result.missing.length === 0 && result.caseMismatch.length === 0) {
  console.log("\nAll South Indian image URLs are valid.");
}
