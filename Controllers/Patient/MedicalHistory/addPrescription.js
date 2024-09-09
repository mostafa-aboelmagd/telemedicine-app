
const MedicalHistory = require('../../../Database/Patient/MedicalHistory/addPrescription');
const { validatePrescriptionData } = require('../../../Utilities');

const addPrescription = async (req, res) => {
  const patientId = req.id;
  const medicationData = req.body.medicationData;

  if (!validatePrescriptionData(medicationData)) {
    return res.status(400).json({ message: 'Invalid prescription data' });
  }

  try {
    const newPrescription = await MedicalHistory.addPrescription(patientId, medicationData);
    if (!newPrescription) {
      return res.status(500).json({ message: 'Failed to add prescription' });
    }
    return res.status(201).json(newPrescription); 
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { addPrescription};