import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function assertIsoDate(value, label) {
  assert(typeof value === "string", `${label} must be a string`);
  assert(!Number.isNaN(Date.parse(value)), `${label} must be an ISO-like date`);
}

function assertArray(value, label) {
  assert(Array.isArray(value), `${label} must be an array`);
}

const schemaDir = join(root, "schemas");
const fixtureDir = join(root, "fixtures");

for (const file of readdirSync(schemaDir).filter((entry) => entry.endsWith(".json"))) {
  readJson(join(schemaDir, file));
}

const candidate = readJson(join(fixtureDir, "candidate-bundle.example.json"));
assert(candidate.schemaVersion === "0.1.0", "candidate schemaVersion mismatch");
assertIsoDate(candidate.generatedAt, "candidate.generatedAt");
assert(candidate.source.official === true, "candidate source must be official in example");
assertArray(candidate.legalItems, "candidate.legalItems");
assertArray(candidate.provisions, "candidate.provisions");
assertArray(candidate.citations, "candidate.citations");
assert(candidate.legalItems.length > 0, "candidate must include at least one legal item");
assert(candidate.provisions.length > 0, "candidate must include at least one provision");
assert(candidate.citations.length > 0, "candidate must include at least one citation");

const candidateItemIds = new Set(candidate.legalItems.map((item) => item.id));
for (const provision of candidate.provisions) {
  assert(candidateItemIds.has(provision.legalItemId), `unknown provision legalItemId: ${provision.legalItemId}`);
}

const candidateProvisionIds = new Set(candidate.provisions.map((provision) => provision.id));
for (const citation of candidate.citations) {
  assert(candidateItemIds.has(citation.sourceLegalItemId), `unknown citation sourceLegalItemId: ${citation.sourceLegalItemId}`);
  if (citation.provisionId) {
    assert(candidateProvisionIds.has(citation.provisionId), `unknown citation provisionId: ${citation.provisionId}`);
  }
}

const approved = readJson(join(fixtureDir, "approved-bundle.example.json"));
assert(approved.schemaVersion === "0.1.0", "approved schemaVersion mismatch");
assertIsoDate(approved.approvedAt, "approved.approvedAt");
assert(typeof approved.approvedBy === "string" && approved.approvedBy.length > 0, "approved.approvedBy is required");
assertArray(approved.legalItems, "approved.legalItems");
assertArray(approved.provisions, "approved.provisions");
assertArray(approved.citations, "approved.citations");
assertArray(approved.readModels.legalItemOverviews, "approved.readModels.legalItemOverviews");

const approvedItemIds = new Set(approved.legalItems.map((item) => item.id));
for (const overview of approved.readModels.legalItemOverviews) {
  assert(approvedItemIds.has(overview.id), `overview references unknown legal item: ${overview.id}`);
  assert(overview.freshness.pendingValidationCount >= 0, "pendingValidationCount cannot be negative");
}

console.log("Fixtures and schemas parsed successfully.");
