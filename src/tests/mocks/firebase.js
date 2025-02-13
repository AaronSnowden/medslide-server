const mockCollection = jest.fn();
const mockAdd = jest.fn();
const mockGet = jest.fn();
const mockWhere = jest.fn();
const mockOrderBy = jest.fn();
const mockLimit = jest.fn();
const mockUpdate = jest.fn();

const mockFirestore = {
  collection: mockCollection.mockReturnThis(),
  add: mockAdd,
  get: mockGet,
  where: mockWhere.mockReturnThis(),
  orderBy: mockOrderBy.mockReturnThis(),
  limit: mockLimit.mockReturnThis(),
  update: mockUpdate,
};

jest.mock("firebase-admin", () => ({
  initializeApp: jest.fn(),
  firestore: () => mockFirestore,
  credential: {
    cert: jest.fn(),
  },
}));
