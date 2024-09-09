
const MedicalHistory = require('../../../Database/Patient/MedicalHistory/deletePrescription');
const { validatePrescriptionData } = require('../../../Utilities');

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

module.exports = {deletePrescription};