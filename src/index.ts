export type IsoDateString = string;
export type UrlString = string;

export type LegalItemType =
  | "CONSTITUTION"
  | "LAW"
  | "DECREE"
  | "RESOLUTION"
  | "ADMINISTRATIVE_DISPOSITION"
  | "REGULATION"
  | "ARTICLE"
  | "SECTION"
  | "ANNEX"
  | "CASE_LAW"
  | "ADMINISTRATIVE_CRITERION"
  | "DOCTRINE"
  | "BILL"
  | "TREATY"
  | "LEGAL_PRINCIPLE"
  | "LEGAL_DEFINITION";

export type LegalStatus =
  | "VIGENTE"
  | "DEROGADO"
  | "MODIFICADO"
  | "PARCIALMENTE_VIGENTE"
  | "SUSPENDIDO"
  | "NO_VIGENTE"
  | "PROPUESTO"
  | "HISTORICO"
  | "DESCONOCIDO";

export type LegalModality =
  | "OBLIGATION"
  | "PROHIBITION"
  | "PERMISSION"
  | "RIGHT"
  | "POWER"
  | "SANCTION"
  | "DEFINITION"
  | "PROCEDURE";

export type LegalRelationshipType =
  | "MODIFIES"
  | "REPEALS"
  | "REPLACES"
  | "REGULATES"
  | "IMPLEMENTS"
  | "INTERPRETS"
  | "CLARIFIES"
  | "LIMITS"
  | "EXPANDS"
  | "REFERENCES"
  | "DEFINES"
  | "USES_CONCEPT"
  | "APPLIES_TO"
  | "EXEMPTS"
  | "CREATES_EXCEPTION"
  | "REMOVES_EXCEPTION"
  | "SANCTIONS"
  | "DELEGATES_AUTHORITY"
  | "PROPOSES_TO_MODIFY"
  | "PROPOSES_TO_REPEAL"
  | "HAS_DOCTRINAL_COMMENTARY"
  | "HAS_ADMINISTRATIVE_CRITERION"
  | "HAS_CASE_LAW"
  | "RELATED_TO";

export type RelationshipStrength =
  | "BINDING"
  | "HIGHLY_RELEVANT"
  | "PERSUASIVE"
  | "INFORMATIVE"
  | "PROPOSED";

export type RelationshipStatus =
  | "ACTIVE"
  | "HISTORICAL"
  | "SUPERSEDED"
  | "DISPUTED"
  | "PENDING"
  | "UNKNOWN";

export type LegalChangeType =
  | "CREATES"
  | "MODIFIES"
  | "REPLACES"
  | "REPEALS"
  | "REGULATES"
  | "SUSPENDS"
  | "EXTENDS"
  | "CLARIFIES"
  | "ADDS_EXCEPTION"
  | "REMOVES_EXCEPTION"
  | "PROPOSES_CHANGE";

export type LegalProposalStatus =
  | "DRAFT"
  | "PROPOSED"
  | "IN_DEBATE"
  | "APPROVED"
  | "REJECTED"
  | "ARCHIVED"
  | "UNKNOWN";

export type LegalDiffChangeType = "ADDED" | "REMOVED" | "MODIFIED";

export type LegalDiffDataStatus =
  | "MANUAL_FIXTURE"
  | "REAL_AGENDA_ITEM"
  | "TRUSTED_SOURCE"
  | "NEEDS_LEGAL_REVIEW"
  | "HUMAN_REVIEWED"
  | "PRODUCTION_APPROVED";

export type OriginalSourceStatus = "LOADED" | "PENDING" | "NEEDS_REVIEW";
export type LegislativeChamber = "SENATE" | "DEPUTIES";
export type LegalChangeProposalDataKind = "REAL_AGENDA_ITEM";
export type AgendaPriority = "HIGH" | "MEDIUM_HIGH" | "MEDIUM" | "MEDIUM_LOW" | "LOW";

export type ImpactLevel = "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";

export type ProcessorNodeStatus = "ONLINE" | "OFFLINE" | "DRAINING" | "DISABLED";

export type ProcessingJobStatus =
  | "PENDING"
  | "LEASED"
  | "PROCESSING"
  | "COMPLETED"
  | "FAILED"
  | "NEEDS_REVIEW"
  | "NOT_COMPARABLE";

export type ProcessingJobType =
  | "RESOLVE_CURRENT_TEXT"
  | "FETCH_ORIGINAL_DOCUMENT"
  | "EXTRACT_PDF_TEXT"
  | "OCR_DOCUMENT"
  | "SEGMENT_PROVISIONS"
  | "DETECT_LEGAL_REFERENCES"
  | "DETECT_AFFECTED_LEGAL_ITEMS"
  | "CLASSIFY_CHANGE_OPERATIONS"
  | "GENERATE_DIFF_CANDIDATES"
  | "VALIDATE_DIFF_STRUCTURE";

export type ProcessorCapability =
  | "PDF_TEXT"
  | "OCR"
  | "LEGAL_REFERENCES"
  | "AFFECTED_LEGAL_ITEMS"
  | "LEGAL_OPERATIONS"
  | "LEGAL_DIFF_CANDIDATES"
  | "OLLAMA";

export type ProcessingArtifactType =
  | "NORMALIZED_TEXT"
  | "OCR_TEXT"
  | "PROVISIONS"
  | "REFERENCES"
  | "AFFECTED_LEGAL_ITEMS"
  | "OPERATIONS"
  | "DIFF_CANDIDATES"
  | "VALIDATION_REPORT";

export type LegalChangeOperationType =
  | "REPEAL_LAW"
  | "REPEAL_PROVISION"
  | "MODIFY_PROVISION"
  | "ADD_PROVISION"
  | "REPLACE_TEXT"
  | "NEW_REGIME"
  | "APPROVAL_ONLY"
  | "NOT_COMPARABLE"
  | "NEEDS_REVIEW";

export type LegalProperty =
  | "subject"
  | "affectedParty"
  | "modality"
  | "action"
  | "object"
  | "condition"
  | "exception"
  | "consequence"
  | "deadline"
  | "authority"
  | "jurisdiction"
  | "validity"
  | "procedure";

export type ConfidenceLevel = "HIGH" | "MEDIUM" | "LOW";

export type ReviewStatus =
  | "AUTO_EXTRACTED"
  | "NEEDS_REVIEW"
  | "REVIEWED"
  | "REJECTED";

export type FreshnessStatus = "UPDATED" | "PARTIAL" | "STALE" | "UNKNOWN";

export type DatasetMode =
  | "DEV_STRUCTURAL"
  | "HUMAN_REVIEWED"
  | "PRODUCTION_APPROVED";

export interface DatasetMetadata {
  mode: DatasetMode;
  generatedAt: IsoDateString;
  disposable: boolean;
  warning?: string;
  sourceCandidateCount?: number;
}

export interface Jurisdiction {
  country: "AR";
  level: "NATIONAL" | "PROVINCIAL" | "MUNICIPAL" | "FEDERAL" | "UNKNOWN";
  provinceCode?: string;
  municipalityName?: string;
}

export interface LegalSource {
  id: string;
  name: string;
  sourceUrl?: UrlString;
  retrievedAt?: IsoDateString;
  official: boolean;
}

export interface OriginalLegalSource {
  status: OriginalSourceStatus;
  label: string;
  name?: string;
  sourceUrl?: UrlString;
  retrievedAt?: IsoDateString;
  official?: boolean;
  note?: string;
}

export interface LegalItem {
  id: string;
  type: LegalItemType;
  title: string;
  status: LegalStatus;
  jurisdiction: Jurisdiction;
  source: LegalSource;
  issuedAt?: IsoDateString;
  publishedAt?: IsoDateString;
  effectiveFrom?: IsoDateString;
  effectiveTo?: IsoDateString;
  summaryPlainLanguage?: string;
  technicalSummary?: string;
}

export interface LegalProvision {
  id: string;
  legalItemId: string;
  type: "ARTICLE" | "SECTION" | "PARAGRAPH" | "CLAUSE" | "ANNEX";
  label: string;
  order: number;
  textOriginal: string;
  textCurrent?: string;
  status: LegalStatus;
}

export interface LegalSubject {
  id?: string;
  label: string;
  conceptId?: string;
}

export interface LegalAction {
  verb: string;
  label: string;
}

export interface LegalObject {
  label: string;
  conceptId?: string;
}

export interface LegalCondition {
  label: string;
  citationIds?: string[];
}

export interface LegalException {
  label: string;
  citationIds?: string[];
}

export interface LegalConsequence {
  label: string;
  type?: "SANCTION" | "RIGHT_EFFECT" | "PROCEDURAL_EFFECT" | "OTHER";
  citationIds?: string[];
}

export interface LegalRule {
  id: string;
  sourceProvisionId: string;
  modality: LegalModality;
  subject: LegalSubject;
  affectedParty?: LegalSubject;
  action: LegalAction;
  object?: LegalObject;
  conditions: LegalCondition[];
  exceptions: LegalException[];
  consequences: LegalConsequence[];
  citations: LegalCitation[];
  confidence: ConfidenceLevel;
  reviewStatus: ReviewStatus;
}

export interface LegalConcept {
  id: string;
  name: string;
  descriptionPlainLanguage: string;
  technicalDefinition?: string;
  sourceLegalItemIds: string[];
  relatedConceptIds: string[];
  confidence: ConfidenceLevel;
  reviewStatus: ReviewStatus;
}

export interface LegalRelationship {
  id: string;
  fromLegalItemId: string;
  toLegalItemId: string;
  relationshipType: LegalRelationshipType;
  targetScope?: {
    provisionId?: string;
    article?: string;
    paragraph?: string;
    clause?: string;
    conceptId?: string;
  };
  strength: RelationshipStrength;
  status: RelationshipStatus;
  effectiveFrom?: IsoDateString;
  effectiveTo?: IsoDateString;
  explanationPlainLanguage: string;
  citations: LegalCitation[];
  confidence: ConfidenceLevel;
  reviewStatus: ReviewStatus;
}

export interface LegalPropertyChange {
  property: LegalProperty;
  previousValue?: string;
  newValue?: string;
  explanationPlainLanguage: string;
}

export interface LegalChange {
  id: string;
  changeType: LegalChangeType;
  sourceLegalItemId: string;
  targetLegalItemId: string;
  targetProvisionId?: string;
  publishedAt?: IsoDateString;
  effectiveFrom?: IsoDateString;
  beforeSnapshotId?: string;
  afterSnapshotId?: string;
  affectedProperties: LegalPropertyChange[];
  explanationPlainLanguage: string;
  citations: LegalCitation[];
  confidence: ConfidenceLevel;
  reviewStatus: ReviewStatus;
}

export interface AffectedTopic {
  id: string;
  label: string;
  summaryPlainLanguage: string;
}

export interface AffectedGroup {
  id: string;
  label: string;
  impactSummary: string;
}

export interface PlainLanguageSummary {
  headline: string;
  short: string;
  keyPoints: string[];
  whatItMeans: string[];
  limitations: string[];
  legalAdviceWarning: string;
}

export interface ChangeProposalSourceLinks {
  officialAgendaSourceUrl: UrlString;
  officialCitationUrl?: UrlString;
  proposedTextOriginalUrl?: UrlString;
  proposedTextOriginalUrls?: Array<{
    label: string;
    url: UrlString;
  }>;
  currentLawOriginalUrl?: UrlString;
}

export interface LegalVersion {
  id: string;
  label: string;
  legalItemId?: string;
  legalItemTitle?: string;
  provisionId?: string;
  provisionLabel?: string;
  text: string;
  status: LegalStatus | LegalProposalStatus;
  source: LegalSource;
  sourceStatus: OriginalSourceStatus;
  originalSource: OriginalLegalSource;
}

export interface LegalDiff {
  id: string;
  proposalId: string;
  title: string;
  changeType: LegalDiffChangeType;
  affectedTopicIds: string[];
  affectedGroupIds: string[];
  currentVersion: LegalVersion;
  proposedVersion: LegalVersion;
  explanationPlainLanguage: string;
  practicalImpact: string;
  impactLevel: ImpactLevel;
  source: LegalSource;
  dataStatus: LegalDiffDataStatus;
  traceability: {
    currentCitationId?: string;
    proposedCitationId?: string;
    notes?: string;
  };
}

export interface AffectedLegalItem {
  id: string;
  proposalId: string;
  legalItemId?: string;
  title: string;
  legalItemType?: LegalItemType;
  referenceText: string;
  operationType: LegalChangeOperationType;
  currentSource: OriginalLegalSource;
  sourceStatus: OriginalSourceStatus;
  affectedProvisionIds: string[];
  notes?: string;
}

export interface ChangeOperation {
  id: string;
  proposalId: string;
  affectedLegalItemId?: string;
  operationType: LegalChangeOperationType;
  detectedVerb?: string;
  sourceProvisionId?: string;
  targetLegalItemId?: string;
  targetProvisionId?: string;
  evidenceText: string;
  confidence: ConfidenceLevel;
  reviewStatus: ReviewStatus;
}

export interface LegalDiffCandidate {
  id: string;
  proposalId: string;
  operationId?: string;
  affectedLegalItemId?: string;
  title: string;
  changeType: LegalDiffChangeType;
  currentVersion?: LegalVersion;
  proposedVersion?: LegalVersion;
  explanationPlainLanguage?: string;
  practicalImpact?: string;
  confidence: ConfidenceLevel;
  reviewStatus: ReviewStatus;
  validationWarnings: string[];
}

export interface LegalChangeProposal {
  id: string;
  title: string;
  status: LegalProposalStatus;
  jurisdiction: Jurisdiction;
  chamber: LegislativeChamber;
  statusLabelForUsers: string;
  scheduledTreatmentDate: IsoDateString;
  committees: string[];
  officialDescription: string;
  plainLanguageSummary: string;
  typeOfChange?: string;
  summary: PlainLanguageSummary;
  topics: AffectedTopic[];
  affectedGroups: AffectedGroup[];
  diffs: LegalDiff[];
  queryExamples: string[];
  source: LegalSource;
  sourceLinks: ChangeProposalSourceLinks;
  sourceStatus: OriginalSourceStatus;
  priority: AgendaPriority;
  dataKind: LegalChangeProposalDataKind;
  importedFrom: UrlString;
  importedAt: IsoDateString;
  lastCheckedAt: IsoDateString;
  originalSources: {
    current: OriginalLegalSource;
    proposed: OriginalLegalSource;
  };
  dataStatus: LegalDiffDataStatus;
  createdAt?: IsoDateString;
  updatedAt?: IsoDateString;
  scopeNote?: string;
  legalAdviceWarning: string;
}

export interface ProcessorNodeDto {
  id: string;
  displayName: string;
  status: ProcessorNodeStatus;
  lastSeenAt?: IsoDateString;
  tier?: number;
  capabilities: ProcessorCapability[];
  currentJobId?: string;
  modelName?: string;
  processorVersion?: string;
}

export interface ProcessingJobDto {
  id: string;
  jobType: ProcessingJobType;
  status: ProcessingJobStatus;
  priority: number;
  requiredCapabilities: ProcessorCapability[];
  sourceLabel?: string;
  sourceUrl?: UrlString;
  leaseOwnerId?: string;
  leaseUntil?: IsoDateString;
  attempts: number;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}

export interface ProcessingQueueStatusDto {
  generatedAt: IsoDateString;
  processors: ProcessorNodeDto[];
  counts: Record<ProcessingJobStatus, number>;
  jobs: ProcessingJobDto[];
}

export interface ProcessorEnrollRequestDto {
  displayName: string;
  tier?: number;
  capabilities: ProcessorCapability[];
  modelName?: string;
  processorVersion?: string;
}

export interface ProcessorEnrollResponseDto {
  processor: ProcessorNodeDto;
  processorSecret: string;
}

export interface ProcessorHeartbeatRequestDto {
  status?: ProcessorNodeStatus;
  currentJobId?: string;
  tier?: number;
  capabilities?: ProcessorCapability[];
  modelName?: string;
  processorVersion?: string;
}

export interface ProcessorClaimJobRequestDto {
  capabilities?: ProcessorCapability[];
  maxLeaseSeconds?: number;
}

export interface ProcessorClaimJobResponseDto {
  job?: ProcessingJobDto & {
    input: Record<string, unknown>;
  };
}

export interface ProcessingArtifactDto {
  artifactType: ProcessingArtifactType;
  content: Record<string, unknown> | string;
  contentHash?: string;
  sourceUrl?: UrlString;
}

export interface ProcessorJobResultRequestDto {
  status: Extract<ProcessingJobStatus, "COMPLETED" | "NEEDS_REVIEW" | "NOT_COMPARABLE">;
  result: Record<string, unknown>;
  artifacts?: ProcessingArtifactDto[];
  warnings?: string[];
  confidence?: {
    ocr?: number;
    referenceResolution?: number;
    operationClassification?: number;
    diffGeneration?: number;
  };
}

export interface ChangeProposalBundle {
  schemaVersion: string;
  generatedAt: IsoDateString;
  proposals: LegalChangeProposal[];
}

export interface LegalChangeProposalOverviewDto {
  id: string;
  title: string;
  status: LegalProposalStatus;
  chamber: LegislativeChamber;
  statusLabelForUsers: string;
  scheduledTreatmentDate: IsoDateString;
  committees: string[];
  summaryPlainLanguage: string;
  affectedTopics: string[];
  affectedGroups: string[];
  diffCount: number;
  dataStatus: LegalDiffDataStatus;
  dataKind: LegalChangeProposalDataKind;
  priority: AgendaPriority;
  sourceStatus: OriginalSourceStatus;
  sourceLinks: ChangeProposalSourceLinks;
  source: LegalSource;
}

export interface LegalChangeProposalSearchResultDto extends LegalChangeProposalOverviewDto {
  matchedDiffIds: string[];
  matchedTopicIds: string[];
  matchedGroupIds: string[];
  matchSummary: string;
}

export interface SearchResponseDto {
  query: string;
  proposals: LegalChangeProposalSearchResultDto[];
  items: LegalItemOverviewDto[];
  itemsUnavailable?: {
    error: string;
    message?: string;
    dataset?: {
      mode?: DatasetMode | string;
      disposable?: boolean;
      warning?: string;
    };
    servingPolicy?: Record<string, unknown>;
  };
}

export interface LegalSnapshot {
  id: string;
  legalItemId: string;
  snapshotDate: IsoDateString;
  status: LegalStatus;
  provisions: LegalProvision[];
  rules: LegalRule[];
  relationships: LegalRelationship[];
  generatedFromChangeId?: string;
  confidence: ConfidenceLevel;
  reviewStatus: ReviewStatus;
}

export interface LegalCitation {
  id: string;
  sourceLegalItemId: string;
  provisionId?: string;
  article?: string;
  paragraph?: string;
  originalText: string;
  sourceUrl?: UrlString;
  retrievedAt?: IsoDateString;
}

export interface FreshnessInfo {
  status: FreshnessStatus;
  lastValidatedAt?: IsoDateString;
  lastSourceCheckedAt?: IsoDateString;
  pendingValidationCount: number;
}

export interface LegalItemOverviewDto {
  id: string;
  title: string;
  type: LegalItemType;
  status: LegalStatus;
  summaryPlainLanguage: string;
  affectedSubjects: string[];
  currentEffects: {
    obligations: number;
    prohibitions: number;
    rights: number;
    sanctions: number;
  };
  relationshipsSummary: {
    modifications: number;
    regulations: number;
    caseLaw: number;
    doctrine: number;
    administrativeCriteria: number;
    pendingBills: number;
  };
  freshness: FreshnessInfo;
}

export type ValidationDecision = "APPROVE" | "APPROVE_PARTIAL" | "REJECT" | "REQUEST_REVIEW";

export interface ValidationJob {
  id: string;
  source: LegalSource;
  status: "PENDING" | "RUNNING" | "NEEDS_REVIEW" | "APPROVED" | "REJECTED";
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
  candidateLegalItemIds: string[];
  reviewerNotes?: string;
}

export interface CandidateBundle {
  schemaVersion: string;
  generatedAt: IsoDateString;
  source: LegalSource;
  legalItems: LegalItem[];
  provisions: LegalProvision[];
  citations: LegalCitation[];
  relationships: LegalRelationship[];
  rules: LegalRule[];
  concepts: LegalConcept[];
  snapshots: LegalSnapshot[];
}

export interface ApprovedBundle {
  schemaVersion: string;
  approvedAt: IsoDateString;
  approvedBy: string;
  dataset?: DatasetMetadata;
  legalItems: LegalItem[];
  provisions: LegalProvision[];
  citations: LegalCitation[];
  relationships: LegalRelationship[];
  rules: LegalRule[];
  concepts: LegalConcept[];
  snapshots: LegalSnapshot[];
  readModels: {
    legalItemOverviews: LegalItemOverviewDto[];
  };
  validationSummary?: {
    reports: Array<{
      inputPath: string;
      summary: Record<string, number>;
      requiresHumanReview: boolean;
      warnings: Array<{
        code: string;
        severity?: string;
        message: string;
      }>;
    }>;
  };
}

export type LexMapaEvent =
  | "LegalDocumentFetched"
  | "LegalDocumentParsed"
  | "LegalItemCandidateCreated"
  | "LegalProvisionCandidateCreated"
  | "LegalRelationshipCandidateDetected"
  | "LegalRuleCandidateExtracted"
  | "LegalConceptCandidateExtracted"
  | "LegalSnapshotCandidateCreated"
  | "ValidationJobCreated"
  | "ValidationJobApproved"
  | "ValidationJobRejected"
  | "ApprovedLegalDataPromoted"
  | "LegalItemReadModelUpdated";
