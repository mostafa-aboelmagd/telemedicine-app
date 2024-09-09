
const MedicalHistory = require('../../../Database/Patient/MedicalHistory/Prescription');
const { validatePrescriptionData } = require('../../Utilities');

const getPrescription = async (req, res) => {
  const patientId = req.id; 

  try {
    const prescription = await MedicalHistory.retrievePrescription(patientId);
    if (!prescription) {
      return res.status(404).json({ message: 'No prescription found for this patient' });
    }
    return res.json(prescription);
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const addPrescription = async (req, res) => {
  const patientId = req.id;  // Assuming you have a way to access the patient ID from the request
  const medicationData = req.body.medicationData;

  if (!validatePrescriptionData(medicationData)) {
    return res.status(400).json({ message: 'Invalid prescription data' });
  }

  try {
    const newPrescription = await MedicalHistory.addPrescription(patientId, medicationData);
    if (!newPrescription) {
      return res.status(500).json({ message: 'Failed to add prescription' });
    }
    return res.status(201).json(newPrescription); // 201 Created
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updatePrescription = async (req, res) => {
  const prescriptionId = req.params.id;
  const medicationData = req.body.medicationData;

  if (!validatePrescriptionData(medicationData)) {
    return res.status(400).json({ message: 'Invalid prescription data' });
  }

  try {
    const success = await MedicalHistory.updatePrescription(prescriptionId, medicationData);
    if (!success) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    return res.status(200).json({ message: 'Prescription updated successfully' });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deletePrescription = async (req, res) => {
  const prescriptionId = req.params.id;

  try {
    const success = await MedicalHistory.deletePrescription(prescriptionId);
    if (!success) {
      return res.status(404).json({ message: 'Prescription not found' });
    }
    return res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error(error.stack);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getPrescription,
  addPrescription,
  updatePrescription,
  deletePrescription,
};