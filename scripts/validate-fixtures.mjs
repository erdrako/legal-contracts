import { readFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8").replace(/^\uFEFF/, ""));
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

const changeProposalBundle = readJson(join(fixtureDir, "change-proposals.reforma-laboral.example.json"));
assert(changeProposalBundle.schemaVersion === "0.1.0", "change proposal schemaVersion mismatch");
assertIsoDate(changeProposalBundle.generatedAt, "changeProposalBundle.generatedAt");
assertArray(changeProposalBundle.proposals, "changeProposalBundle.proposals");
assert(changeProposalBundle.proposals.length > 0, "change proposal fixture must include at least one proposal");

for (const proposal of changeProposalBundle.proposals) {
  assert(typeof proposal.id === "string" && proposal.id.length > 0, "proposal.id is required");
  assert(typeof proposal.title === "string" && proposal.title.length > 0, "proposal.title is required");
  assert(typeof proposal.summary?.short === "string", `proposal ${proposal.id} summary.short is required`);
  assertArray(proposal.topics, `proposal ${proposal.id}.topics`);
  assertArray(proposal.affectedGroups, `proposal ${proposal.id}.affectedGroups`);
  assertArray(proposal.diffs, `proposal ${proposal.id}.diffs`);
  assertOriginalSource(proposal.originalSources?.current, `proposal ${proposal.id}.originalSources.current`);
  assertOriginalSource(proposal.originalSources?.proposed, `proposal ${proposal.id}.originalSources.proposed`);
  assert(proposal.diffs.length >= 3 && proposal.diffs.length <= 5, `proposal ${proposal.id} must include 3 to 5 MVP diffs`);

  const topicIds = new Set(proposal.topics.map((topic) => topic.id));
  const groupIds = new Set(proposal.affectedGroups.map((group) => group.id));

  for (const diff of proposal.diffs) {
    assert(diff.proposalId === proposal.id, `diff ${diff.id} references a different proposalId`);
    assert(["ADDED", "REMOVED", "MODIFIED"].includes(diff.changeType), `diff ${diff.id} has invalid changeType`);
    assert(typeof diff.title === "string" && diff.title.length > 0, `diff ${diff.id} title is required`);
    assert(typeof diff.currentVersion?.text === "string" && diff.currentVersion.text.length > 0, `diff ${diff.id} current text is required`);
    assert(typeof diff.proposedVersion?.text === "string" && diff.proposedVersion.text.length > 0, `diff ${diff.id} proposed text is required`);
    assertOriginalSource(diff.currentVersion.originalSource, `diff ${diff.id}.currentVersion.originalSource`);
    assertOriginalSource(diff.proposedVersion.originalSource, `diff ${diff.id}.proposedVersion.originalSource`);
    assert(["LOADED", "PENDING"].includes(diff.currentVersion.sourceStatus), `diff ${diff.id} currentVersion.sourceStatus is required`);
    assert(["LOADED", "PENDING"].includes(diff.proposedVersion.sourceStatus), `diff ${diff.id} proposedVersion.sourceStatus is required`);
    assert(typeof diff.explanationPlainLanguage === "string" && diff.explanationPlainLanguage.length > 0, `diff ${diff.id} explanation is required`);
    assert(typeof diff.practicalImpact === "string" && diff.practicalImpact.length > 0, `diff ${diff.id} practical impact is required`);
    assert(typeof diff.source?.name === "string" && diff.source.name.length > 0, `diff ${diff.id} source is required`);
    assert(typeof diff.dataStatus === "string" && diff.dataStatus.length > 0, `diff ${diff.id} dataStatus is required`);

    for (const topicId of diff.affectedTopicIds) {
      assert(topicIds.has(topicId), `diff ${diff.id} references unknown topic: ${topicId}`);
    }

    for (const groupId of diff.affectedGroupIds) {
      assert(groupIds.has(groupId), `diff ${diff.id} references unknown group: ${groupId}`);
    }
  }
}

console.log("Fixtures and schemas parsed successfully.");

function assertOriginalSource(source, label) {
  assert(source && typeof source === "object" && !Array.isArray(source), `${label} is required`);
  assert(["LOADED", "PENDING"].includes(source.status), `${label}.status must be LOADED or PENDING`);
  assert(typeof source.label === "string" && source.label.length > 0, `${label}.label is required`);
  if (source.status === "LOADED") {
    assert(typeof source.sourceUrl === "string" && source.sourceUrl.length > 0, `${label}.sourceUrl is required when loaded`);
  }
}
