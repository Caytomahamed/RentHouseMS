const db = require('../data/dbConfig');
const maintenanceModal = require('../models/maintenanceModal');

// Mock data for testing
const mockMaintenanceRequestList = [
  {
    bookingId: 2,
    tenantId: 3,
    type: 'Plumbing',
    description: 'Leaky faucet',
    status: 'requested',
    expectedDate: Date.now(),
  },
  {
    bookingId: 2,
    tenantId: 3,
    type: 'Roof',
    description: 'Leaky roof',
    status: 'requested',
    expectedDate: Date.now(),
  },
];

describe('Maintenance Modal Tests', () => {
  beforeEach(async () => {
    // Reset the database or perform setup tasks before each test
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    // Cleanup tasks after all tests
    await db.destroy();
  });
  it('should create a new maintenance request', async () => {
    mockMaintenanceRequestList.forEach(async mockMaintenanceRequest => {
      const createdMaintenance = await maintenanceModal.create(
        mockMaintenanceRequest,
      );

      // Assert that the createdMaintenance has an id property
      expect(createdMaintenance[0]).toHaveProperty('id');
      expect(createdMaintenance[0].bookingId).toEqual(
        mockMaintenanceRequest.bookingId,
      );
      expect(createdMaintenance[0].tenantId).toEqual(
        mockMaintenanceRequest.tenantId,
      );
      expect(createdMaintenance[0].type).toEqual(mockMaintenanceRequest.type);
      expect(createdMaintenance[0].description).toEqual(
        mockMaintenanceRequest.description,
      );
      expect(createdMaintenance[0].status).toEqual('requested');
    });
  });

  it('should find maintenance requests by landlord id', async () => {
    const landlordId = 2;
    const maintenanceList = await maintenanceModal.findByLandlordId(landlordId);

    expect(Array.isArray(maintenanceList)).toBe(true);

    // Assert that each element in the array is an object
    maintenanceList.forEach(maintenance => {
      expect(typeof maintenance).toBe('object');
      expect(maintenance).toBeTruthy(); // Check that maintenance is truthy (not null or undefined)
    });
  });

  it('should mark a maintenance request as completed', async () => {
    await maintenanceModal.create(mockMaintenanceRequestList[0]);
    const maintenanceId = 1;
    const [completedMaintenance] =
      await maintenanceModal.markAsCompleted(maintenanceId);

    expect(completedMaintenance.status).toEqual('completed');
  });

  it('should delete a maintenance request after 1 day of completion', async () => {
    await maintenanceModal.create(mockMaintenanceRequestList[0]);

    const maintenanceId = 1;
    const [deletedMaintenance] = 
      await maintenanceModal.findByIdandDelete(maintenanceId);

    expect(deletedMaintenance).toBeFalsy();
  });
});
