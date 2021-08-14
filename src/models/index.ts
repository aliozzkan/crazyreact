export interface Inventory {
  id: number;
  userTypeID: number;
  userTypeName: string;
  projectID: number;
  campusID: number;
  campusName: string;
  buildID: number;
  buildName: string;
  floorID: number;
  floorName: string;
  roomID: number;
  roomName: string;
  groupID: number;
  groupName: string;
  brandID: number;
  brandName: string;
  modelID: number;
  modelName: string;
  inventoryaCapacityID: number;
  inventoryaCapacityName: string;
  barcode: string;
  count: number;
  assetNo: string;
  name: string;
  serialNumber: string;
  productionYear: string;
  inventoryPhoto: null;
  maintenanceContract: string;
  explain: string;
  unit: string;
  isActive: boolean;
  riskAnalysisExpriDate: null;
  riskAnalysisPath: null;
  userInstructions: null;
  userGudiePath: null;
  createDate: Date;
}
export interface TimelineItem {
  id: number;
  inventoryMaintenanceTypeID: number;
  inventoryID: number;
  inventoryName: string;
  barcode: string;
  maintenanceTypeID: number;
  maintenanceTypeName: string;
  maintenancePeriodID: number;
  maintenancePeriodName: string;
  campusName: string;
  beforeDay: number;
  beforeDate: string;
  startDate: string;
  endDate: string;
  isMaintenanceComplete: boolean;
  isMaintenanceIncomplete: boolean;
  isAfterCompleted: boolean;
  maintenanceTransactionStatus: number;
  maintenanceTransactionStatusColorCode: string;
  maintenanceTransactionStatusDescription: string;
}

export interface TimelineItemDetail {
  campusName: string;
  buildName: string;
  floorName: string;
  roomName: string;
  groupName: string;
  brandName: string;
  modelName: string;
  capacityName: string;
  maintenanceId: number;
  maintenanceTypeName: string;
  maintenanceTypeId: number;
  maintenancePeriodName: string;
  maintenancePeriodID: number;
  inventoryID: number;
  barcode: string;
  inventoryPhotoPath?: any;
  assetNo?: any;
  name: string;
  serialNumber: string;
  unit: string;
  explain?: any;
  isActive: boolean;
  beforeDay: number;
  beforeDate: string;
  startDate: string;
  endDate: string;
  controlFormPhotoIsRequired: boolean;
  isInventoryPhotoRequired: boolean;
  riskAnalysisIsRequired: boolean;
  riskAnalysisPath?: any;
  userInstructionsIsRequired: boolean;
  userInstructionsPath?: any;
  userGudiePathIsRequired: boolean;
  userGudiePath?: any;
  maintenanceContractIsRequired: boolean;
  maintenanceContractPath?: any;
}


export interface HomeStats {
  legalInspectionTotalCount: number;
  legalInspectionMaintenanceCount: number;
  unDoneLegalInspectionMaintenance: number;
  doneLegalInspectionMaintenance: number;
  documentTotalCount: number;
  documentMaintenanceCount: number;
  unDoneDocumentMaintenance: number;
  doneDocumentMaintenance: number;
  demandTotalCount: number;
  demandMaintenanceCount: number;
  unDoneDemandMaintenance: number;
  doneDemandMaintenance: number;
  controlTotalCount: number;
  controlMaintenanceCount: number;
  unDoneControlMaintenanceCount: number;
  doneControlMaintenanceCount: number;
  completedDocument: number;
  notCompletedDocument: number;
  totalInventoryCount: number;
  totalInternalMaintenance: number;
  totalExternalMaintenance: number;
  totalLegalMaintenance: number;
  unDoneInternalMaintenance: number;
  unDoneExternalMaintenance: number;
  unDoneLegalMaintenance: number;
  unCompletedMaintenance: number;
  doneInternalMaintenance: number;
  doneExternalMaintenance: number;
  doneLegalMaintenance: number;
  completedMaintenance: number;
}

export interface TimelineDemand {
  demandID: number;
  projectID: number;
  userTypeID: number;
  userTypeName: string;
  campusID: number;
  campusName: string;
  buildID: number;
  buildName: string;
  floorID: number;
  floorName: string;
  roomID: number;
  roomName: string;
  demandName: string;
  explain?: any;
  demandIsActive: boolean;
  demandCreateDate: string;
  documents: TimelineDemandDocument[];
}

interface TimelineDemandDocument {
  demandDocumentID: number;
  documentName: string;
  lastDate: string;
  demandDocumentIsActive: boolean;
  isCompleted: boolean;
  demandDocumentCreateDate: string;
  path?: any;
  completedDate: string;
  completedUserID?: any;
  completedUserName?: any;
}

export interface User {
  id: number;
  name: string;
  surname: string;
  username: string;
  email: string;
  phone: string;
  isNotificationEnabled: boolean;
  isEmailEnabled: boolean;
  isActive: boolean;
  userRoleID: number;
  userRoleName: string;
  userTypes: UserType[];
  companyID: number;
  companyName: string;
  companyLogo: string;
  accessToken: string;
  tokenExpireDate: string;
}

interface UserType {
  id: number;
  name: string;
}

export interface TimelineLegal {
  id: number;
  projectID: number;
  completedUserID?: any;
  inventoryLegalInspectionTypeID: number;
  answer: boolean;
  explain?: any;
  isCompleted: boolean;
  status: number;
  statusDesc: string;
  statusColor: string;
  completedPersonelName?: any;
  beforeDay: number;
  startDate: string;
  endDate: string;
  secondDate?: any;
  completedDate?: any;
  createDate: string;
  userTypeId: number;
  userTypeName: string;
  question: string;
  inventoryID: number;
  inventoryName: string;
  campusID: number;
  campusName: string;
  buildID: number;
  buildName: string;
  floorID: number;
  floorName: string;
  roomID: number;
  roomName: string;
  groupID: number;
  groupName: string;
  brandID: number;
  brandName: string;
  modelID: number;
  modelName: string;
  inventoryCapacityID?: any;
  inventoryCapacityName?: any;
  barcode: string;
  assetNo: string;
  name: string;
  count: number;
  productionYear: string;
  inventoryPhotoPath?: any;
  serialNumber: string;
  unit: string;
  controlFormPhotoIsRequired: boolean;
  isInventoryPhotoRequired: boolean;
  riskAnalysisIsRequired: boolean;
  riskAnalysisPath: string;
  userInstructionsIsRequired: boolean;
  userInstructionsPath: string;
  userGudiePathIsRequired: boolean;
  userGudiePath: string;
  maintenanceContractIsRequired: boolean;
  maintenanceContractPath: string;
  documents: any[];
}

export interface TimelineDocument {
  documentName: string;
  documentMaintenanceID: number;
  documentMaintenanceTypeID: number;
  documentID: number;
  projectID: number;
  documentPeriodID: number;
  documentPeriodName: string;
  userTypeID: number;
  userTypeName: string;
  campusID: number;
  campusName: string;
  buildID: number;
  buildName: string;
  floorID: number;
  floorName: string;
  roomID: number;
  roomName: string;
  beforeDay: number;
  question: string;
  beforeDate: string;
  startDate: string;
  endDate: string;
  secondDate?: any;
  isCompleted: boolean;
  status: number;
  statusDesc: string;
  statusColor: string;
  completedPersonelName: string;
  completedPersonelID: number;
  groupID: number;
  groupName: string;
  brandID: number;
  brandName: string;
  modelID: number;
  modelName: string;
  completedDate: string;
  documentMaintenanceDetailID: number;
  questionAnswer: string;
  explain: string;
  documents: Document[];
}

interface Document {
  id: number;
  documentMaintenanceDetailID: number;
  type: string;
  path: string;
  extension: string;
  createDate: string;
}

export interface Question {
  Id: number;
  Question: string;
  SelectedItem: string;
  isDone: boolean;
  QuestionType: number;
  InitialValue: string;
  EndValue: string;
  trueFalseAnswer: boolean;
}

export interface QuestionForm {
  id: number;
  projectID: number;
  name: string;
  isActive: boolean;
  createDate: string;
}

export interface TaskMain {
  controlId: number;
  userTypeID: number;
  userTypeName: string;
  projectID: number;
  campusID: number;
  campusName: string;
  buildID: number;
  buildName: string;
  floorID: number;
  floorName: string;
  roomID: number;
  roomName: string;
  controlName: string;
  controlExplain: string;
  controlCreateDate: string;
  controlTypeID: number;
  userID: number;
  userName: string;
  controlPeriodID: number;
  controlPeriodName: string;
  controlQuestionGroupID: number;
  controlQuestionGroupName: string;
  controlTypeExplain: string;
  beforeDay: number;
  controlTaskMaintenanceID: number;
  beforeDate: string;
  startDate: string;
  endDate: string;
  isCompleted: boolean;
  complatedDate: string;
  statusCode: number;
  statusColor: string;
  statusDesc: string;
}