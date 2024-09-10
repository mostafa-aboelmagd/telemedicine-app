const MedicalHistory = require('../../../Database/Patient/MedicalHistory/deletePrescription');
const deletePrescription = async (req, res) => {
  const prescriptionId = req.body.prescriptionId;
  try {
    const success = await MedicalHistory.deletePrescription(prescriptionId);
    if (!success) {
      return res.status(404).json({ message: 'Prescription not found or already deleted' });
    }
    return res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    console.error(error.stack);
    if (error.code === 'ER_ROW_DOES_NOT_EXIST') {
      return res.status(404).json({ message: 'Prescription not found' });
    } else {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
};
module.exports = {deletePrescription};